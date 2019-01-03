const isProd = process.env.NODE_ENV === 'production'
module.exports = {
  assetPrefix: isProd? `https://there.netlify.com` : ``,
  exportPathMap: function() {
    return {
      '/': { page: '/' },
      '/terms': { page: '/terms' },
      '/privacy': { page: '/privacy' },
    }
  },
}
