import './BookItem.css'

function BookItem({ book, onEdit, onDelete }) {
  function handleDelete() {
    if (window.confirm(`Delete "${book.title}"?`)) {
      onDelete(book.id)
    }
  }

  return (
    <div className="book-item">
      <div className="book-info">
        <h3>{book.title}</h3>
        <p className="book-author">{book.author}{book.year ? ` · ${book.year}` : ''}</p>
        {book.description && <p className="book-description">{book.description}</p>}
      </div>
      <div className="book-actions">
        <button className="btn btn-secondary" onClick={() => onEdit(book)}>Edit</button>
        <button className="btn btn-danger" onClick={handleDelete}>Delete</button>
      </div>
    </div>
  )
}

export default BookItem
