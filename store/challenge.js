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
    const filterRunsOver3Km = r => r >= 3000.0
    const runCountReducer = (acc, r) => acc + 1
    const distanceCountReducer = (acc, r) => acc + r
    // we want reverse order
    const compareByTotalScore = (a, b) => b.scores.total - a.scores.total

    console.log(`[setChallenge] received data for ${athletes.length} athletes`, athletes)

    athletes.forEach((a) => {
      a.scores = {}
      console.log(`[setChallenge] about to compute scores for athlete ${a.id}`)
      a.scores.startBonus = 3 * (a.runs ? a.runs.map(r => r.distance).filter(filterRunsOver3Km).reduce(runCountReducer, 0) : 0)
      a.scores.distanceTotal = (a.runs ? a.runs.map(r => r.distance).filter(filterRunsOver3Km).reduce(distanceCountReducer, 0) : 0) / 1000

      a.scores.total = a.scores.startBonus + a.scores.distanceTotal
      console.log(`[setChallenge] interim computation of scores for athlete ${a.id}:`, a.scores)
    })
    athletes.sort(compareByTotalScore)
    console.log('[setChallenge] sorted data:', athletes)
    state.athletes = [...athletes]
  }
}

export const actions = {

  async fetchChallenge ({ state, commit }) {
    console.warn('[fetchChallenge] fetching challenge - hardwired to /profile')
    // fixme call /challenge/id instead
    try {
      const get = await this.$axios({
        method: 'get',
        url: '/profile'
      })
      console.info(`[fetchChallenges] fetched athlete stats, status: ${status}`, get.status)
      commit('setChallenge', get.data)
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
  async updateChallenge ({ state, commit }, id) {
    await console.info('[updateChallenge] updating challenges')
    console.warn('not implemented!')
  }
}
