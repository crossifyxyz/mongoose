import {
  AddEthereumChainParameter,
  Chain,
  ChainType,
  ChainsCache,
} from '@crossify/types'
import { Schema } from 'mongoose'
import { TokenSchema } from '.'

// Schema for AddEthereumChainParameter
const AddEthereumChainParameterSchema = new Schema<AddEthereumChainParameter>(
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
const ExtendedChainSchema = new Schema<Chain>(
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
    rpcUrls: { type: [String] }, // Optional for Solana
  },
  { _id: false }
)

export const ChainsCacheSchema = new Schema<ChainsCache>({
  data: { type: [ExtendedChainSchema], required: true, _id: false },
})
