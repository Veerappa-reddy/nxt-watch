import {AiFillHome} from 'react-icons/ai'
import {BsFire} from 'react-icons/bs'
import {Component} from 'react'
import {SiYoutubegaming} from 'react-icons/si'
import {MdPlaylistAdd} from 'react-icons/md'
import {Link} from 'react-router-dom'
import SavedVideoContext from '../../context/SavedVideoContext'

import './index.css'

const MenuOptions = [
  {
    id: 1,
    optionIcon: AiFillHome,
    optionType: 'Home',
    link: '/',
  },
  {id: 2, optionIcon: BsFire, optionType: 'Trending', link: '/trending'},
  {id: 3, optionIcon: SiYoutubegaming, optionType: 'Gaming', link: '/gaming'},
  {
    id: 4,
    optionIcon: MdPlaylistAdd,
    optionType: 'Saved Videos',
    link: '/saved-videos',
  },
]

class Menu extends Component {
  render() {
    // const {activeId} = this.state
    // console.log(activeId)

    return (
      <SavedVideoContext.Consumer>
        {value => {
          const {lightTheme} = value

          /* const contactUsText = lightTheme ? null : 'contact-text' */

          const contactUsText2 = lightTheme ? null : 'contact-text-color'
          const {id} = this.props

          return (
            <div className="menu-follow-container">
              <ul className="menu-container">
                {MenuOptions.map(each => (
                  <MenuOption
                    each={each}
                    isActive={id === each.id}
                    // active={this.active}
                    key={each.id}
                  />
                ))}
              </ul>
              <div className={`contact-us-container ${contactUsText2}`}>
                <p className={`contact ${contactUsText2}`}>CONTACT US</p>
                <div className="logos-container">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/nxt-watch-facebook-logo-img.png "
                    alt="facebook logo"
                    className="app-logo"
                  />
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/nxt-watch-twitter-logo-img.png "
                    alt="twitter logo"
                    className="app-logo"
                  />
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/nxt-watch-linked-in-logo-img.png "
                    alt="linked in logo"
                    className="app-logo"
                  />
                </div>
                <p className={`contact-us-p ${contactUsText2}`}>
                  Enjoy! Now to see your channels and recommendations!
                </p>
              </div>
            </div>
          )
        }}
      </SavedVideoContext.Consumer>
    )
  }
}

const MenuOption = props => (
  <SavedVideoContext.Consumer>
    {value => {
      const {each, isActive} = props
      const {id, link, optionType, optionIcon} = each
      const MyComponent = optionIcon
      const {lightTheme, clickedMenuOption} = value

      const contactUsText = lightTheme ? null : 'contact-text'

      const clickedId = () => {
        clickedMenuOption(id)
      }

      console.log(isActive)

      const active = isActive ? 'fire' : null

      const optionFont = isActive ? 'weight' : null

      const activeMenuItem = isActive ? 'active-menu-item' : null

      /* activeMenuItem = lightTheme ? null : 'dark-option' */

      const darkActiveOption = isActive ? 'dark-option' : null

      return lightTheme ? (
        <Link to={link} className="menu-link">
          <li className={`menu-li-item ${activeMenuItem}`}>
            <button
              className={`menu-item-container ${contactUsText}`}
              type="button"
              onClick={clickedId}
            >
              <MyComponent size={20} className={active} />
              <h1 className={`menu-option ${optionFont}`}>{optionType}</h1>
            </button>
          </li>
        </Link>
      ) : (
        <Link to={link} className="menu-link">
          <li className={`menu-li-item ${darkActiveOption}`}>
            <button
              className={`menu-item-container ${contactUsText}`}
              type="button"
              onClick={clickedId}
            >
              <MyComponent size={20} className={active} />
              <h1 className={`menu-option ${optionFont}`}>{optionType}</h1>
            </button>
          </li>
        </Link>
      )
    }}
  </SavedVideoContext.Consumer>
)

export default Menu
