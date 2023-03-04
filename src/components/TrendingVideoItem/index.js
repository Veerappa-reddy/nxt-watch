// import {formatDistanceToNow} from 'date-fns'
import {Link} from 'react-router-dom'
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
  const {name} = updatedChannelDetails
  //   console.log(formatDistanceToNow(new Date(publishedAt)))

  return (
    <SavedVideoContext.Consumer>
      {value => {
        const {lightTheme} = value

        const trendLight = lightTheme ? null : 'bg-4'

        return (
          <Link to={`/videos/${id}`} className="menu-link">
            <li>
              <div className={`trending-item ${trendLight}`}>
                <img src={thumbnailUrl} alt="thumbnail" className="video-img" />
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
}
export default TrendingVideoItem
