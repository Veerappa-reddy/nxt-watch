import {Component} from 'react'
import Cookies from 'js-cookie'
// import {Redirect} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import {AiOutlineSearch, AiOutlineClose} from 'react-icons/ai'
import Menu from '../Menu'
import Header from '../Header'

import HomeVideoItem from '../HomeVideoItem'
import SavedVideoContext from '../../context/SavedVideoContext'
import './index.css'
import MobileMenus from '../MobileMenus'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Home extends Component {
  state = {
    videosList: [],
    apiStatus: apiStatusConstants.initial,
    searchInput: '',
    bannerOpen: true,
  }

  componentDidMount() {
    this.getHomeVedios()
  }

  getHomeVedios = async () => {
    const {searchInput} = this.state
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/videos/all?search=${searchInput}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    // console.log(response)

    if (response.ok === true) {
      const data = await response.json()
      const updatedData = data.videos.map(each => ({
        channel: each.channel === undefined ? '' : each.channel,
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
    }
    if (response.status === 401) {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderVideosList = () => {
    const {videosList} = this.state
    return videosList.map(each => (
      <HomeVideoItem videoItemDetails={each} key={each.id} />
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

  retryBtn = () => {
    this.getHomeVedios()
  }

  renderFailureView = () => (
    <SavedVideoContext.Consumer>
      {value => {
        const {lightTheme} = value
        const failueImage = lightTheme
          ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-dark-theme-img.png'
          : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png'

        return (
          <div className="no-res-bg-container fail">
            <div className="no-results-container">
              <img
                src={failueImage}
                alt="failure view"
                className="no-results-found-img fail-img-width"
              />
              <h2 className="oops">Oops! something went wrong</h2>
              <p className="oops">
                We are having some trouble to complete you request
              </p>
              <p className="oops">Please try again</p>
              <button
                type="button"
                className="retry-btn"
                onClick={this.retryBtn}
              >
                Retry
              </button>
            </div>
          </div>
        )
      }}
    </SavedVideoContext.Consumer>
  )

  //   renderHomeVideos = () => {
  //     const {videosList} = this.state
  //     // console.log(videosList)

  //     return (
  //       <ul className="home-videos-container">
  //         {videosList.length > 0
  //           ? this.renderVideosList()
  //           : this.renderNoResultsFound()}
  //       </ul>
  //     )
  //   }

  renderHomeVideos = () => (
    <SavedVideoContext.Consumer>
      {value => {
        const {lightTheme} = value
        const {videosList} = this.state

        const darkHomeVediosContainer = lightTheme
          ? null
          : 'dark-home-vedios-container'

        return (
          <ul className={`home-videos-container ${darkHomeVediosContainer}`}>
            {videosList.length > 0
              ? this.renderVideosList()
              : this.renderNoResultsFound()}
          </ul>
        )
      }}
    </SavedVideoContext.Consumer>
  )

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

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  renderApiStateDetails = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderHomeVideos()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  searchResults = () => {
    this.getHomeVedios()
  }

  renderLightHome = () => {
    const {bannerOpen} = this.state

    const closeBanner = () => {
      this.setState({bannerOpen: false})
    }

    return (
      <div className="bg-container">
        <Header />
        <div className="home-container">
          <Menu id={1} />
          <div className="videos-main-container">
            {bannerOpen && (
              <div className="home-banner" data-testid="banner">
                <div className="banner-text-container">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
                    alt="nxt watch logo"
                    className="banner-logo"
                  />
                  <p className="prepaid-text dark-text">
                    Buy Nxt Watch Premium prepaid plans with UPI
                  </p>
                  <button className="get-it-btn" type="button">
                    GET IT NOW
                  </button>
                </div>
                <button type="button" data-testid="close" className="close-btn">
                  <AiOutlineClose
                    color="#000"
                    size={20}
                    onClick={closeBanner}
                  />
                </button>
              </div>
            )}
            <div className="search-input-container">
              <input
                type="search"
                placeholder="Search"
                className="search-input"
                onChange={this.onChangeSearchInput}
              />
              <button
                type="button"
                data-testid="searchButton"
                onClick={this.searchResults}
              >
                <AiOutlineSearch className="search-icon light-search" />
              </button>
            </div>
            <div className="videos-container">
              {this.renderApiStateDetails()}
            </div>
          </div>
        </div>
        <div className="mobile-options-container">
          <MobileMenus id={1} />
        </div>
      </div>
    )
  }

  renderDarkHome = () => {
    const {bannerOpen} = this.state
    const closeBanner = () => {
      this.setState({bannerOpen: false})
    }

    return (
      <div className="bg-container bg-2">
        <Header />
        <div className="home-container">
          <Menu id={1} />
          <div className="videos-main-container bg-3">
            {bannerOpen && (
              <div className="home-banner" data-testid="banner">
                <div className="banner-text-container">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
                    alt="nxt watch logo"
                    className="banner-logo"
                  />
                  <p className="prepaid-text dark-text">
                    Buy Nxt Watch Premium prepaid plans with UPI
                  </p>
                  <button className="get-it-btn" type="button">
                    GET IT NOW
                  </button>
                </div>
                <button type="button" data-testid="close" className="close-btn">
                  <AiOutlineClose
                    color="#000"
                    size={20}
                    onClick={closeBanner}
                  />
                </button>
              </div>
            )}
            <div className="search-input-container dark-input">
              <input
                type="search"
                placeholder="Search"
                className="search-input"
                onChange={this.onChangeSearchInput}
              />
              <button
                type="button"
                data-testid="searchButton"
                onClick={this.searchResults}
                className="search-btn "
              >
                <AiOutlineSearch
                  //   className="search-icon dark-search-1"
                  size={20}
                />
              </button>
            </div>
            <div className="videos-container">
              {this.renderApiStateDetails()}
            </div>
          </div>
        </div>
        <div className="mobile-options-container">
          <MobileMenus id={1} />
        </div>
      </div>
    )
  }

  renderHome = () => (
    <SavedVideoContext.Consumer>
      {value => {
        const {lightTheme} = value

        return lightTheme ? this.renderLightHome() : this.renderDarkHome()
      }}
    </SavedVideoContext.Consumer>
  )

  render() {
    // const jwtToken = Cookies.get('jwt_token')

    // if (jwtToken === undefined) {
    //   return <Redirect to="/login" />
    // }

    return this.renderHome()
  }
}

export default Home
