const mongoose = require('mongoose')
const Schema = mongoose.Schema

const groupSchema = new Schema(
  {},
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  }
)

const Group = mongoose.model('Group', groupSchema)
module.exports = Group
