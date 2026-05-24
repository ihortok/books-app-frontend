import './Navbar.css'

function Navbar({ page, onNavigate, user }) {
  return (
    <nav className="navbar">
      <div className="navbar-links">
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
      </div>
      {user && (
        <div className="navbar-user">
          <span className="navbar-email">{user.email}</span>
          <a className="nav-link" href="/api/auth/logout">
            Sign out
          </a>
        </div>
      )}
    </nav>
  )
}

export default Navbar
