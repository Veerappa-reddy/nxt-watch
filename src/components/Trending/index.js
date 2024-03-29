import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {BsFire} from 'react-icons/bs'
import Menu from '../Menu'
import Header from '../Header'
import MobileMenus from '../MobileMenus'
import TrendingVideoItem from '../TrendingVideoItem'
import SavedVideoContext from '../../context/SavedVideoContext'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Trending extends Component {
  state = {
    videosList: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getTrendingVedios()
  }

  getTrendingVedios = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/videos/trending`
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
        channel: each.channel,
        id: each.id,
        publishedAt: each.published_at,
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

  renderVideosList = () => {
    const {videosList} = this.state
    return videosList.map(each => (
      <TrendingVideoItem videoItemDetails={each} each={each.id} />
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
        <button type="button" className="retry-btn">
          Retry
        </button>
      </div>
    </div>
  )

  renderTrendingVideos = () => {
    const {videosList} = this.state
    // console.log(videosList)

    return (
      <ul className="trending-videos-container">
        {videosList.length > 0
          ? this.renderVideosList()
          : this.renderNoResultsFound()}
      </ul>
    )
  }

  //   renderTrendingVideos = () => (

  //   )

  renderLoadingView = () => (
    <SavedVideoContext.Consumer>
      {value => {
        const {lightTheme} = value

        const loader = lightTheme ? 'blue' : 'red'
        return (
          <div className="home-videos-container load" data-testid="loader">
            <div className="loader-container">
              <Loader type="ThreeDots" color={loader} height="50" width="50" />
            </div>
          </div>
        )
      }}
    </SavedVideoContext.Consumer>
  )

  renderApiStateDetails = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderTrendingVideos()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  retryBtn = () => {
    this.getTrendingVedios()
  }

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
        <button type="button" className="retry-btn" onClick={this.retryBtn}>
          Retry
        </button>
      </div>
    </div>
  )

  renderLightTrending = () => (
    <div className="bg-container">
      <Header />
      <div className="home-container">
        <Menu id={2} />
        <div className="videos-main-container">
          <div className="trending-container">
            <BsFire className="menu-option-icon" size={35} color="red" />
            <h1 className="trending-heading">Trending</h1>
          </div>
          <div className="videos-container">{this.renderApiStateDetails()}</div>
        </div>
      </div>
      <div className="mobile-options-container">
        <MobileMenus id={2} />
      </div>
    </div>
  )

  renderDarkTrending = () => (
    <div className="trending-bg-container trend-bg-2">
      <Header />
      <div className="trend-container">
        <Menu id={2} />
        <div className="trend-videos-main-container">
          <div className="trending-container">
            <BsFire size={35} color="red" />
            <h1 className="trending-heading">Trending</h1>
          </div>
          <div className="trend-videos-container">
            {this.renderApiStateDetails()}
          </div>
        </div>
        {/* <div className="mobile-trend-vedios-container">
                {this.renderApiStateDetails()}
              </div> */}
      </div>
      <div className="mobile-options-container">
        <MobileMenus id={2} />
      </div>
    </div>
  )

  /* <div className="bg-container bg-2">
      <Header />
      <div className="home-container">
        <Menu id={2} />
        <div className="videos-main-container bg-3">
          <div className="trending-container">
            <BsFire size={35} color="red" />
            <h1 className="trending-heading">Trending</h1>
          </div>
          <div className="videos-container">{this.renderApiStateDetails()}</div>
        </div>
      </div>
      <div className="mobile-options-container">
        <MobileMenus id={2} />
      </div>
    </div> */

  render() {
    // const {videosList} = this.state

    // console.log(videosList)
    return (
      <SavedVideoContext.Consumer>
        {value => {
          const {lightTheme} = value

          return lightTheme
            ? this.renderLightTrending()
            : this.renderDarkTrending()
        }}
      </SavedVideoContext.Consumer>
    )
  }
}

export default Trending
