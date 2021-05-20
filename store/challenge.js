export const state = () => ({
  myChallenge: {
    Athletes: []
  }
})

export const getters = {
  getAthletes: (state) => { return state.athletes },
  getMyChallenge: (state) => { return state.myChallenge }
}

export const mutations = {
  setMyChallenge (state, myChallenge) {
    state.myChallenge = myChallenge
  },

  setChallenges (state, challenges) {
    state.challenges = [...challenges]
  },
  setAthletes (state, myChallenge) {
    const filterRunsOver3Km = r => r >= 3000.0
    const runCountReducer = (acc, r) => acc + 1
    const distanceCountReducer = (acc, r) => acc + r
    // we want reverse order
    const compareByTotalScore = (a, b) => b.Score.Total - a.Score.Total

    const athletes = myChallenge.Athletes
    console.log(`[computeInterimScores] received data for ${athletes?.length} athletes`)

    athletes.forEach((a) => {
      console.log(`[computeInterimScores] about to compute scores for athlete ${a.ProfileId}`)
      a.Score.StartBonus = 3 * (a.Runs ? a.Runs.map(r => r.distance).filter(filterRunsOver3Km).reduce(runCountReducer, 0) : 0)
      a.Score.Kilometer = (a.Runs ? a.Runs.map(r => r.distance).filter(filterRunsOver3Km).reduce(distanceCountReducer, 0) : 0) / 1000

      a.Score.Total = a.Score.StartBonus + a.Score.Kilometer
      console.log(`[computeInterimScores] interim computation of scores for athlete ${a.id}:`, a.Score.Total)
    })
    athletes.sort(compareByTotalScore)
    console.log('[computeInterimScores] sorted data')
    state.myChallenge.Athletes = [...athletes]
  }
}

export const actions = {

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
      commit('setAthletes', get.data)
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
