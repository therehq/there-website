import React, { Component } from 'react'
import Raven from 'raven-js'

class ErrorHandler extends Component {
  state = { error: null }

  componentDidMount() {
    Raven.config(
      'https://193e706dbb064492ae4a0b1316c83431@sentry.io/273900',
    ).install()
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ error })
    Raven.captureException(error, { extra: errorInfo })
  }

  render() {
    if (this.state.error) {
      // Render fallback UI
      return (
        <div
          style={{ padding: 30 }}
          onClick={() => Raven.lastEventId() && Raven.showReportDialog()}
        >
          <p>We're sorry — something's gone wrong.</p>
          <p>
            Our team has been notified, but you can chat with us using the chat
            box below.
          </p>
        </div>
      )
    } else {
      // When there's not an error, render the children untouched
      return this.props.children
    }
  }
}

export default ErrorHandler
