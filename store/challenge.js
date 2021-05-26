export const state = () => ({
  myChallenge: {
    Athletes: []
  },
  myAthlete: {}
})

export const getters = {
  getAthletes: (state) => { return state.myChallenge.Athletes },
  getMyChallenge: (state) => { return state.myChallenge },
  getMyAthlete: (state) => { return state.myAthlete },
  getAthletePosition: state => (id) => {
    const matchId = athlete => athlete.ProfileId === id
    return state.myChallenge.Athletes.findIndex(matchId) + 1
  }
}

export const mutations = {
  setMyChallenge (state, myChallenge) {
    state.myChallenge = myChallenge
  },

  setChallenges (state, challenges) {
    state.challenges = [...challenges]
  },

  setMyAthlete (state, athlete) {
    state.myAthlete = { ...athlete }
  }
}

export const actions = {

  async fetchMyAthlete ({ commit, state, getters, dispatch }, { athlete, challenges }) {
    console.log('[fetchMyAthlete] fetching athlete data for logged in profile, athlete', athlete, challenges)
    if (!challenges?.length > 0) {
      console.warn(`[fetchAthlete] Received invalid parameters athlete:${athlete}, challenge: ${challenges}`)
      return
    }
    const challenge = challenges[0]
    const myAthlete = await dispatch('fetchAthlete', { athlete, challenge })
    if (myAthlete) {
      commit('setMyAthlete', myAthlete)
    }
  },

  async fetchAthlete ({ commit, state, dispatch }, { athlete, challenge }) {
    console.log(`[fetchAthlete] fetching athlete data for athlete ${athlete} in challenge ${challenge}`)
    if (!athlete?.length || !challenge?.length) {
      console.warn(`[fetchAthlete] Received invalid parameters athlete:${athlete}, challenge: ${challenge}`)
      return
    }
    try {
      const get = await this.$axios({
        method: 'get',
        url: `/athlete/${athlete}?challenge=${challenge}`
      })
      console.log('[FetchAthlete] received data from server')
      commit('setMyAthlete', get.data)
      console.log('[FetchMyAthlete] Challenge data fetched for athlete')
      return get.data
    } catch (error) {

    }
  },

  async fetchMyChallenge ({ commit, state, dispatch }, mych) {
    console.log('[FetchMyChallenge] ready to fetch challenge:', mych)
    if (!mych?.length) {
      console.warn('Not participating in any challenge')
      return
    }
    try {
      const get = await this.$axios({
        method: 'get',
        url: `/challenge/${mych[0]}`
      })
      console.log('[FetchMyChallenge] received data from server')
      commit('setMyChallenge', get.data)
      console.log('[FetchMyChallenge] Challenge data fetched for athlete')
    } catch (error) {
      // if status code is 404 return as value
      if (error.response && error.response.status === 404) {
        console.info('[fetchChallenge] does not exist in db')
      } else if (error.response) {
        console.error('[fetchChallenge]: Uh, oh, somethings wrong with the response')
        throw (error)
      } else {
        console.error('[fetchChallenge] : Cant communicate with backend')
        throw (error)
      }
    }
  },

  async fetchChallenges ({ commit, state }) {
    try {
      const get = await this.$axios({
        method: 'get',
        url: '/challenge'
      })
      commit('setChallenges', get.data)
    } catch (error) {
      console.error('[fetchChallenge]: Uh, oh, somethings wrong with the response')
    }
  },

  async updateChallenge ({ state, commit }, id) {
    await console.info('[updateChallenge] updating challenges')
    console.warn('not implemented!')
  }
}
