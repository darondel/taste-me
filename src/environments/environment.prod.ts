export const environment = {
  authUrl: 'INSERT_AUTH_API',
  lastFmApi: {
    url: 'http://ws.audioscrobbler.com/2.0/',
    key: 'INSERT_LAST_FM_API_KEY',
    methods: {
      chart: {
        topTracks: 'chart.gettoptracks'
      },
      track: {
        getInfo: 'track.getinfo'
      }
    },
    formats: {
      json: 'json'
    }
  },
  production: true
};
