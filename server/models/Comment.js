const mongoose = require('mongoose')
const Schema = mongoose.Schema

const commentSchema = new Schema(
  {
    title: { type: String },
    content: { type: String },
    _user: { type: Schema.Types.ObjectId, ref: 'User' },
    _thought: { type: Schema.Types.ObjectId, ref: 'Thought' },
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  }
)

const Comment = mongoose.model('Comment', commentSchema)
module.exports = Comment
