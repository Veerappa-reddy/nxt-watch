import {Component} from 'react'
import {Switch, Route, Redirect, withRouter} from 'react-router-dom'
import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Trending from './components/Trending'
import Gaming from './components/Gaming'
import SavedVideos from './components/SavedVideos'
import VideoItemDetails from './components/VideoItemDetails'
import NotFound from './components/NotFound'
import SavedVideoContext from './context/SavedVideoContext'
import ProtectedRoute from './components/ProtectedRoute'
import './App.css'

class App extends Component {
  state = {
    savedVideosList: [],
    lightTheme: true,
    menuId: 1,
    menuOptionLink: '/',
  }

  componentDidMount() {
    const {history} = this.props
    history.replace('/')
  }

  clickTheme = value => {
    this.setState({lightTheme: value})
  }

  removeVideo = item => {
    const {savedVideosList} = this.state
    const updatedList = savedVideosList.filter(each => each.id !== item.id)
    this.setState({savedVideosList: updatedList})
  }

  addToSavedVideos = item => {
    const {savedVideosList} = this.state
    const updatedList = savedVideosList.find(each => each.id === item.id)
    console.log(updatedList)

    if (savedVideosList.length === 0) {
      this.setState(prevState => ({
        savedVideosList: [...prevState.savedVideosList, item],
      }))
    } else if (updatedList === undefined) {
      this.setState(prevState => ({
        savedVideosList: [...prevState.savedVideosList, item],
      }))
    } else {
      this.removeVideo(item)
    }
  }

  clickedMenuOption = (id, link) => {
    this.setState({menuId: id, menuOptionLink: link})
  }

  render() {
    const {savedVideosList, lightTheme, menuId, menuOptionLink} = this.state
    // console.log(lightTheme)

    return (
      <SavedVideoContext.Provider
        value={{
          savedVideosList,
          addToSavedVideos: this.addToSavedVideos,
          lightTheme,
          clickTheme: this.clickTheme,
          menuId,
          clickedMenuOption: this.clickedMenuOption,
          menuOptionLink,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/trending" component={Trending} />
          <ProtectedRoute exact path="/gaming" component={Gaming} />
          <ProtectedRoute
            exact
            path="/videos/:id"
            component={VideoItemDetails}
          />
          <ProtectedRoute exact path="/saved-videos" component={SavedVideos} />
          <Route exact path="/not-found" component={NotFound} />
          <Redirect to="not-found" />
        </Switch>
      </SavedVideoContext.Provider>
    )
  }
}
export default withRouter(App)
