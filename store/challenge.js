export const state = () => ({
  list: [
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
  list: (state) => { return state.list },
  getChallengeById: state => (id) => { return state.list.find(c => c.id === id) }
}

export const mutations = {

}

export const actions = {
  async fetchChallenges ({ state, commit }) {
    await console.info('[fetchChallenges] fetching challenges')
    console.warn('not implemented!')
    // fixme call /challenge
  },
  async fetchChallenge ({ state, commit }, id) {
    await console.info('[fetchChallenge] fetching challenges')
    console.warn('not implemented!')
    // fixme call /challenge/id
    // return state.challenge.find(c => c.id === id)
  },
  async updateChallenge ({ state, commit }, id) {
    await console.info('[fetchChallenge] fetching challenges')
    console.warn('not implemented!')
  }
}
