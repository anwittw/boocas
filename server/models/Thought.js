const mongoose = require('mongoose')
const Schema = mongoose.Schema

const thoughtSchema = new Schema(
  {},
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  }
)

const Thought = mongoose.model('Thought', thoughtSchema)
module.exports = Thought
