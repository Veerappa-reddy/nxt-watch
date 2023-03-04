import {Link} from 'react-router-dom'
import SavedVideoContext from '../../context/SavedVideoContext'
import './index.css'

const VideoItem = props => {
  const {videoItemDetails} = props
  const {
    channel,
    publishedAt,
    thumbnailUrl,
    title,
    viewCount,
    id,
  } = videoItemDetails
  const updatedChannelDetails = {
    name: channel.name,
    profileImageUrl: channel.profile_image_url,
  }
  const {name, profileImageUrl} = updatedChannelDetails

  const renderLightHomeVideo = () => (
    <Link to={`/videos/${id}`} className="menu-link">
      <li>
        <div className="video-item">
          <img src={thumbnailUrl} alt="video thumbnail" className="video-img" />
          <div className="video-detail-container">
            <img
              src={profileImageUrl}
              alt="channel logo "
              className="channel-profile"
            />
            <div>
              <p className="video-title">{title}</p>
              <p className="channel-name">{name}</p>
              <div className="publish-count-details-container">
                <p>{viewCount} views</p>
                <p>{publishedAt}</p>
              </div>
            </div>
          </div>
        </div>
      </li>
    </Link>
  )

  const renderDarkHomeVideo = () => (
    <Link to={`/videos/${id}`} className="menu-link">
      <li>
        <div className="video-item bg-4">
          <img src={thumbnailUrl} alt="video thumbnail" className="video-img" />
          <div className="video-detail-container">
            <img
              src={profileImageUrl}
              alt="channel logo"
              className="channel-profile"
            />
            <div>
              <p className="video-title">{title}</p>
              <p className="channel-name">{name}</p>
              <div className="publish-count-details-container">
                <p>{viewCount} views</p>
                {publishedAt !== '' && <p>{publishedAt}</p>}
              </div>
            </div>
          </div>
        </div>
      </li>
    </Link>
  )

  return (
    <SavedVideoContext.Consumer>
      {value => {
        const {lightTheme} = value
        return lightTheme ? renderLightHomeVideo() : renderDarkHomeVideo()
      }}
    </SavedVideoContext.Consumer>
  )
}
export default VideoItem
