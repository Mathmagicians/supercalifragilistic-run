import { mapActions } from 'vuex'

export const state = () => ({
  authenticated:
      {
        is: false,
        code: '',
        id: ''
      },
  profile: {
    name: '',
    mail: '',
    gender: '',
    profilePicture: '',
    stars: [],
    badges: [],
    runs: [],
    runningAppAuthentication: {
      strava: {
        id: '',
        token: ''
      }
    },
    challenges: [],
    events: []
  }
})

export const getters = {
  // basic profile
  profileImageUri: (state) => { return (state.auth.loggedIn) && (state.auth.user) ? JSON.parse(state.auth.user.picture).data.url : null },
  profileName: (state) => { return (state.auth.loggedIn) && (state.auth.user) ? state.auth.user.given_name : null },
  isBasicProfileReady: (state) => { return false },
  // strava integration
  canUseStrava: (state, getters) => { return getters.hasRequestedScopes && getters.hasStravaAuthorizationCode && getters.hasStravaRefreshToken && getters.hasValidStravaAccessToken },
  hasStravaAuthorizationCode: (state) => { return !!state.profile.runningAppAuthentication.strava.authorizationCode },
  hasRequestedScopes: (state) => { return state.profile.runningAppAuthentication.strava.scopes && state.profile.runningAppAuthentication.strava.scopes === 'read,activity:read_all' },
  hasStravaRefreshToken: (state) => { return !!state.profile.runningAppAuthentication.strava.token.refresh_token },
  hasValidStravaAccessToken: (state) => { return !!state.profile.runningAppAuthentication.strava.token.access_token }
  // challenge

}

export const mutations = {
  updateProfileName (state, name) {
    state.profile.name = name
  },
  updateProfileGender (state, gender) {
    state.profile.gender = gender
  },
  setStravaAuthorization (state, { authorizationCode, scopes }) {
    state.profile.runningAppAuthentication.strava.authorizationCode = authorizationCode
    state.profile.runningAppAuthentication.strava.scopes = scopes
    const time = new Date()
    state.profile.runningAppAuthentication.strava.authorization_time = time.toDateString() + ' ' + time.toLocaleTimeString()
  },
  setStravaToken (state, token) {
    state.profile.runningAppAuthentication.strava.token = token
    state.profile.runningAppAuthentication.strava.id = token.athlete.id
  },
  updateAthleteActivities (state, activities) {
    // fixme: we are receiving an array of runs - here we are overwriting pre-existing data instead of splicing
    state.profile.runs = [...state.profile.runs, ...activities]
  }
}

export const actions = {

  async acquireStravaToken ({ commit, state, getters }) {
    if (!getters.hasStravaRefreshToken) {
      const token = await this.$axios({
        method: 'post',
        url: this.$config.strava_token_url,
        baseURL: this.$config.strava_base_url,
        data: {
          client_id: this.$config.strava_client_id,
          client_secret: this.$config.strava_client_secret,
          code: state.profile.runningAppAuthentication.strava.authorizationCode,
          grant_type: 'authorization_code'
        }
      })
      //  const token await $http.$post('https://www.strava.com/oauth/token')
      commit('setStravaToken', token.data)
    } else { console.info('[acquireStravaToken] Dont need to acquire anything, token is ', state.profile.runningAppAuthentication.strava.token) }
  },
  async fetchAthleteActivity ({ state, getters }) {
    // todo - hardwired from client to strava - refactor this once backend is up and running
    if (getters.canUseStrava) {
      // 01.04.2021 - fixme use challenge start date
      const epoch = 1617228000
      const activities = await this.$axios({
        method: 'get',
        baseURL: this.$config.strava_base_url,
        url: `/athlete/activities?after=${epoch}`,
        headers: {
          Authorization: `Bearer ${state.profile.runningAppAuthentication.strava.token.access_token}`,
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': true
        }
      })
      state.commit('updateAthleteActivities', activities.data)
    } else {
      console.info('[fetchAthleteActivity] Dont have strava authorization in place')
    }
  }

}
