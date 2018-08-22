import React, { Component } from 'react'
import PropTypes from 'prop-types'
// import Raven from 'raven-js'
import './ErrorHandler.scss'

class ErrorHandler extends Component {
  static propTypes = {
    children: PropTypes.object.isRequired
  }

  state = {
    error: null
  }

  componentDidCatch = (error, errorInfo) => {
    this.setState({error})
    // Raven.captureException(error, {extra: errorInfo})
  }

  render = () => {
    const { children } = this.props
    const { error } = this.state

    if(error) return (
      <div styleName="error-handler" onClick={() => null/*Raven.lastEventId()*/}>
        <div styleName="oops">
          <i className="fa fa-wrench"></i>
          <div>
            <h1>Ooops.</h1>
            <h2>Something went wrong.</h2>
          </div>
        </div>

        <div styleName="cta">
          <p>Please help us filling the bug report.</p>
          <button styleName="btn" onClick={() => null/*Raven.showReportDialog()*/}>Bug report</button>
        </div>
      </div>
    ) 

    return children
  }
}

export default ErrorHandler
