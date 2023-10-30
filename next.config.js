const isProd = process.env.NODE_ENV === 'production'
module.exports = {
  assetPrefix: isProd? `https://there.pm` : ``,
  exportPathMap: function() {
    return {
      '/': { page: '/' },
      '/terms': { page: '/terms' },
      '/privacy': { page: '/privacy' },
    }
  },
}
