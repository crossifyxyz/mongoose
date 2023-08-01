import { model, Schema } from 'mongoose'
import { currentUnixTime } from '../utils'
import {
  CacheBase,
  CacheType,
  FiatRateCache,
  TokensCache,
} from '@crossify/types'
import { FiatRateCacheSchema, TokensCacheSchema } from '../schemas'

// Define the base schema
const CacheBaseSchema = new Schema<CacheBase>(
  {
    type: {
      type: String,
      enum: CacheType,
      required: true,
    },
    updatedAt: {
      type: Number,
      required: true,
      default: () => currentUnixTime(),
    },
  },
  { discriminatorKey: 'type' }
)

export default class CacheModel {
  public static Base = model('cache', CacheBaseSchema)
  public static Tokens = this.Base.discriminator<CacheBase & TokensCache>(
    CacheType.TOKENS,
    TokensCacheSchema
  )
  public static FiatRate = this.Base.discriminator<CacheBase & FiatRateCache>(
    CacheType.FIAT_RATE,
    FiatRateCacheSchema
  )
}
