const isDev = process.env.NODE_ENV === 'development'
const apiUrl = isDev ? `http://localhost:9900` : `https://api.there.pm`

export default {
  apiUrl,
  graphqlEndpoint: `${apiUrl}/graphql`,
  whatsNewPageUrl: `https://www.notion.so/there/What-s-New-503917feb74540f596faef3e4e6ec40e`,
}
