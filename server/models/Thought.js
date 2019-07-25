const mongoose = require('mongoose')
const Schema = mongoose.Schema

const thoughtSchema = new Schema(
  {
    _user: { type: Schema.Types.ObjectId, ref: 'User' },
    _group: { type: Schema.Types.ObjectId, ref: 'Group' },
    title: { type: String, default: 'Nutrias Punching Marmots' },
    quote: { type: String },
    book_chapter: { type: String },
    book_page: { type: Number },
    content: { type: String, required: true },
    titlePictureUrl: { type: String, default: '' },
    links: { type: Array, default: [] },
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  }
)

const Thought = mongoose.model('Thought', thoughtSchema)
module.exports = Thought
