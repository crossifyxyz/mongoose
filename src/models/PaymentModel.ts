// PAYMENT MODEL
import { Schema, model } from 'mongoose'
import {
  CurrencyType,
  PaymentStatus,
  PaymentType,
  Payment,
} from '@crossify/types'
import { currentUnixTime } from '../utils'

// SCHEMA
const PaymentSchema = new Schema<Payment>({
  // Identifiers
  uid: {
    type: String,
    required: true,
    immutable: true,
    default: function () {
      return String(this._id)
    },
  },
  creatorAddress: {
    type: String,
    required: true,
  },
  type: { type: String, enum: PaymentType, default: PaymentType.SINGLE },
  advanced: { type: Boolean, default: false },
  status: {
    type: String,
    enum: PaymentStatus,
    default: function () {
      const doc = this as Payment
      if (doc.type === PaymentType.SINGLE) return PaymentStatus.AWAITING
      else return PaymentStatus.OPEN
    },
  },
  title: { type: String },
  imageURL: { type: String },
  // Price Data
  currency: {
    type: {
      currencyType: {
        type: String,
        enum: CurrencyType,
        default: CurrencyType.FIAT,
      },
      fiat: {
        type: String,
        required: function () {
          const doc = this as Payment['currency']
          return doc.currencyType === CurrencyType.FIAT
        },
      },
      amount: { type: Number, required: true },
    },
    _id: false,
  },
  // Tx Data
  receiverAddress: {
    type: String,
    default: function () {
      const doc = this as Payment
      return doc.creatorAddress
    },
  },
  chainId: { type: Number, required: true },
  tokenAddress: { type: String, required: true },
  // PaymentProps
  fields: {
    type: {
      name: { type: Boolean },
      email: { type: Boolean },
      shippingAddress: { type: Boolean },
      billingAddress: { type: Boolean },
      country: { type: Boolean },
      quantity: {
        type: {
          isEnabled: { type: Boolean, required: true },
          min: { type: Number },
          max: { type: Number, required: true },
        },
        _id: false,
      },
    },
    default: {},
    _id: false,
  },
  // Analytics
  visitCount: { type: Number, default: 0 },
  // DATE
  date: { type: Number, required: true, default: () => currentUnixTime() },
})

const PaymentModel = model<Payment>('payment', PaymentSchema)

export default PaymentModel
