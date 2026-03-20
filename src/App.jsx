import { useState, useEffect } from 'react'
import { listBooks, createBook, updateBook, deleteBook } from './api/books'
import { listAuthors, createAuthor, updateAuthor, deleteAuthor } from './api/authors'
import Navbar from './components/Navbar'
import BookList from './components/BookList'
import BookForm from './components/BookForm'
import AuthorList from './components/AuthorList'
import AuthorForm from './components/AuthorForm'
import './App.css'

function App() {
  const [page, setPage] = useState('books')
  const [books, setBooks] = useState([])
  const [authors, setAuthors] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [showForm, setShowForm] = useState(false)
  const [editingItem, setEditingItem] = useState(null)

  useEffect(() => {
    Promise.all([listBooks(), listAuthors()])
      .then(([booksData, authorsData]) => {
        setBooks(booksData)
        setAuthors(authorsData)
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  function handleNavigate(newPage) {
    setPage(newPage)
    setShowForm(false)
    setEditingItem(null)
  }

  function handleAdd() {
    setEditingItem(null)
    setShowForm(true)
  }

  function handleEdit(item) {
    setEditingItem(item)
    setShowForm(true)
  }

  function handleCancel() {
    setEditingItem(null)
    setShowForm(false)
  }

  // --- Books ---

  async function handleCreateBook(data) {
    try {
      const book = await createBook(data)
      setBooks((prev) => [book, ...prev])
      setShowForm(false)
    } catch (err) {
      setError(err.message)
    }
  }

  async function handleUpdateBook(data) {
    try {
      const updated = await updateBook(editingItem.id, data)
      setBooks((prev) => prev.map((b) => (b.id === updated.id ? updated : b)))
      setEditingItem(null)
      setShowForm(false)
    } catch (err) {
      setError(err.message)
    }
  }

  async function handleDeleteBook(id) {
    try {
      await deleteBook(id)
      setBooks((prev) => prev.filter((b) => b.id !== id))
    } catch (err) {
      setError(err.message)
    }
  }

  // --- Authors ---

  async function handleCreateAuthor(data) {
    try {
      const author = await createAuthor(data)
      setAuthors((prev) => [...prev, author].sort((a, b) => a.name.localeCompare(b.name)))
      setShowForm(false)
    } catch (err) {
      setError(err.message)
    }
  }

  async function handleUpdateAuthor(data) {
    try {
      const updated = await updateAuthor(editingItem.id, data)
      setAuthors((prev) =>
        prev.map((a) => (a.id === updated.id ? updated : a)).sort((a, b) => a.name.localeCompare(b.name))
      )
      setBooks((prev) =>
        prev.map((b) => (b.author.id === updated.id ? { ...b, author: updated } : b))
      )
      setEditingItem(null)
      setShowForm(false)
    } catch (err) {
      setError(err.message)
    }
  }

  async function handleDeleteAuthor(id) {
    try {
      await deleteAuthor(id)
      setAuthors((prev) => prev.filter((a) => a.id !== id))
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <>
      <Navbar page={page} onNavigate={handleNavigate} />
      <div className="app">
        {error && (
          <div className="error-banner">
            <span>{error}</span>
            <button onClick={() => setError(null)}>&times;</button>
          </div>
        )}

        {page === 'books' && (
          <>
            <header className="app-header">
              <h1>Books</h1>
              {!showForm && (
                <button className="btn btn-primary" onClick={handleAdd}>
                  Add Book
                </button>
              )}
            </header>

            {showForm && (
              <BookForm
                key={editingItem?.id ?? 'new'}
                initialData={editingItem}
                authors={authors}
                onSubmit={editingItem ? handleUpdateBook : handleCreateBook}
                onCancel={handleCancel}
              />
            )}

            <main>
              {loading ? (
                <p className="status-text">Loading...</p>
              ) : (
                <BookList books={books} onEdit={handleEdit} onDelete={handleDeleteBook} />
              )}
            </main>
          </>
        )}

        {page === 'authors' && (
          <>
            <header className="app-header">
              <h1>Authors</h1>
              {!showForm && (
                <button className="btn btn-primary" onClick={handleAdd}>
                  Add Author
                </button>
              )}
            </header>

            {showForm && (
              <AuthorForm
                key={editingItem?.id ?? 'new'}
                initialData={editingItem}
                onSubmit={editingItem ? handleUpdateAuthor : handleCreateAuthor}
                onCancel={handleCancel}
              />
            )}

            <main>
              {loading ? (
                <p className="status-text">Loading...</p>
              ) : (
                <AuthorList authors={authors} onEdit={handleEdit} onDelete={handleDeleteAuthor} />
              )}
            </main>
          </>
        )}
      </div>
    </>
  )
}

export default App
