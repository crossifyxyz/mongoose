import { ChainType, ChainsCache } from '@crossify/types'
import { Schema } from 'mongoose'
import { TokenSchema } from '.'

const AddEthereumChainParameterSchema = new Schema({
  chainId: { type: String, required: true },
  blockExplorerUrls: { type: [String], required: true },
  chainName: { type: String, required: true },
  nativeCurrency: {
    name: { type: String, required: true },
    symbol: { type: String, required: true },
    decimals: { type: Number, required: true },
  },
  rpcUrls: { type: [String], required: true },
})

const ChainBaseSchema = new Schema({
  key: { type: String, required: true },
  chainType: { type: String, enum: ChainType, required: true },
  name: { type: String, required: true },
  coin: { type: String, required: true },
  id: { type: Number, required: true },
  mainnet: { type: Boolean, required: true },
  logoURI: { type: String, required: false },
  faucetUrls: { type: [String], required: false },
})

const EVMChainSchema = new Schema({
  ...ChainBaseSchema.obj,
  tokenlistUrl: { type: String },
  metamask: { type: AddEthereumChainParameterSchema, required: true },
  multicallAddress: { type: String },
})

const ExtendedChainSchema = new Schema({
  ...EVMChainSchema.obj,
  nativeToken: { type: TokenSchema, required: true },
})

const ChainsCacheSchema = new Schema<ChainsCache>({
  data: {
    type: [ExtendedChainSchema],
    required: true,
  },
})
