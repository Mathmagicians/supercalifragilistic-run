/* eslint-disable camelcase */
/* eslint-disable no-console */

export const state = () => ({
  // stravaLoadStatus: 0 - no change, 1 submitted authorization request to /auth endpoint,  2 received authorization key,
  // 3 submitted token request to /token endpoint, 4 received acces_token and refresh_token and submitted data to backend, 5 reloaded data from backend, 6 revoked access token, 7 pushed changes, 10 error state

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
      fav: null,
      healthy: true
    },
    stars: null,
    badges: null,
    runs: null,
    runningAppAuthentication: {
      strava: null
    },
    challenges: [{ id: 'ch1' }, { id: 'ch-2' }],
    events: null
  }

})

export const getters = {
  // basic profile
  profileImageUri: (state) => {
    return (!!state.auth.loggedIn) && (!!state.auth.user) && (!!state.auth.user.picture) ? JSON.parse(state.auth.user.picture).data.url : null
  },
  profileName: (state) => {
    return state.profile.basic?.name
  },
  isBasicProfileReady: (state) => {
    return !!state.profile.basic && !!state.profile.basic.gender && !!state.profile.basic.fav && !!state.profile.basic.mail && !!state.profile.basic.name
  },
  isChallengeReady: (state) => {
    return state.profile.challenges && state.profile.stars && length(state.profile.stars) === 3
  },
  // strava integration
  canUseStrava: (state, getters) => {
    return getters.hasRequestedScopes && getters.hasStravaAuthorizationCode && getters.hasStravaRefreshToken && getters.hasStravaAccessToken && getters.isStravaAccessTokenValid
  },
  hasStravaAuthorizationCode: (state) => {
    return !!state.profile.runningAppAuthentication.strava && !!state.profile.runningAppAuthentication.strava.authorization_code
  },
  hasRequestedScopes: (state) => {
    return state.profile.runningAppAuthentication.strava && (state.profile.runningAppAuthentication.strava.scopes === 'read,activity:read_all')
  },
  hasStravaRefreshToken: (state) => {
    return !!state.profile.runningAppAuthentication.strava && !!state.profile.runningAppAuthentication.strava.refresh_token
  },
  hasStravaAccessToken: (state) => {
    return !!state.profile.runningAppAuthentication.strava && !!state.profile.runningAppAuthentication.strava.access_token
  },
  isStravaAccessTokenValid: (state, getters) => {
    return getters.hasStravaAccessToken && !!state.profile.runningAppAuthentication.strava.expires_at && (state.profile.runningAppAuthentication.strava.expires_at > Date.now() / 1000)
  },
  // 1 hour throttle in s, or if no runs at all
  stravaIsThrottled: (state) => {
    return !!state.profile.runningAppAuthentication.strava && state.profile.runningAppAuthentication.strava.latest_fetch > 0 && (Date.now() / 1000 - state.profile.runningAppAuthentication.strava.latest_fetch < 3600)
  },
  authorization_code: (state) => {
    return !!state.profile.runningAppAuthentication.strava && state.profile.runningAppAuthentication.strava.authorization_code
  },
  authorization_time: (state) => {
    return !!state.profile.runningAppAuthentication.strava && state.profile.runningAppAuthentication.strava.authorization_time
  },
  scopes: (state) => {
    return !!state.profile.runningAppAuthentication.strava && state.profile.runningAppAuthentication.strava.scopes
  },
  refresh_token: (state) => {
    return !!state.profile.runningAppAuthentication.strava && state.profile.runningAppAuthentication.strava.refresh_token
  },
  access_token: (state) => {
    return !!state.profile.runningAppAuthentication.strava && state.profile.runningAppAuthentication.strava.access_token
  },
  expires_at: (state) => {
    return !!state.profile.runningAppAuthentication.strava && new Date(state.profile.runningAppAuthentication.strava.expires_at * 1000).toISOString()
  },
  latest_fetch: (state) => {
    return !!state.profile.runningAppAuthentication.strava && state.profile.runningAppAuthentication.strava.latest_server_fetch
  },
  runs: (state) => {
    return state.profile.runs
  }

}

