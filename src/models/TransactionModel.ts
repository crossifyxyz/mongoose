import { Schema, model } from 'mongoose'
import { currentUnixTime } from '../utils'
import {
  Transaction,
  TransactionScenario,
  TransactionStatus,
  TransactionType,
} from '@crossify/types'

const TransactionSchema = new Schema<Transaction>({
  uid: {
    type: String,
    required: true,
    immutable: true,
    default: function () {
      const t = this as any
      return String(t._id)
    },
  },
  receiptId: { type: String },
  type: { type: String, enum: TransactionType, required: true },
  scenario: { type: String, enum: TransactionScenario, required: true },
  txHash: { type: String, required: true },
  chainId: { type: Number, required: true },
  status: {
    type: String,
    enum: TransactionStatus,
    default: TransactionStatus.PENDING,
  },
  address: { type: String, required: true },
  toAddress: { type: String },
  description: { type: String },
  toDescription: { type: String },
  idle: { type: Boolean, default: false },
  route: { type: Object },
  date: { type: Number, required: true, default: () => currentUnixTime() },
})

const TransactionModel = model('transactions', TransactionSchema)

export default TransactionModel
