import {Link} from 'react-router-dom'
import {formatDistance} from 'date-fns'
import SavedVideoContext from '../../context/SavedVideoContext'
import './index.css'

const TrendingVideoItem = props => {
  const {videoItemDetails} = props
  const {
    channel,
    publishedAt,
    thumbnailUrl,
    title,
    id,
    viewCount,
  } = videoItemDetails
  const updatedChannelDetails = {
    name: channel.name,
    profileImageUrl: channel.profile_image_url,
  }
  const {name, profileImageUrl} = updatedChannelDetails
  //   console.log(formatDistanceToNow(new Date(publishedAt)))

  return (
    <SavedVideoContext.Consumer>
      {value => {
        const {lightTheme} = value

        const trendLight = lightTheme ? null : 'bg-4'

        const trendViewsContainer = lightTheme ? null : 'dark-item-views'

        const formatDate = formatDistance(new Date(publishedAt), new Date(), {
          addSuffix: true,
        })
        const date = formatDate
          .replace('about', '')
          .replace('over', '')
          .replace('almost', '')

        return (
          <Link to={`/videos/${id}`} className="menu-link">
            <li>
              <div className={`trending-item ${trendLight}`}>
                <img src={thumbnailUrl} alt="thumbnail" className="video-img" />
                <div className="trending-text-container">
                  <img
                    src={profileImageUrl}
                    alt="profile"
                    className="channel-profile"
                  />
                  <div className="trend-details-container">
                    <p className="trend-video-title">{title}</p>
                    <div className="trending-views-container">
                      <p
                        className={`trend-channel-name ${trendViewsContainer}`}
                      >
                        {name}
                      </p>
                      <div className="trending-count-container">
                        <p className={`trend-count ${trendViewsContainer}`}>
                          {viewCount} views
                        </p>
                        <p className={`trend-count ${trendViewsContainer}`}>
                          {date}
                        </p>
                      </div>
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
export default TrendingVideoItem
