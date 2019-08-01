const mongoose = require('mongoose')
const Schema = mongoose.Schema

const commentSchema = new Schema(
  {
    content: { type: String },
    _user: { type: Schema.Types.ObjectId, ref: 'User' },
    _thought: { type: Schema.Types.ObjectId, ref: 'Thought' },
    _group: { type: Schema.Types.ObjectId, ref: 'Group' },
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
