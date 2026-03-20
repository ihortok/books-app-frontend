import './BookItem.css'

function AuthorItem({ author, onEdit, onDelete }) {
  function handleDelete() {
    if (window.confirm(`Delete "${author.name}"?`)) {
      onDelete(author.id)
    }
  }

  return (
    <div className="book-item">
      <div className="book-info">
        <h3>{author.name}</h3>
      </div>
      <div className="book-actions">
        <button className="btn btn-secondary" onClick={() => onEdit(author)}>Edit</button>
        <button className="btn btn-danger" onClick={handleDelete}>Delete</button>
      </div>
    </div>
  )
}

export default AuthorItem
