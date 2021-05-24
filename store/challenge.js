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
