import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {AiFillFire} from 'react-icons/ai'
import Menu from '../Menu'
import Header from '../Header'
import GamingVideoItem from '../GamingVideoItem'
import SavedVideoContext from '../../context/SavedVideoContext'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Gaming extends Component {
  state = {
    videosList: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getGamingVedios()
  }

  getGamingVedios = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/videos/gaming`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)

    if (response.ok === true) {
      const data = await response.json()
      const updatedData = data.videos.map(each => ({
        channel: each.channel === undefined ? '' : each.channel,
        id: each.id,
        publishedAt: each.published_at === undefined ? '' : each.publishedAt,
        thumbnailUrl: each.thumbnail_url,
        title: each.title,
        viewCount: each.view_count,
      }))
      this.setState({
        videosList: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderLoadingView = () => (
    <div className="home-videos-container load" data-testid="loader">
      <div className="loader-container">
        <Loader type="ThreeDots" color="#000" height="50" width="50" />
      </div>
    </div>
  )

  renderFailureView = () => (
    <div className="no-res-bg-container fail">
      <div className="no-results-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-dark-theme-img.png"
          alt="no videos"
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

  retryBtn = () => {
    this.getGamingVedios()
  }

  renderVideosList = () => {
    const {videosList} = this.state
    return videosList.map(each => (
      <GamingVideoItem videoItemDetails={each} each={each.id} />
    ))
  }

  renderNoResultsFound = () => (
    <div className="no-res-bg-container">
      <div className="no-results-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-search-results-img.png"
          alt="no videos"
          className="no-results-found-img"
        />
        <h2>No Search results found</h2>
        <p>Try different key words or remove search filter</p>
        <button type="button" className="retry-btn" onClick={this.retryBtn}>
          Retry
        </button>
      </div>
    </div>
  )

  renderGamingVideos = () => {
    const {videosList} = this.state
    // console.log(videosList)

    return (
      <ul className="home-videos-container">
        {videosList.length > 0
          ? this.renderVideosList()
          : this.renderNoResultsFound()}
      </ul>
    )
  }

  renderApiStateDetails = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderGamingVideos()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  renderLightGaming = () => (
    <div className="bg-container">
      <Header />
      <div className="home-container">
        <Menu selectVideoType={this.videoType} />
        <div className="videos-main-container">
          <div className="trending-container">
            <AiFillFire className="search-icon" size={35} color="red" />
            <h1 className="trending-heading">Gaming</h1>
          </div>
          <div className="videos-container">{this.renderApiStateDetails()}</div>
        </div>
      </div>
    </div>
  )

  renderDarkGaming = () => (
    <div className="bg-container bg-2">
      <Header />
      <div className="home-container">
        <Menu selectVideoType={this.videoType} />
        <div className="videos-main-container bg-3">
          <div className="trending-container">
            <AiFillFire className="search-icon" size={35} color="red" />
            <h1 className="trending-heading">Gaming</h1>
          </div>
          <div className="videos-container">{this.renderApiStateDetails()}</div>
        </div>
      </div>
    </div>
  )

  render() {
    const {videosList} = this.state

    console.log(videosList)
    return (
      <SavedVideoContext.Consumer>
        {value => {
          const {lightTheme} = value

          return lightTheme ? this.renderLightGaming() : this.renderDarkGaming()
        }}
      </SavedVideoContext.Consumer>
    )
  }
}

export default Gaming
