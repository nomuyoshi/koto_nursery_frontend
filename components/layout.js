import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLeaf } from '@fortawesome/free-solid-svg-icons';

export default function Layout({ children }) {
  return (
    <div className="container is-max-desktop">
      <nav className="navbar is-success" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
          <Link href="/">
            <a className="navbar-item has-text-weight-bold is-size-4" >
              <span className="icon-text">
                <span className="icon">
                  <FontAwesomeIcon icon={faLeaf} size="lg" className="" />
                </span>
                <h1>KOTO ほいくえん</h1>
              </span>
            </a>
          </Link>
        </div>
      </nav>
      {children}
    </div>
  )
}
