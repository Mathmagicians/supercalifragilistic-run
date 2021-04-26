export default {
  // Target: https://go.nuxtjs.dev/config-target
  ssr: false,
  target: 'static',

  router: {
    base: '/supercalifragilistic-run/',
    middleware: ['auth']
  },

  publicRuntimeConfig: {
    axios: {
      baseUrl: process.env.rest_api_stage
    },
    git_commit: process.env.git_commit,
    app_auth_callback_url_root: process.env.app_auth_callback_url_root + '/supercalifragilistic-run',
    strava_authorize_url: `https://www.strava.com/oauth/authorize?client_id=${process.env.strava_client_id}&redirect_uri=${process.env.app_auth_callback_url_root}/supercalifragilistic-run/strava_landing&response_type=code&approval_prompt=force&scope=activity:read_all`,
    strava_base_url: 'https://www.strava.com',
    strava_api_root: 'https://www.strava.com/api/v3',
    strava_token_url: '/oauth/token',
    strava_client_id: process.env.strava_client_id,
    strava_client_secret: process.env.strava_client_secret
  },

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'supercalifragilistic-run',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [{
      rel: 'icon',
      type: 'image/svg+xml',
      href: `data:image/svg+xml,
                <svg
                  viewBox="0 0 100 100"
                  xmlns="http://www.w3.org/2000/svg">
                  <circle fill="whitesmoke" cx="50" cy="50" r="55"/> 
                  <text y="0.9em" font-size="90">🦩</text>
              </svg>`
    }]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
    '@nuxtjs/svg'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/auth-next',
    '@nuxtjs/pwa',
    // https://go.nuxtjs.dev/content
    '@nuxt/content',
    'nuxt-leaflet',
    'nuxt-user-agent'
  ],
  axios: {

  },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'en'
    }
  },

  // Content module configuration: https://go.nuxtjs.dev/config-content
  content: {},

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},

  tailwindcss: {
    jit: true
  },

  auth: {
    strategies: {
      awsCognito: {
        scheme: 'oauth2',
        endpoints: {
          authorization: process.env.user_pool_domain + '/login',
          token: process.env.user_pool_domain + '/oauth2/token',
          userInfo: process.env.user_pool_domain + '/oauth2/userInfo',
          logout: process.env.user_pool_domain + '/logout'
        },
        token: {
          property: 'access_token',
          type: 'Bearer',
          maxAge: 3600
        },
        refreshToken: {
          property: 'refresh_token',
          maxAge: 3600 * 24 * 30
        },
        responseType: 'token',
        // grantType: 'authorization_code',
        redirectUri: process.env.app_auth_callback_url_root + '/supercalifragilistic-run/login',
        logoutRedirectUri: process.env.app_auth_callback_url_root + '/supercalifragilistic-run/login',
        clientId: process.env.user_pool_client_id,
        clientSecret: process.env.user_pool_client_secret,
        scope: ['email', 'openid', 'profile'],
        codeChallengeMethod: 'S256'
      }
    }
  }
}
