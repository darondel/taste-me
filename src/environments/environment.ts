export const environment = {
  authUrl: 'INSERT_AUTH_API',
  lastFmApi: {
    apiKey: 'INSERT_LAST_FM_API_KEY',
    urls: {
      topTracks: 'http://ws.audioscrobbler.com/2.0/?method=chart.gettoptracks&format=json&api_key='
    }
  },
  production: false
};
