export const state = () => ({
  authenticated:
      {
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

export const mutations = {
  updateProfileName (state, name) {
    state.profile.name = name
  },
  updateProfileGender (state, gender) {
    state.profile.gender = gender
  }
}
