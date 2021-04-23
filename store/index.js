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
  profileImageUri: (state) => { return JSON.parse(state.auth.user.picture).data.url }
}

export const mutations = {
  updateProfileName (state, name) {
    state.profile.name = name
  },
  updateProfileGender (state, gender) {
    state.profile.gender = gender
  }
}
