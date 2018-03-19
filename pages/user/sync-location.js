import { Component } from 'react'
import { Client, Provider, Connect, query } from 'urql'

// Utilities
import config from '../../utils/config'

console.log(process.env.NODE_ENV)

export default class SyncLocation extends Component {
  urqlClient = null
  retriedLocation = false

  state = {
    latitude: null,
    longitude: null,
  }

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
    const { latitude, longitude } = this.props
    return (
      <Provider client={this.urqlClient}>
        <Connect query={query(`query { title }`)}>
          {({ loaded, data }) => loaded && data.title} || {latitude}
          {longitude}
        </Connect>
      </Provider>
    )
  }

  componentDidMount() {
    this.getLocation()
  }

  getLocation = async () => {
    console.log('trying..')
    try {
      const position = await getCurrentPosition()
      console.log(position)
      this.setState({ latitude, longitude })
    } catch (err) {
      console.log(err)
      if (!this.retriedLocation) {
        this.retriedLocation = true
        this.getLocation()
      }
    }
  }
}

const getCurrentPosition = () =>
  new Promise((resolve, reject) => {
    if (typeof window === 'undefined' || !('geolocation' in navigator)) {
      reject('Not available')
    }
    navigator.geolocation.getCurrentPosition(resolve, reject, {
      enableHighAccuracy: true,
      maximumAge: 30000,
      timeout: 27000,
    })
  })
