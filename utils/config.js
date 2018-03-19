const isDev = process.env.NODE_ENV === 'development'
const apiUrl = isDev ? `http://localhost:9900` : `https://api.there.pm`

export default {
  apiUrl,
  graphqlEndpoint: `${apiUrl}/graphql`,
}
