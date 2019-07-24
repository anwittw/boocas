const mongoose = require('mongoose')
const Schema = mongoose.Schema

const bookSchema = new Schema(
  {
    isbn_10: { type: String },
    isbn_13: { type: String },
    title: { type: String },
    author: { type: String },
    translator: { type: String },
    pages: { type: Number },
    year: { type: String },
    coverPictureUrl: { type: String, default: '' },
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  }
)

const Book = mongoose.model('Book', bookSchema)
module.exports = Book
