import {Link} from 'react-router-dom'
import {formatDistance} from 'date-fns'
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
      const formatDate = formatDistance(new Date(publishedAt), new Date(), {
        addSuffix: true,
      })
      const date = formatDate.replace('about', '').replace('over', '')

      return (
        <Link to={`/videos/${id}`} className="menu-link">
          <li>
            <div className={`saved-vedio-item ${trendLight}`}>
              <img
                src={thumbnailUrl}
                alt="video thumbnail"
                className="video-img two"
              />
              <div className="saved-vedio-text-container">
                <p className="video-title">{title}</p>
                <div className="saved-vedio-views-container">
                  <p className="channel-name">{name}</p>
                  <div className="trend-publish-count-details-container">
                    <p className="saved-vedio-views">{viewCount} views</p>
                    <p className="saved-vedio-views">{date}</p>
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

export default SavedVideoItem
