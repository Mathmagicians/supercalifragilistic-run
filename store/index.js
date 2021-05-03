/* eslint-disable camelcase */
/* eslint-disable no-console */

export const state = () => ({
  // stravaLoadStatus: 0 - no change, 1 submitted authorization request to /auth endpoint,  2 received authorization key,
  // 3 submitted token request to /token endpoint, 4 received acces_token and refresh_token and submitted data to backend, 5 reloaded data from backend,  10 error state

  stravaDataAccessAuthLoadStatus: -1,

  // profileLoadStatus: 0 - user logged in, 1 submitted profile fetch request to endpoint, 2 received profile data, 3 basic profile fetched,
  // 5 post sent
  // 8 user logged out, 9 flush state for user, 10 error state,
  // 11 new user, put, 12 new user posted default fill
  // -1 user not logged in
  profileLoadStatus: -1,
  strava_token: null,

  profile: {
    id: null,
    basic: {
      name: null,
      mail: null,
      gender: null,
      fav: null
    },
    stars: null,
    badges: null,
    runs: null,
    runningAppAuthentication: {
      strava: null
    },
    // fixme - move out to config file

    challenges: [{ id: 'ch1' }, { id: 'ch-2' }],
    events: null
  },

  challenges: [
    {
      id: 'ch-1',
      name: 'TestTest',
      fromEpoch: 1615000000,
      toEpoch: 1623621599
    },
    {
      id: 'ch-2',
      name: 'Løbeudfordringen 2021',
      fromEpoch: 1619992800,
      toEpoch: 1623621599
    }
  ]

})

export const getters = {
  // basic profile
  profileImageUri: (state) => {
    return (state.auth.loggedIn) && (state.auth.user) ? JSON.parse(state.auth.user.picture).data.url : null
  },
  profileName: (state) => {
    return (state.auth.loggedIn) && (state.auth.user) ? state.auth.user.given_name : null
  },
  isBasicProfileReady: (state) => {
    return false
  },
  // strava integration
  canUseStrava: (state, getters) => {
    return getters.hasRequestedScopes && getters.hasStravaAuthorizationCode && getters.hasStravaRefreshToken && getters.hasValidStravaAccessToken
  },
  hasStravaAuthorizationCode: (state) => {
    return !!state.profile.runningAppAuthentication.strava && !!state.profile.runningAppAuthentication.strava.authorization_code
  },
  hasRequestedScopes: (state) => {
    return !!state.profile.runningAppAuthentication.strava && !!state.profile.runningAppAuthentication.strava.scopes && state.profile.runningAppAuthentication.strava.scopes === 'read,activity:read_all'
  },
  hasStravaRefreshToken: (state) => {
    return !!state.profile.runningAppAuthentication.strava && !!state.profile.runningAppAuthentication.strava.refresh_token
  },
  hasValidStravaAccessToken: (state) => {
    return !!state.profile.runningAppAuthentication.strava && !!state.profile.runningAppAuthentication.strava.access_token
  }
  // challenge

}

export const mutations = {
  setProfileLoadStatus (state, statusCode) {
    state.profileLoadStatus = statusCode
  },
  setProfileId (state, id) {
    this.state.profile.id = id
  },
  setProfile (state, profile) {
    this.state.profile = { ...profile }
  },
  updateProfileName (state, name) {
    state.profile.basic.name = name
  },
  setProfileGender (state, gender) {
    if (gender === 'M' || gender === 'F') {
      state.profile.basic.gender = gender
    } else {
      console.warn(`[setProfileGender] gender needs to be M or F, not ${gender}`)
    }
  },
  setStravaDataAccessAuthLoadStatus (state, statusCode) {
    state.stravaDataAccessAuthLoadStatus = statusCode
  },
  setStravaAuthorization (state, { authorization_code, scopes }) {
    console.log(`[setStravaAuthorization] received code ${authorization_code}, \t scopes ${scopes}, strava is \t`, state.profile.runningAppAuthentication.strava)
    state.profile.runningAppAuthentication.strava.authorization_time = new Date().toDateString()
    state.profile.runningAppAuthentication.strava.authorization_code = authorization_code
    state.profile.runningAppAuthentication.strava.scopes = scopes
    console.log('[setStravaAuthorization] update done, strava is \t', JSON.stringify(state.profile.runningAppAuthentication.strava))
  },
  setStravaToken (state, token) {
    state.strava_token = token
    state.profile.runningAppAuthentication.strava.id = String(token.athlete.id)
    state.profile.runningAppAuthentication.strava.access_token = token.access_token
    state.profile.runningAppAuthentication.strava.refresh_token = token.refresh_token
  },
  updateAthleteActivities (state, activities) {
    // fixme: we are receiving an array of runs - here we are overwriting pre-existing data instead of splicing
    state.profile.runs = [...activities]
  }
}