export const mutations = {
  setProfileLoadStatus (state, statusCode) {
    state.profileLoadStatus = statusCode
  },
  setProfileId (state, id) {
    state.profile.id = id
  },
  setProfile (state, profile) {
    state.profile = { ...profile }
  },
  setProfileName (state, name) {
    state.profile.basic.name = name
  },
  setProfileMail (state, mail) {
    state.profile.basic.mail = mail
  },
  setProfileGender (state, gender) {
    if (gender === 'M' || gender === 'F') {
      state.profile.basic.gender = gender
    } else {
      console.warn(`[setProfileGender] gender needs to be M or F, not ${gender}`)
    }
  },
  setProfileFav (state, fav) {
    state.profile.basic.fav = fav
  },
  setProfileHealthy (state, b) {
    state.profile.basic.healthy = b
  },
  setStravaDataAccessAuthLoadStatus (state, statusCode) {
    state.stravaDataAccessAuthLoadStatus = statusCode
  },
  setStravaAuthorization (state, { authorization_code, scopes }) {
    console.log(`[setStravaAuthorization] received code ${authorization_code}, \t scopes ${scopes}`)
    state.profile.runningAppAuthentication.strava = { authorization_time: new Date(), authorization_code, scopes }
    // state.profile.runningAppAuthentication.strava.authorization_time = new Date().toDateString()
    // state.profile.runningAppAuthentication.strava.authorization_code = authorization_code
    // state.profile.runningAppAuthentication.strava.scopes = scopes
    console.log('[setStravaAuthorization] update done, strava is \t', JSON.stringify(state.profile.runningAppAuthentication.strava))
  },
  setStravaToken (state, token) {
    state.strava_token = token
    state.profile.runningAppAuthentication.strava.id = String(token.athlete.id)
    state.profile.runningAppAuthentication.strava.access_token = token.access_token
    state.profile.runningAppAuthentication.strava.refresh_token = token.refresh_token
    state.profile.runningAppAuthentication.strava.expires_at = token.expires_at
  },
  setStravaAccess (state, accessPass) {
    console.log('[setStravaAccess] received new access token for strava ', accessPass)
    state.profile.runningAppAuthentication.strava.access_token = accessPass.access_token
    state.profile.runningAppAuthentication.strava.expires_at = accessPass.expires_at
  },
  nukeStrava (state) {
    state.profile.runningAppAuthentication.strava = null
    state.strava_token = null
  },
  // we empty the object, but keep the structure
  nukeProfile (state) {
    const nuke = (o) => {
      Object.getOwnPropertyNames(o).forEach((p) => {
        o[p] = null
      })
    }
    const b = nuke(state.profile.basic)
    const r = nuke(state.profile.runningAppAuthentication)
    nuke(state.profile)
    state.profile.basic = b
    state.profile.runningAppAuthentication = r
    console.log('[nukeProfile] profile = ', state.profile)
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
      commit('setStravaDataAccessAuthLoadStatus', 5)
      await dispatch('fetchProfile')
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
  async postProfile ({ state, dispatch }) {
    dispatch('grabProfileIdFromAuth')
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
      const put = await this.$axios({
        method: 'put',
        url: `/profile/${state.profile.id}`,
        data: state.profile
      })
      commit('setProfile', put.data)
    } catch (error) {
      console.error(`[putNewProfile] ${state.profile.id}`)
      throw (error)
    }
  },

  async loadProfile ({ commit, dispatch, state }) {
    commit('setProfileLoadStatus', 1)
    dispatch('grabProfileIdFromAuth')
    await dispatch('fetchProfile')
    commit('setProfileLoadStatus', 0)
    console.info(`[loadProfile] Loading profile for user ${state.profile.id}`)
  },
  grabProfileIdFromAuth ({ commit, state }) {
    if (!state.profile.id) {
      commit('setProfileId', `U-${state.auth.user.sub}`)
      console.log('[grabProfileIdFromAuth] setting profile id, as it was empty ', state.profile.id)
    }
  },
  async handleUserLogin ({ commit, state, dispatch }) {
    // check if user is already logged in, if so, we can safely exit
    if (!state.auth.loggedIn) {
      throw new Error('[handleUserLogin] User not authenticated, cant log in.')
    }
    if (state.profileLoadStatus === 0 && !!state.profile.id) {
      console.info('[handleUserLogin] User already logged in, cant do it twice 😉. Will just fetch data instead.')
      dispatch('loadProfile')
    }

    // set user id in store and fetch profile data from backend
    commit('setProfileLoadStatus', 1)
    dispatch('grabProfileIdFromAuth')

    // fetch profile from backend
    const status = await dispatch('fetchProfile')
    // users data fetched, we are good to go
    if (status === 200) {
      commit('setProfileLoadStatus', 0)
      //  handle 404 error! - if object does not exist, create at server with PUT /user/{id}
      // check if it is a new user?
    } else if (status === 404) {
      commit('setProfileLoadStatus', 12)
      dispatch('fillDefaultValuesForProfile')
      dispatch('putNewProfile')
      commit('setProfileLoadStatus', 15)
      dispatch('loadProfile')
    } else {
      commit('setProfileLoadStatus', 10)
      throw (new Error('[handleUserLogin] Received stats code ' + status))
    }
  },

  fillDefaultValuesForProfile ({ commit, state, dispatch }) {
    console.info('[fillDefaultValuesForProfile] kind of empty here, grabbing default values')
    dispatch('grabProfileIdFromAuth')

    const name = (state.auth.user) ? (state.auth.user.preferred_username || state.auth.user.given_name || state.auth.user.username || state.auth.user.sub) : 'guest'
    commit('setProfileName', name)
    commit('setProfileMail', state.auth.user.email)
    commit('setProfileGender', state.auth.user.gender)
    commit('setProfileHealthy', true)
    console.info('[fillDefaultValuesForProfile] kind of empty here, grabbing default values', state.profile)
  },

  handleUserLogout ({ commit, state }) {
    commit('nukeStrava')
    commit('nukeProfile')
    commit('setStravaDataAccessAuthLoadStatus', 0)
    commit('setProfileLoadStatus', -1)
  },

  updateGender ({ commit, dispatch }, g) {
    commit('setProfileGender', g)
    commit('setProfileLoadStatus', 5)
    dispatch('postProfile')
    dispatch('loadProfile')
  },

  updateFav ({ commit, dispatch }, f) {
    commit('setProfileFav', f)
    commit('setProfileLoadStatus', 5)
    dispatch('postProfile')
    dispatch('loadProfile')
  },
  updateHealthy ({ commit, dispatch }, b) {
    commit('setProfileHealthy', b)
    commit('setProfileLoadStatus', 5)
    dispatch('postProfile')
    dispatch('loadProfile')
  },
  updateMail ({ commit, dispatch }, m) {
    commit('setProfileMail', m)
    commit('setProfileLoadStatus', 5)
    dispatch('postProfile')
    dispatch('loadProfile')
  },
  updateName ({ commit, dispatch }, n) {
    commit('setProfileName', n)
    commit('setProfileLoadStatus', 5)
    dispatch('postProfile')
    dispatch('loadProfile')
  },

  revokeStravaAccess ({ commit, dispatch }) {
    console.info('[revokeStravaAccess] Clearing codes')
    commit('nukeStrava', null)
    commit('setStravaDataAccessAuthLoadStatus', 6)
    dispatch('postProfile')
    commit('setStravaDataAccessAuthLoadStatus', 7)
    dispatch('loadProfile')
    commit('setStravaDataAccessAuthLoadStatus', 0)
    console.info('[revokeStravaAccess] Profile updated, codes cleared')
  }

}
