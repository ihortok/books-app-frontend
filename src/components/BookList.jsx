import BookItem from './BookItem'
import './BookList.css'

function BookList({ books, onEdit, onDelete }) {
  if (books.length === 0) {
    return (
      <div className="empty-state">
        <p>No books yet. Add your first book!</p>
      </div>
    )
  }

  return (
    <div className="book-list">
      {books.map((book) => (
        <BookItem key={book.id} book={book} onEdit={onEdit} onDelete={onDelete} />
      ))}
    </div>
  )
}

export default BookList