export const actions = {

  async acquireStravaRefreshToken ({ commit, state, getters, dispatch }) {
    if (!getters.hasStravaRefreshToken) {
      commit('setStravaDataAccessAuthLoadStatus', 3)
      const token = await dispatch('getStravaToken')
      commit('setStravaDataAccessAuthLoadStatus', 4)
      // grab gender info from strava token
      if (!state.profile.basic.gender && token.athlete.sex) {
        commit('setProfileGender', token.athlete.sex)
      }
      await dispatch('postProfile')
      //  commit('setStravaDataAccessAuthLoadStatus', 5)
      //  await dispatch('fetchProfile')
      commit('setStravaDataAccessAuthLoadStatus', 0)
    } else {
      console.info('[acquireStravaRefreshToken] Dont need to acquire anything, token is ', state.profile.runningAppAuthentication.strava.token)
    }
  },

  async getStravaToken ({ commit, state, getters }) {
    const token = await this.$axios({
      method: 'post',
      url: this.$config.strava_token_url,
      baseURL: this.$config.strava_base_url,
      data: {
        client_id: this.$config.strava_client_id,
        client_secret: this.$config.strava_client_secret,
        code: state.profile.runningAppAuthentication.strava.authorization_code,
        grant_type: 'authorization_code'
      }
    })
    commit('setStravaToken', token.data)
    return token.data
  },
  async postProfile ({ state }) {
    const post = await this.$axios({
      method: 'post',
      url: `/profile/${state.profile.id}`,
      data: state.profile
    })
  },

  async fetchProfile ({ state, commit }) {
    // load profile GET /user/{id}
    console.info(`[fetchProfile] fetching profile for user ${state.profile.id}`)
    try {
      const get = await this.$axios({
        method: 'get',
        url: `/profile/${state.profile.id}`
      })
      commit('setProfile', get.data)
      console.info(`[fetchProfile] fetched profile for user ${state.profile.id}`, get.data, state.profile)
      return get.status
    } catch (error) {
      // if status code is 404 return as value
      if (error.response && error.response.status === 404) {
        console.info(`[fetchProfile] ${state.profile.id}: does not exist in db`)
        return error.response.status
      } else if (error.response) {
        console.error(`[fetchProfile] ${state.profile.id}: Uh, oh, somethings wrong with the response`)
        throw (error)
      } else {
        console.error(`[fetchProfile] ${state.profile.id}: Cant communicate with backend`)
        throw (error)
      }
    }
  },

  async putNewProfile ({ state, commit }) {
    try {
      const get = await this.$axios({
        method: 'put',
        url: `/profile/${state.profile.id}`
      })
      commit('setProfile', get.data)
    } catch (error) {
      console.error(`[putNewProfile] ${state.profile.id}`)
      throw (error)
    }
  },

  async fetchAthleteActivity ({ commit, state, getters }) {
    // todo - hardwired from client to strava - refactor this once backend is up and running
    if (getters.canUseStrava) {
      // 01.04.2021 - fixme use challenge start date
      const epoch = 1615000000
      const newAxios = this.$axios.create()
      const activities = await newAxios({
        method: 'get',
        baseURL: this.$config.strava_api_root,
        url: '/athlete/activities',
        params: {
          after: epoch
        },
        headers: {
          Authorization: 'Bearer ' + state.profile.runningAppAuthentication.strava.access_token
        }
      })
      console.info('[fetchAthleteActivity] recieved response', activities.data)
      commit('updateAthleteActivities', activities.data)
    } else {
      console.error('[fetchAthleteActivity] Can not use Strava, so cant fetch activities.')
    }
  },

  async loadProfile ({ commit, dispatch, state }) {
    commit('setProfileLoadStatus', 1)
    await dispatch('fetchProfile')
    commit('setProfileLoadStatus', 0)
    console.info(`[loadProfile] Loading profile for user ${state.profile.id}`)
  },

  async handleUserLogin ({ commit, state, dispatch }) {
    // check if user is already logged in, if so, we can safely exit
    if (!state.auth.loggedIn) {
      throw new Error('[handleUserLogin] User not authenticated, cant log in.')
    }
    if (state.profileLoadStatus === 0) {
      console.info('[handleUserLogin] User already logged in, cant do it twice 😉. Will just fetch data instead.')
      dispatch('loadProfile')
    }

    // set user id in store and fetch profile data from backend
    commit('setProfileLoadStatus', 1)
    commit('setProfileId', `U-${state.auth.user.sub}`)

    // fetch profile from backend
    const status = await dispatch('fetchProfile')
    // users data fetched, we are good to go
    if (status === 200) {
      commit('setProfileLoadStatus', 0)
      //  handle 404 error! - if object does not exist, create at server with PUT /user/{id}
      // check if it is a new user?
    } else if (status === 404) {
      commit('setProfileLoadStatus', 12)
      dispatch('putNewProfile')
      commit('setProfileLoadStatus', 13)
      dispatch('fillDefaultValuesForProfile')
      commit('setProfileLoadStatus', 14)
      dispatch('postProfile')
      commit('setProfileLoadStatus', 15)
      dispatch('loadProfile')
    } else {
      commit('setProfileLoadStatus', 10)
      throw (new Error('[handleUserLogin] Received stats code ' + status))
    }
  },

  fillDefaultValuesForProfile ({ commit, state, getters }) {
    const defaultValues = { ...state.profile }
    defaultValues.basic.name = getters('getProfileName')
    defaultValues.basic.mail = state.auth.user.email
    defaultValues.basic.gender = state.auth.user.gender

    // todo fill them out
    commit('setProfile', defaultValues)
  },

  handleUserLogout ({ commit, state }) {
    // fixme flush state!
    throw new Error('not implemented')
  },

  updateGender ({ commit, dispatch }, g) {
    commit('setProfileGender', g)
    commit('setProfileLoadStatus', 5)
    dispatch('postProfile')
    dispatch('loadProfile')
  }

}
