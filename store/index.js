
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
  setStravaAuthorization (state, authorization) {
    state.profile.runningAppAuthentication.strava.authorization = authorization
  }

}

export const actions = {

  /* getStravaAuthorization ({ commit }) {
    axios({
      method: 'get',
      url: 'https://strava.com/oauth/authorize',
      headers: {
        client_id: process.env.strava_client_id,
        response_type: 'code',
        approval_prompt: 'force',
        scope: 'activity:read_all'
      }
    }).then((r) => { commit('setStravaAuthorization', r.data) })
  }

  */
}
