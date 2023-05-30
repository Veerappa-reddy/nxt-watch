import {Link} from 'react-router-dom'
import {formatDistance} from 'date-fns'
import SavedVideoContext from '../../context/SavedVideoContext'
import './index.css'

const HomeVideoItem = props => {
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
  const formatDate = formatDistance(new Date(publishedAt), new Date(), {
    addSuffix: true,
  })
  const date = formatDate
    .replace('about', '')
    .replace('over', '')
    .replace('almost', '')

  const renderLightHomeVideo = () => (
    <Link to={`/videos/${id}`} className="menu-link">
      <li>
        <div className="video-item">
          <img src={thumbnailUrl} alt="video thumbnail" className="video-img" />
          <div className="video-detail-container">
            <img
              src={profileImageUrl}
              alt="channel logo"
              className="home-vedio-item-channel-profile"
            />
            <div>
              <p className="video-title">{title}</p>
              <div className="home-vedio-item">
                <p className="channel-name">{name}</p>
                <div className="publish-count-details-container">
                  <p className="home-vedio-views">{viewCount} views</p>
                  <p className="home-vedio-views">{date}</p>
                </div>
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
              className="home-vedio-item-channel-profile"
            />
            <div className="vedio-item-text-cont">
              <p className="video-title">{title}</p>
              <div className="home-vedio-item">
                <p className="channel-name dark-item-views">{name}</p>
                <div className="publish-count-details-container ">
                  <p className="home-vedio-views dark-item-views">
                    {viewCount} views
                  </p>
                  <p className="home-vedio-views dark-item-views">{date}</p>
                </div>
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
export default HomeVideoItem
