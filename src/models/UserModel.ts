import { Schema, model } from 'mongoose'
import {
  UserStatus,
  UserRole,
  User,
  CurrencyType,
  ChainType,
  getChainTypeByAddress,
} from '@crossify/types'
import { currentUnixTime } from '../utils'
import { StaticTokenSchema, TokenBalancesCacheSchema } from '../'

const UserSchema = new Schema<User>({
  // Identity
  uid: {
    type: String,
    required: true,
    immutable: true,
    default: function () {
      const t = this as any
      return String(t._id)
    },
  },
  address: { type: String, required: true, immutable: true },
  chainType: {
    type: String,
    enum: ChainType,
    required: true,
    immutable: true,
    default: function () {
      return getChainTypeByAddress(this.address)!
    },
  },
  apiKey: { type: String },
  role: { type: String, enum: UserRole, default: UserRole.USER },
  status: { type: String, enum: UserStatus, default: UserStatus.ACTIVE },
  // Meta
  receiverAddress: { type: String },
  userName: { type: String },
  displayName: { type: String },
  email: { type: String },
  // chainId: { type: Number },
  tokenBalances: { type: TokenBalancesCacheSchema },
  token: {
    type: StaticTokenSchema,
  },
  currency: {
    type: String,
    enum: CurrencyType,
    default: CurrencyType.FIAT,
  },
  // Date
  date: { type: Number, required: true, default: () => currentUnixTime() },
})

const UserModel = model('users', UserSchema)

export default UserModel
