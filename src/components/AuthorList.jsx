import AuthorItem from './AuthorItem'
import './BookList.css'

function AuthorList({ authors, onEdit, onDelete }) {
  if (authors.length === 0) {
    return (
      <div className="empty-state">
        <p>No authors yet. Add your first author!</p>
      </div>
    )
  }

  return (
    <div className="book-list">
      {authors.map((author) => (
        <AuthorItem key={author.id} author={author} onEdit={onEdit} onDelete={onDelete} />
      ))}
    </div>
  )
}

export default AuthorList
