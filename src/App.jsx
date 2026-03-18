import { useState, useEffect } from 'react'
import { listBooks, createBook, updateBook, deleteBook } from './api/books'
import BookList from './components/BookList'
import BookForm from './components/BookForm'
import './App.css'

function App() {
  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [showForm, setShowForm] = useState(false)
  const [editingBook, setEditingBook] = useState(null)

  useEffect(() => {
    listBooks()
      .then(setBooks)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  async function handleCreate(data) {
    try {
      const book = await createBook(data)
      setBooks((prev) => [book, ...prev])
      setShowForm(false)
    } catch (err) {
      setError(err.message)
    }
  }

  async function handleUpdate(data) {
    try {
      const updated = await updateBook(editingBook.id, data)
      setBooks((prev) => prev.map((b) => (b.id === updated.id ? updated : b)))
      setEditingBook(null)
      setShowForm(false)
    } catch (err) {
      setError(err.message)
    }
  }

  async function handleDelete(id) {
    try {
      await deleteBook(id)
      setBooks((prev) => prev.filter((b) => b.id !== id))
    } catch (err) {
      setError(err.message)
    }
  }

  function handleEdit(book) {
    setEditingBook(book)
    setShowForm(true)
  }

  function handleCancel() {
    setEditingBook(null)
    setShowForm(false)
  }

  function handleAdd() {
    setEditingBook(null)
    setShowForm(true)
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>Books</h1>
        {!showForm && (
          <button className="btn btn-primary" onClick={handleAdd}>
            Add Book
          </button>
        )}
      </header>

      {error && (
        <div className="error-banner">
          <span>{error}</span>
          <button onClick={() => setError(null)}>&times;</button>
        </div>
      )}

      {showForm && (
        <BookForm
          key={editingBook?.id ?? 'new'}
          initialData={editingBook}
          onSubmit={editingBook ? handleUpdate : handleCreate}
          onCancel={handleCancel}
        />
      )}

      <main>
        {loading ? (
          <p className="status-text">Loading...</p>
        ) : (
          <BookList books={books} onEdit={handleEdit} onDelete={handleDelete} />
        )}
      </main>
    </div>
  )
}

export default App
