import {Link} from 'react-router-dom'
import SavedVideoContext from '../../context/SavedVideoContext'
import './index.css'

const GamingVideoItem = props => {
  const {videoItemDetails} = props
  const {thumbnailUrl, title, viewCount, id} = videoItemDetails

  return (
    <SavedVideoContext.Consumer>
      {value => {
        const {lightTheme} = value

        const gameLight = lightTheme ? null : 'bg-4'

        return (
          <Link to={`/videos/${id}`} className="menu-link">
            <li>
              <div className={`video-item ${gameLight}`}>
                <img src={thumbnailUrl} alt="thumbnail" className="video-img" />
                <div className="video-detail-container">
                  <div>
                    <p className="video-title">{title}</p>

                    <div className="publish-count-details-container">
                      <p className="game-views">{viewCount} views</p>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          </Link>
        )
      }}
    </SavedVideoContext.Consumer>
  )
}
export default GamingVideoItem
