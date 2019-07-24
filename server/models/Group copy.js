const mongoose = require('mongoose')
const Schema = mongoose.Schema

const commentSchema = new Schema(
  {},
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  }
)

const Comment = mongoose.model('Comment', commentSchema)
module.exports = Comment
