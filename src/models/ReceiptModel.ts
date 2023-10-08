// PAYMENT MODEL
import { Schema, model } from 'mongoose'
import { TransactionStatus, Receipt } from '@crossify/types'
import { currentUnixTime } from '../utils'

// RECEIPT SCHEMA
const ReceiptSchema = new Schema<Receipt>({
  uid: {
    type: String,
    required: true,
    immutable: true,
    default: function () {
      const t = this as any
      return String(t._id)
    },
  },
  txHash: { type: String, required: true },
  paymentId: { type: String, required: true },
  // Chain Data
  fromChainId: { type: Number, required: true },
  toChainId: { type: Number, required: true },
  fromAddress: { type: String, required: true },
  toAddress: { type: String, required: true },
  fromTokenAddress: { type: String, required: true },
  toTokenAddress: { type: String, required: true },
  status: {
    type: String,
    enum: TransactionStatus,
    default: TransactionStatus.PENDING,
  },
  // Price Data
  fromTokenAmount: { type: Number, required: true },
  toTokenAmount: { type: Number, required: true },
  amountUSD: { type: Number, required: true },
  receiverFiat: { type: String },
  senderFiat: { type: String },
  amountReceiverFiat: { type: Number },
  amountSenderFiat: { type: Number },
  // Fee Data
  percentagePlatformFee: { type: Number, required: true }, // 0.5%
  gasFeeUSD: { type: Number, required: true }, // 1
  gasFeeSenderFiat: { type: Number }, // 1
  // ReceiptProps
  fields: {
    type: {
      title: { type: String },
      name: { type: String },
      email: { type: String },
      country: { type: String },
      quantity: { type: Number },
      shippingAddress: { type: String },
      billingAddress: {
        type: String,
        default: function () {
          const _t = this as any
          if (_t?.shippingAddress) return String(_t.shippingAddress)
        },
      },
    },
    default: {},
    _id: false,
  },
  // Date
  date: { type: Number, required: true, default: () => currentUnixTime() },
})

const ReceiptModel = model('receipts', ReceiptSchema)

export default ReceiptModel
