import { useState } from 'react'
import './BookForm.css'

function AuthorForm({ onSubmit, onCancel, initialData }) {
  const [name, setName] = useState(initialData?.name ?? '')

  function handleSubmit(e) {
    e.preventDefault()
    onSubmit({ name })
  }

  return (
    <form className="book-form" onSubmit={handleSubmit}>
      <h2>{initialData ? 'Edit Author' : 'Add Author'}</h2>
      <div className="form-field">
        <label htmlFor="name">Name</label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
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

export default AuthorForm
