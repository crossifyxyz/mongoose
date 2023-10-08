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
    priceUSD: { type: String },
  },
  { _id: false }
).add(StaticTokenSchema)

// Schema for TokenAmount (extends Token)
export const TokenAmountSchema = new Schema<TokenAmount>(
  {
    amount: { type: String },
    amountUSD: { type: String },
    blockNumber: { type: Number },
  },
  { _id: false }
).add(TokenSchema)

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
    idle: {
      type: Boolean,
      default: true,
    },
  },
  { _id: false }
)
