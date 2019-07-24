const mongoose = require('mongoose')
const Schema = mongoose.Schema

const membershipSchema = new Schema(
  {
    _user: { type: Schema.Types.ObjectId, ref: 'User' },
    _group: { type: Schema.Types.ObjectId, ref: 'Group' },
    isCreator: { type: Boolean, default: false },
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  }
)

const Membership = mongoose.model('Membership', MembershipSchema)
module.exports = Membership
