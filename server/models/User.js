const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema(
  {
    username: { type: String },
    email: { type: String },
    password: { type: String },
    pictureUrl: { type: String, default: '' },
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  }
)

const User = mongoose.model('User', userSchema)
module.exports = User
