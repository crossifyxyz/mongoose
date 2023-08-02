import { TokenAmount, TokensCache } from '@crossify/types'
import { Schema } from 'mongoose'

export const TokenSchema = new Schema<TokenAmount>(
  {
    address: { type: String, required: true },
    chainId: { type: Number, required: true },
    symbol: { type: String, required: true },
    decimals: { type: Number, required: true },
    name: { type: String, required: true },
    priceUSD: { type: String },
    amount: { type: String },
    amountUSD: { type: String },
    logoURI: { type: String },
  },
  { _id: false }
)

export const TokensCacheSchema = new Schema<TokensCache>({
  data: {
    _id: false,
  },
})
