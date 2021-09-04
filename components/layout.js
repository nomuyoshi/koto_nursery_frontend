import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLeaf } from '@fortawesome/free-solid-svg-icons';

export default function Layout({ children }) {
  return (
    <div className="container is-max-desktop">
      <nav className="navbar is-success" role="navigation" aria-label="main navigation">
        <div className="navbar-brand ml-2">
          <Link href="/">
            <a className="navbar-item is-size-4" >
              <span className="icon-text">
                <span className="icon">
                  <FontAwesomeIcon icon={faLeaf} size="lg" className="" />
                </span>
                <h1 className="has-text-weight-bold">KOTO ほいくえん</h1>
              </span>
            </a>
          </Link>
        </div>
      </nav>
      {children}
    </div>
  )
}
