import Cookies from 'js-cookie'
import {withRouter, Link} from 'react-router-dom'
import {Component} from 'react'
import {FiLogOut} from 'react-icons/fi'
import {FaMoon} from 'react-icons/fa'
// import {GiHamburgerMenu} from 'react-icons/gi'
import Popup from 'reactjs-popup'
import 'reactjs-popup/dist/index.css'
import SavedVideoContext from '../../context/SavedVideoContext'
import './index.css'

class Header extends Component {
  constructor(props) {
    super(props)

    this.state = {isVisible: true}
    this.handleScroll = this.handleScroll.bind(this)
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll)
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
  }

  handleScroll() {
    const {isVisible} = this.state
    const currentScrollPos = window.pageYOffset
    const isScrolledDown = currentScrollPos < this.prevScrollPos

    if (isScrolledDown !== isVisible) {
      this.setState({isVisible: isScrolledDown})
    }

    this.prevScrollPos = currentScrollPos
  }

  render() {
    const {isVisible} = this.state
    return (
      <SavedVideoContext.Consumer>
        {value => {
          const {lightTheme, clickTheme} = value

          const logout = () => {
            const {history} = this.props
            Cookies.remove('jwt_token')
            history.replace('/login')
          }

          const changeTheme = () => {
            clickTheme(!lightTheme)
          }

          const renderLightDetails = () => (
            <div className={isVisible ? 'navbar' : 'navbar hidden'}>
              <div className="navbar-container">
                <Link to="/">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
                    alt="website logo"
                    className="nav-website-log"
                  />
                </Link>
                <div className="nav-right-side-details">
                  <button
                    type="button"
                    data-testid="theme"
                    className="theme-btn"
                  >
                    {/* <img
                src="https://assets.ccbp.in/frontend/react-js/dark-theme-img.png"
                alt="theme"
                className="theme-img"
                onClick={changeTheme}
              /> */}
                    <FaMoon
                      className="theme-img"
                      onClick={changeTheme}
                      size={22}
                    />
                  </button>
                  <div className="profile-hamber-menu-container">
                    <img
                      src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png "
                      alt="profile"
                      className="profile-img"
                    />
                    {/* <GiHamburgerMenu className="hamberger-menu" size={32} /> */}
                  </div>
                  <Popup
                    modal
                    trigger={
                      <>
                        <button
                          className="logout-btn"
                          type="button"
                          onClick={logout}
                        >
                          Logout
                        </button>
                        <FiLogOut
                          className="logout-icon"
                          size={26}
                          onClick={logout}
                        />
                      </>
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
            </div>
          )

          const renderDarkDetails = () => (
            <div className={isVisible ? 'navbar' : 'navbar hidden'}>
              <div className="navbar-container nav-dark">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png"
                  alt="website logo"
                  className="nav-website-log"
                />
                <div className="nav-right-side-details">
                  <button
                    type="button"
                    data-testid="theme"
                    className="theme-btn"
                  >
                    <img
                      src="https://assets.ccbp.in/frontend/react-js/light-theme-img.png"
                      alt="theme"
                      className="theme-img"
                      type="button"
                      onClick={changeTheme}
                    />
                  </button>
                  <div className="profile-hamber-menu-container">
                    <img
                      src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png "
                      alt="profile"
                      className="profile-img"
                    />
                    {/* <GiHamburgerMenu
                className="hamberger-menu"
                size={34}
                color="#fff"
              /> */}
                  </div>
                  <Popup
                    modal
                    trigger={
                      <>
                        <button
                          className="logout-btn dark-btn"
                          type="button"
                          onClick={logout}
                        >
                          Logout
                        </button>
                        <FiLogOut
                          className="logout-icon"
                          size={26}
                          color="#fff"
                          onClick={logout}
                        />
                      </>
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
            </div>
          )

          return lightTheme ? renderLightDetails() : renderDarkDetails()
        }}
      </SavedVideoContext.Consumer>
    )
  }
}
// props => (
//   <SavedVideoContext.Consumer>
//     {value => {
//       const {lightTheme, clickTheme} = value

//       const logout = () => {
//         const {history} = props
//         Cookies.remove('jwt_token')
//         history.replace('/login')
//       }

//       const changeTheme = () => {
//         clickTheme(!lightTheme)
//       }

//       const renderLightDetails = () => (
//         <div className="navbar-container">
//           <Link to="/">
//             <img
//               src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
//               alt="website logo"
//               className="nav-website-log"
//             />
//           </Link>
//           <div className="nav-right-side-details">
//             <button type="button" data-testid="theme" className="theme-btn">
//               {/* <img
//                 src="https://assets.ccbp.in/frontend/react-js/dark-theme-img.png"
//                 alt="theme"
//                 className="theme-img"
//                 onClick={changeTheme}
//               /> */}
//               <FaMoon className="theme-img" onClick={changeTheme} size={22} />
//             </button>
//             <div className="profile-hamber-menu-container">
//               <img
//                 src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png "
//                 alt="profile"
//                 className="profile-img"
//               />
//               {/* <GiHamburgerMenu className="hamberger-menu" size={32} /> */}
//             </div>
//             <Popup
//               modal
//               trigger={
//                 <>
//                   <button className="logout-btn" type="button" onClick={logout}>
//                     Logout
//                   </button>
//                   <FiLogOut
//                     className="logout-icon"
//                     size={26}
//                     onClick={logout}
//                   />
//                 </>
//               }
//             >
//               {close => (
//                 <div className="logout-pop-up-container">
//                   <p className="logout-text">
//                     Are you sure, you want to logout
//                   </p>
//                   <div className="buttons">
//                     <button
//                       type="button"
//                       className="cancel-btn"
//                       onClick={() => close()}
//                     >
//                       Cancel
//                     </button>
//                     <button
//                       type="button"
//                       className="confirm-btn"
//                       onClick={logout}
//                     >
//                       Confirm
//                     </button>
//                   </div>
//                 </div>
//               )}
//             </Popup>
//           </div>
//         </div>
//       )

//       const renderDarkDetails = () => (
//         <div className="navbar-container nav-dark">
//           <img
//             src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png"
//             alt="website logo"
//             className="nav-website-log"
//           />
//           <div className="nav-right-side-details">
//             <button type="button" data-testid="theme" className="theme-btn">
//               <img
//                 src="https://assets.ccbp.in/frontend/react-js/light-theme-img.png"
//                 alt="theme"
//                 className="theme-img"
//                 type="button"
//                 onClick={changeTheme}
//               />
//             </button>
//             <div className="profile-hamber-menu-container">
//               <img
//                 src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png "
//                 alt="profile"
//                 className="profile-img"
//               />
//               {/* <GiHamburgerMenu
//                 className="hamberger-menu"
//                 size={34}
//                 color="#fff"
//               /> */}
//             </div>
//             <Popup
//               modal
//               trigger={
//                 <>
//                   <button
//                     className="logout-btn dark-btn"
//                     type="button"
//                     onClick={logout}
//                   >
//                     Logout
//                   </button>
//                   <FiLogOut
//                     className="logout-icon"
//                     size={26}
//                     color="#fff"
//                     onClick={logout}
//                   />
//                 </>
//               }
//             >
//               {close => (
//                 <div className="logout-pop-up-container">
//                   <p className="logout-text">
//                     Are you sure, you want to logout
//                   </p>
//                   <div className="buttons">
//                     <button
//                       type="button"
//                       className="cancel-btn"
//                       onClick={() => close()}
//                     >
//                       Cancel
//                     </button>
//                     <button
//                       type="button"
//                       className="confirm-btn"
//                       onClick={logout}
//                     >
//                       Confirm
//                     </button>
//                   </div>
//                 </div>
//               )}
//             </Popup>
//           </div>
//         </div>
//       )

//       return lightTheme ? renderLightDetails() : renderDarkDetails()
//     }}
//   </SavedVideoContext.Consumer>

export default withRouter(Header)
