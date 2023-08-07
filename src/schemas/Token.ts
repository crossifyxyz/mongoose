import {
  StaticToken,
  Token,
  TokenAmount,
  TokenBalancesCache,
  TokensCache,
} from '@crossify/types'
import { Schema } from 'mongoose'
import { currentUnixTime } from '../utils'

// Schema for StaticToken
export const StaticTokenSchema = new Schema<StaticToken>(
  {
    address: { type: String, required: true },
    chainId: { type: Number, required: true },
    symbol: { type: String, required: true },
    decimals: { type: Number, required: true },
    name: { type: String, required: true },
    coinKey: { type: String },
    logoURI: { type: String },
  },
  { _id: false }
)

// Schema for Token (extends StaticToken)
export const TokenSchema = new Schema<Token>(
  {
    ...StaticTokenSchema.obj, // Include all fields from StaticTokenSchema
    priceUSD: { type: String },
  },
  { _id: false }
)

// Schema for TokenAmount (extends Token)
export const TokenAmountSchema = new Schema<TokenAmount>(
  {
    ...TokenSchema.obj, // Include all fields from TokenSchema
    amount: { type: String },
    amountUSD: { type: String },
    blockNumber: { type: Number },
  },
  { _id: false }
)

export const TokensCacheSchema = new Schema<TokensCache>({
  data: {
    type: Map,
    of: [TokenSchema],
    required: true,
    _id: false,
  },
})

export const TokenBalancesCacheSchema = new Schema<TokenBalancesCache>(
  {
    data: [TokenAmountSchema],
    updatedAt: { type: Number, default: () => currentUnixTime() },
  },
  { _id: false }
)
