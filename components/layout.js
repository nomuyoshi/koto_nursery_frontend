export default function Layout({ children }) {
  return (
    <div className="container is-max-desktop">
      <nav className="navbar" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
          <a className="navbar-item" href="https://bulma.io">
            <img src="https://bulma.io/images/bulma-logo.png" alt="Bulma: Free, open source, and modern CSS framework based on Flexbox" width="112" height="28" />
          </a>
        </div>
      </nav>
      {children}
    </div>
  )
}
