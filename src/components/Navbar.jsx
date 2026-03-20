import './Navbar.css'

function Navbar({ page, onNavigate }) {
  return (
    <nav className="navbar">
      <button
        className={`nav-link${page === 'books' ? ' active' : ''}`}
        onClick={() => onNavigate('books')}
      >
        Books
      </button>
      <button
        className={`nav-link${page === 'authors' ? ' active' : ''}`}
        onClick={() => onNavigate('authors')}
      >
        Authors
      </button>
    </nav>
  )
}

export default Navbar
