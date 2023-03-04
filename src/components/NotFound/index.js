import Menu from '../Menu'
import Header from '../Header'
import './index.css'

const NotFound = () => {
  const renderNotFoundResults = () => (
    <div className="not-found">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-light-theme-img.png"
        className="not-found-img"
        alt="not found"
      />
      <h1 className="not-found-heading">Page Not Found</h1>
      <p>we are sorry, the page you requested could not be found.</p>
    </div>
  )

  return (
    <div className="bg-container">
      <Header />
      <div className="home-container">
        <Menu />
        <div className="videos-main-container">
          <div className="not-found-container">{renderNotFoundResults()}</div>
        </div>
      </div>
    </div>
  )
}
export default NotFound
