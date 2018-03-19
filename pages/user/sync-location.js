import { Component } from 'react'
import { Client, Provider, Connect, query } from 'urql'

// Utilities
import config from '../../utils/config'

console.log(process.env.NODE_ENV)

export default class SyncLocation extends Component {
  urqlClient = null

  static getInitialProps({ query: { token } }) {
    return { token }
  }

  componentWillMount() {
    this.urqlClient = new Client({
      url: config.graphqlEndpoint,
      fetchOptions: () => ({
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${this.props.token}`,
        },
      }),
    })
  }

  render() {
    return (
      <Provider client={this.urqlClient}>
        <Connect query={query(`query { title }`)}>
          {({ loaded, data }) => loaded && data.title}
        </Connect>
      </Provider>
    )
  }

  componentDidMount() {
    if (typeof navigator !== 'undefined' && 'geolocation' in navigator) {
      /* geolocation is available */
      console.log(
        navigator.geolocation.getCurrentPosition(
          res => {
            console.log(res)
          },
          err => {
            console.log(err)
          },
          {
            enableHighAccuracy: true,
          },
        ),
      )
    } else {
      /* geolocation IS NOT available */
    }
  }
}
