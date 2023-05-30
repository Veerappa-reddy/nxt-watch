import {AiFillHome, AiFillFire} from 'react-icons/ai'
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
  {id: 2, optionIcon: AiFillFire, optionType: 'Trending', link: '/trending'},
  {id: 3, optionIcon: SiYoutubegaming, optionType: 'Gaming', link: '/gaming'},
  {
    id: 4,
    optionIcon: MdPlaylistAdd,
    optionType: 'Saved Videos',
    link: '/saved-videos',
  },
]

class MobileMenus extends Component {
  render() {
    const {id} = this.props

    return (
      <ul className="mobile-menu-container">
        {MenuOptions.map(each => (
          <MenuOption
            each={each}
            isActive={id === each.id}
            // active={this.active}
            key={each.id}
          />
        ))}
      </ul>
    )
  }
}

const MenuOption = props => (
  <SavedVideoContext.Consumer>
    {value => {
      const {each, isActive} = props
      const {id, link, optionType, optionIcon} = each
      const MyComponent = optionIcon

      const {clickedMenuOption} = value

      const clickedId = () => {
        clickedMenuOption(id)
      }

      const active = isActive ? 'fire' : null

      const optionFont = isActive ? 'weight' : null

      return (
        <Link to={link} className="menu-link">
          <li className="mobile-menu-option" onClick={clickedId}>
            <MyComponent size={23} className={`menu-icon ${active}`} />
            <h1 className={`menu-option ${optionFont}`}>{optionType}</h1>
          </li>
        </Link>
      )
    }}
  </SavedVideoContext.Consumer>
)

export default MobileMenus
