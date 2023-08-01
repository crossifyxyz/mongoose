import { FiatRateCache } from '@crossify/types'
import { Schema } from 'mongoose'

export const FiatRateCacheSchema = new Schema<FiatRateCache>({
  data: {
    base: { type: String, required: true },
    date: { type: String, required: true },
    rates: {
      type: Map,
      of: Number,
      required: true,
    },
    _id: false,
  },
})
