import {Component} from 'react'
import Cookies from 'js-cookie'
import ReactPlayer from 'react-player'
import Loader from 'react-loader-spinner'
import {formatDistance} from 'date-fns'
import {AiOutlineLike} from 'react-icons/ai'
import {BiDislike} from 'react-icons/bi'
import {MdPlaylistAdd} from 'react-icons/md'
import SavedVideoContext from '../../context/SavedVideoContext'
import Menu from '../Menu'
// import MobileMenus from '../MobileMenus'
import Header from '../Header'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class VideoItemDetails extends Component {
  constructor(props) {
    super(props)
    this.state = {
      videoItemDetails: {},
      apiStatus: apiStatusConstants.initial,
      isLiked: false,
      isDisLiked: false,
    }
    this.isSaved = false
  }

  componentDidMount() {
    this.getVideoItemDetails()
  }

  likeVideo = () => {
    this.setState({isLiked: true, isDisLiked: false})
  }

  dislikeVideo = () => {
    this.setState({isDisLiked: true, isLiked: false})
  }

  getVideoItemDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {match} = this.props
    const {params} = match
    const {id} = params
    // console.log(id)

    const jwtToken = Cookies.get('jwt_token')
    console.log(jwtToken)

    const url = `https://apis.ccbp.in/videos/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      const updatedVideoItemDetails = {
        channel: {
          name: data.video_details.channel.name,
          profileImageUrl: data.video_details.channel.profile_image_url,
          subscriberCount: data.video_details.channel.subscriber_count,
        },
        description: data.video_details.description,
        publishedAt: data.video_details.published_at,
        id: data.video_details.id,
        thumbnailUrl: data.video_details.thumbnail_url,
        title: data.video_details.title,
        videoUrl: data.video_details.video_url,
        viewCount: data.video_details.view_count,
      }
      this.setState({
        videoItemDetails: updatedVideoItemDetails,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderLoadingView = () => (
    <SavedVideoContext.Consumer>
      {value => {
        const {lightTheme} = value

        const loader = lightTheme ? 'blue' : 'red'
        return (
          <div className="home-videos-container load-2" data-testid="loader">
            <div className="loader-container">
              <Loader type="ThreeDots" color={loader} height="50" width="50" />
            </div>
          </div>
        )
      }}
    </SavedVideoContext.Consumer>
  )

  renderFailureView = () => (
    <div className="no-res-bg-container fail">
      <div className="no-results-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-dark-theme-img.png"
          alt="failure view"
          className="no-results-found-img fail-img-width"
        />
        <h2 className="oops">Oops! something went wrong</h2>
        <p className="oops">
          We are having some trouble to complete you request
        </p>
        <p className="oops">Please try again</p>
        <button type="button" className="retry-btn">
          Retry
        </button>
      </div>
    </div>
  )

  renderVideoItemDetailsView = () => (
    <SavedVideoContext.Consumer>
      {value => {
        const {addToSavedVideos, savedVideosList, lightTheme} = value
        const {videoItemDetails} = this.state
        const {
          channel,
          description,
          publishedAt,
          title,
          videoUrl,
          viewCount,
        } = videoItemDetails
        const {name, subscriberCount, profileImageUrl} = channel
        const {isLiked, isDisLiked} = this.state
        console.log(isLiked)

        const likeBtn = isLiked ? 'liked' : null
        const dislikeBtn = isDisLiked ? 'disliked' : null

        const savedVideo = () => {
          addToSavedVideos(videoItemDetails)
        }

        const saveVideo = savedVideosList.find(
          each => each.id === videoItemDetails.id,
        )
        if (saveVideo !== undefined) {
          this.isSaved = true
        } else {
          this.isSaved = false
        }

        const saveText = this.isSaved ? 'Saved' : 'Save'
        const saveTextColor = this.isSaved ? 'save-btn' : null

        const videoOptions = lightTheme ? null : 'veer'

        const formatDate = formatDistance(new Date(publishedAt), new Date(), {
          addSuffix: true,
        })
        const date = formatDate
          .replace('about', '')
          .replace('over', '')
          .replace('almost', '')

        return (
          <div className="video-item-2">
            <div className="react-video">
              <ReactPlayer
                url={videoUrl}
                width="100%"
                height="100%"
                playing
                controls
              />
            </div>
            <div className="video-item-text-1">
              <p className="title">{title}</p>
              <div className="views-like-container ">
                <div className="views-container">
                  <p className="views-count">{viewCount} views</p>
                  <p className="published-at">{date}</p>
                </div>
                <div className="like-dislike-container ">
                  <div className={`like-container ${videoOptions}`}>
                    <AiOutlineLike className={`like-button ${likeBtn}`} />
                    <button
                      className={`like-btn ${likeBtn}`}
                      type="button"
                      onClick={this.likeVideo}
                    >
                      Like
                    </button>
                  </div>
                  <div className={`like-container ${videoOptions}`}>
                    <BiDislike className={`like-button ${dislikeBtn}`} />
                    <button
                      className={`like-btn ${dislikeBtn}`}
                      type="button"
                      onClick={this.dislikeVideo}
                    >
                      Dislike
                    </button>
                  </div>
                  <div className={`like-container ${saveTextColor}`}>
                    <MdPlaylistAdd className="like-button" />
                    <button
                      type="button"
                      className={`like-btn ${saveTextColor}`}
                      onClick={savedVideo}
                    >
                      {saveText}
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <hr className="hr-line" />
            <div className="profile-subscribe-container title">
              <img
                src={profileImageUrl}
                alt="profile"
                className="channel-profile-2"
              />
              <div className="subscribe-cont">
                <p className="chnl-name">{name}</p>
                <p className="subsribers">{subscriberCount} subscribers</p>
              </div>
            </div>
            <p className="description">{description}</p>
          </div>
        )
      }}
    </SavedVideoContext.Consumer>
  )

  renderApiStateDetails = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderVideoItemDetailsView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    // const {videoItemDetails} = this.state
    // console.log(videoItemDetails)

    return (
      <SavedVideoContext.Consumer>
        {value => {
          const {lightTheme} = value
          const background1 = lightTheme ? null : 'bg-2'
          const vediosBackground1 = lightTheme ? null : 'bg-4'

          return (
            <div className={`bg-container ht ${background1}`}>
              <Header />
              <div className="home-container">
                <Menu />
                <div
                  className={`video-item-main-container ${vediosBackground1}`}
                >
                  {this.renderApiStateDetails()}
                </div>
              </div>
            </div>
          )
        }}
      </SavedVideoContext.Consumer>
    )
  }
}

export default VideoItemDetails
