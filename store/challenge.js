export const state = () => ({
  list: [
    {
      id: 'ch-2',
      name: 'Løbeudfordringen 2021',
      fromEpoch: 1619992800,
      toEpoch: 1623621599
    }
  ],
  athletes: []
})

export const getters = {
  list: (state) => { return state.list },
  getChallengeById: state => (id) => { return state.list.find(c => c.id === id) },
  getAthletes: (state) => { return state.athletes }
}

export const mutations = {
  setChallenge (state, athletes) {
    state.athletes = { ...athletes }
  }
}

export const actions = {
  async fetchChallenges ({ state, commit }) {
    await console.info('[fetchChallenges] fetching challenges')
    console.warn('not implemented!')
    // fixme call /challenge
  },
  async fetchChallenge ({ state, commit }) {
    console.warn('[fetchChallenge] fetching challenge - hardwired to /profile')
    // fixme call /challenge/id instead
    try {
      const get = await this.$axios({
        method: 'get',
        url: '/profile'
      })
      commit('setChallenge', get.data)
      console.info(`[fetchChallenges] fetched athlete stats, status: ${status}`, get.status)
    } catch (error) {
      // if status code is 404 return as value
      if (error.response && error.response.status === 404) {
        console.info('[fetchChallenge] does not exist in db')
      } else if (error.response) {
        console.error(`[fetchProfile] ${state.profile.id}: Uh, oh, somethings wrong with the response`)
        throw (error)
      } else {
        console.error(`[fetchProfile] ${state.profile.id}: Cant communicate with backend`)
        throw (error)
      }
    }
  },
  async updateChallenge ({ state, commit }, id) {
    await console.info('[updateChallenge] updating challenges')
    console.warn('not implemented!')
  }
}
