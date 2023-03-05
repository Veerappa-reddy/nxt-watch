import {AiFillFire} from 'react-icons/ai'
import SavedVideoContext from '../../context/SavedVideoContext'
import SavedVideoItem from '../SavedVideoItem'
import Menu from '../Menu'
import Header from '../Header'
import './index.css'

const SavedVideos = () => (
  <SavedVideoContext.Consumer>
    {value => {
      const {savedVideosList, lightTheme} = value
      const background = lightTheme ? null : 'bg-2'
      const vediosBackground = lightTheme ? null : 'bg-3'
      const savedVideoLogo = lightTheme ? 'search-icon' : null

      return (
        <div className={`bg-container ${background}`}>
          <Header />
          <div className="home-container">
            <Menu />
            <div className={`videos-main-container saved ${vediosBackground}`}>
              <div className="trending-container">
                <AiFillFire className={savedVideoLogo} size={35} color="red" />
                <h1 className="trending-heading">Saved Videos</h1>
              </div>
              <ul className="videos-container saving">
                {savedVideosList.length > 0 ? (
                  savedVideosList.map(each => (
                    <SavedVideoItem itemDetails={each} key={each.id} />
                  ))
                ) : (
                  <div className="saved-container">
                    <img
                      src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-saved-videos-img.png "
                      alt="no saved videos"
                      className="no-saved-videos"
                    />
                    <h1 className="no-save">No saved videos found</h1>
                    <p className="no-save">
                      Save your videos by clicking a button
                    </p>
                  </div>
                )}
              </ul>
            </div>
          </div>
        </div>
      )
    }}
  </SavedVideoContext.Consumer>
)

export default SavedVideos
