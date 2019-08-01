const mongoose = require('mongoose')
const Schema = mongoose.Schema

const actionSchema = new Schema(
  {
    _group: { type: Schema.Types.ObjectId, ref: 'Group' },
    type: {
      type: String,
      enum: ['comment', 'thought', 'group', 'book', 'membership'],
    },
    teaser: { type: String },
    link: { type: String },
    _user: { type: Schema.Types.ObjectId, ref: 'User' },
    _document: { type: Schema.Types.ObjectId, ref: 'Thought' },
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  }
)

const Action = mongoose.model('Action', actionSchema)
module.exports = Action
