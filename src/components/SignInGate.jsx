import './SignInGate.css'

function SignInGate() {
  return (
    <div className="sign-in-gate">
      <h1>Books</h1>
      <p>Please sign in with your Aronnax account to continue.</p>
      <a className="btn btn-primary" href="/api/auth/login">
        Sign in with Aronnax
      </a>
    </div>
  )
}

export default SignInGate
