import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

import './index.css'

class LoginForm extends Component {
  state = {
    userNameInput: '',
    passwordInput: '',
    errorMsg: '',
    isGetError: false,
    showPassword: false,
  }

  showPassword = () => {
    this.setState(prevState => ({showPassword: !prevState.showPassword}))
  }

  successfulLogin = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {
      expires: 30,
    })
    history.replace('/')
  }

  failureLogin = errorMsg => {
    this.setState({isGetError: true, errorMsg})
  }

  onChangeUsername = event => {
    this.setState({userNameInput: event.target.value})
  }

  onChangePassword = event => {
    this.setState({passwordInput: event.target.value})
  }

  renderInputField = () => (
    <div className="username-container">
      <label htmlFor="username" className="username-label">
        USERNAME
      </label>
      <input
        type="text"
        id="username"
        onChange={this.onChangeUsername}
        className="username-input"
        placeholder="Username"
        //   value="userNameInput"
      />
    </div>
  )

  renderPasswordField = () => {
    const {showPassword} = this.state

    return (
      <div className="password-container">
        <label htmlFor="password" className="password-label">
          PASSWORD
        </label>
        <input
          type={showPassword ? 'text' : 'password'}
          id="password"
          onChange={this.onChangePassword}
          className="password-input"
          placeholder="Password"
          //   value="passwordInput"
        />
        <div className="show-password-container">
          <input type="checkbox" id="checkbox" onChange={this.showPassword} />
          <label htmlFor="checkbox" className="show-password">
            Show Password
          </label>
        </div>
      </div>
    )
  }

  onSubmitForm = async event => {
    event.preventDefault()
    const {userNameInput, passwordInput} = this.state
    const userDetails = {username: userNameInput, password: passwordInput}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()

    if (response.ok === true) {
      this.successfulLogin(data.jwt_token)
    } else {
      this.failureLogin(data.error_msg)
    }
  }

  render() {
    const {isGetError, errorMsg, showPassword} = this.state
    const jwtToken = Cookies.get('jwt_token')

    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="login-page-container">
        <form className="login-container" onSubmit={this.onSubmitForm}>
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
            alt="website logo"
            className="watch-logo-img"
          />
          {this.renderInputField()}
          {this.renderPasswordField()}
          <button type="submit" className="login-btn">
            Login
          </button>
          {isGetError && <p className="error-msg">*{errorMsg}</p>}
        </form>
      </div>
    )
  }
}

export default LoginForm
