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
      strava: {}
    },
    challenges: [],
    events: []
  }
})

export const getters = {
  profileImageUri: (state) => { return (state.auth.loggedIn) && (state.auth.user) ? JSON.parse(state.auth.user.picture).data.url : null },
  profileName: (state) => { return (state.auth.loggedIn) && (state.auth.user) ? state.auth.user.given_name : null }
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
  }

}

export const actions = {

  async getStravaToken ({ commit, state }) {
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
  }

}
