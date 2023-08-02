import { ChainType, ChainsCache } from '@crossify/types'
import { Schema } from 'mongoose'
import { TokenSchema } from '.'

// Schema for AddEthereumChainParameter
const AddEthereumChainParameterSchema = new Schema(
  {
    chainId: { type: String },
    blockExplorerUrls: { type: [String] },
    chainName: { type: String },
    nativeCurrency: {
      name: { type: String },
      symbol: { type: String },
      decimals: { type: Number },
    },
    rpcUrls: { type: [String] },
  },
  { _id: false }
)

// Unified schema for both EVM and Solana chains
const ExtendedChainSchema = new Schema(
  {
    key: { type: String, required: true },
    chainType: { type: String, enum: ChainType, required: true },
    name: { type: String, required: true },
    coin: { type: String, required: true },
    id: { type: Number, required: true },
    mainnet: { type: Boolean, required: true },
    logoURI: { type: String },
    faucetUrls: { type: [String] },
    tokenlistUrl: { type: String }, // Optional for Solana
    metamask: { type: AddEthereumChainParameterSchema }, // Optional for Solana
    multicallAddress: { type: String }, // Optional for Solana
    nativeToken: { type: TokenSchema, required: true },
  },
  { _id: false }
)

//=============WAGMI SPECIFIC================
const RpcUrlsSchema = new Schema(
  {
    http: { type: [String], required: true },
    webSocket: { type: [String] },
  },
  { _id: false }
)

const ExtendedWagmiChainSchema = new Schema(
  {
    id: { type: Number, required: true },
    name: { type: String, required: true },
    network: { type: String, required: true },
    nativeCurrency: {
      name: { type: String },
      symbol: { type: String },
      decimals: { type: Number },
    },
    rpcUrls: {
      default: { type: RpcUrlsSchema, required: true },
      public: { type: RpcUrlsSchema, required: true },
    },
    blockExplorers: {
      default: {
        name: { type: String },
        url: { type: String },
      },
    },
    contracts: {
      ensRegistry: {
        address: { type: String },
        blockCreated: { type: Number },
      },
      ensUniversalResolver: {
        address: { type: String },
        blockCreated: { type: Number },
      },
      multicall3: {
        address: { type: String },
        blockCreated: { type: Number },
      },
    },
    testnet: { type: Boolean },
    iconUrl: { type: String },
    iconBackground: { type: String },
  },
  { _id: false }
)

export const ChainsCacheSchema = new Schema<ChainsCache>({
  data: {
    crossify: { type: [ExtendedChainSchema], required: true },
    wagmi: { type: [ExtendedWagmiChainSchema], required: true },
  },
})
