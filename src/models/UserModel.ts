import { Schema, model } from 'mongoose'
import { UserStatus, UserRole, User, CurrencyType } from '@crossify/types'
import { currentUnixTime } from '../utils'
import { TokenSchema } from '../'

const UserSchema = new Schema<User>({
  // Identity
  uid: {
    type: String,
    required: true,
    immutable: true,
    default: function () {
      const _t = this as any
      return String(_t._id)
    },
  },
  address: { type: String, required: true },
  apiKey: { type: String },
  role: { type: String, enum: UserRole, default: UserRole.USER },
  status: { type: String, enum: UserStatus, default: UserStatus.ACTIVE },
  // Meta
  receiverAddress: { type: String },
  name: { type: String },
  email: { type: String },
  chainId: { type: Number },
  token: {
    type: TokenSchema,
    required: false,
    _id: false,
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
