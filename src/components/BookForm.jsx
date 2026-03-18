import { useState } from 'react'
import './BookForm.css'

function BookForm({ onSubmit, onCancel, initialData }) {
  const [title, setTitle] = useState(initialData?.title ?? '')
  const [author, setAuthor] = useState(initialData?.author ?? '')
  const [year, setYear] = useState(initialData?.year ?? '')
  const [description, setDescription] = useState(initialData?.description ?? '')

  function handleSubmit(e) {
    e.preventDefault()
    onSubmit({
      title,
      author,
      year: year ? parseInt(year, 10) : null,
      description: description || null,
    })
  }

  return (
    <form className="book-form" onSubmit={handleSubmit}>
      <h2>{initialData ? 'Edit Book' : 'Add Book'}</h2>
      <div className="form-field">
        <label htmlFor="title">Title</label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div className="form-field">
        <label htmlFor="author">Author</label>
        <input
          id="author"
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          required
        />
      </div>
      <div className="form-field">
        <label htmlFor="year">Year</label>
        <input
          id="year"
          type="number"
          value={year}
          onChange={(e) => setYear(e.target.value)}
        />
      </div>
      <div className="form-field">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
        />
      </div>
      <div className="form-actions">
        <button type="submit" className="btn btn-primary">
          {initialData ? 'Save' : 'Create'}
        </button>
        <button type="button" className="btn btn-secondary" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  )
}

export default BookForm
