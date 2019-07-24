const mongoose = require('mongoose')
const Schema = mongoose.Schema

const membershipSchema = new Schema(
  {},
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  }
)

const Membership = mongoose.model('Membership', MembershipSchema)
module.exports = Membership
