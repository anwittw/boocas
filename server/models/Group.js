const mongoose = require('mongoose')
const Schema = mongoose.Schema

const groupSchema = new Schema(
  {
    _book: { type: Schema.Types.ObjectId, ref: 'Book' },
    name: { type: String },
    description: { type: String },
    isPrivate: { type: Boolean, default: false },
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  }
)

const Group = mongoose.model('Group', groupSchema)
module.exports = Group
