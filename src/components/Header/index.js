import Cookies from 'js-cookie'
import {withRouter, Link} from 'react-router-dom'
import Popup from 'reactjs-popup'
import 'reactjs-popup/dist/index.css'
import SavedVideoContext from '../../context/SavedVideoContext'
import './index.css'

const Header = props => (
  <SavedVideoContext.Consumer>
    {value => {
      const {lightTheme, clickTheme} = value

      const logout = () => {
        const {history} = props
        Cookies.remove('jwt_token')
        history.replace('/login')
      }

      const changeTheme = () => {
        clickTheme(!lightTheme)
      }

      const renderLightDetails = () => (
        <div className="navbar-container">
          <Link to="/">
            <img
              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
              alt="website logo"
              className="nav-website-log"
            />
          </Link>
          <div className="nav-right-side-details">
            <button type="button" data-testid="theme" className="theme-btn">
              <img
                src="https://assets.ccbp.in/frontend/react-js/dark-theme-img.png"
                alt="theme"
                className="theme-img"
                onClick={changeTheme}
              />
            </button>
            <img
              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png "
              alt="profile"
              className="profile-img"
            />
            <Popup
              modal
              trigger={
                <button className="logout-btn" type="button" onClick={logout}>
                  Logout
                </button>
              }
            >
              {close => (
                <div className="logout-pop-up-container">
                  <p className="logout-text">
                    Are you sure, you want to logout
                  </p>
                  <div className="buttons">
                    <button
                      type="button"
                      className="cancel-btn"
                      onClick={() => close()}
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      className="confirm-btn"
                      onClick={logout}
                    >
                      Confirm
                    </button>
                  </div>
                </div>
              )}
            </Popup>
          </div>
        </div>
      )

      const renderDarkDetails = () => (
        <div className="navbar-container nav-dark">
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png"
            alt="website logo"
            className="nav-website-log"
          />
          <div className="nav-right-side-details">
            <button type="button" data-testid="theme" className="theme-btn">
              <img
                src="https://assets.ccbp.in/frontend/react-js/light-theme-img.png"
                alt="theme"
                className="theme-img"
                type="button"
                onClick={changeTheme}
              />
            </button>
            <img
              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png "
              alt="profile"
              className="profile-img"
            />
            <Popup
              modal
              trigger={
                <button
                  className="logout-btn dark-btn"
                  type="button"
                  onClick={logout}
                >
                  Logout
                </button>
              }
            >
              {close => (
                <div className="logout-pop-up-container">
                  <p className="logout-text">
                    Are you sure, you want to logout
                  </p>
                  <div className="buttons">
                    <button
                      type="button"
                      className="cancel-btn"
                      onClick={() => close()}
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      className="confirm-btn"
                      onClick={logout}
                    >
                      Confirm
                    </button>
                  </div>
                </div>
              )}
            </Popup>
          </div>
        </div>
      )

      return lightTheme ? renderLightDetails() : renderDarkDetails()
    }}
  </SavedVideoContext.Consumer>
)

export default withRouter(Header)
