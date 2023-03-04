import {Link} from 'react-router-dom'
import SavedVideoContext from '../../context/SavedVideoContext'
import './index.css'

const SavedVideoItem = props => (
  <SavedVideoContext.Consumer>
    {value => {
      const {itemDetails} = props
      const {
        channel,
        publishedAt,
        thumbnailUrl,
        title,
        id,
        viewCount,
      } = itemDetails
      const {name} = channel
      const {lightTheme} = value
      const trendLight = lightTheme ? null : 'bg-4'

      return (
        <Link to={`/videos/${id}`} className="menu-link">
          <li>
            <div className={`trending-item ${trendLight}`}>
              <img
                src={thumbnailUrl}
                alt="video thumbnail"
                className="video-img two"
              />
              <div className="trending-text-container">
                <p className="video-title">{title}</p>
                <p className="channel-name">{name}</p>
                <div className="trend-publish-count-details-container">
                  <p>{viewCount} views</p>
                  <p>{publishedAt}</p>
                </div>
              </div>
            </div>
          </li>
        </Link>
      )
    }}
  </SavedVideoContext.Consumer>
)

export default SavedVideoItem
