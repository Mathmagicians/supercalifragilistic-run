<template>
  <basic-page-layout v-if="!$fetchState.pending">
    <leaderboard />
  </basic-page-layout>
  <div v-else>
    Wait while we load data ...
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import Leaderboard from '../components/Leaderboard'
import BasicPageLayout from '../components/layout-utils/BasicPageLayout'
export default {
  components: { BasicPageLayout, Leaderboard },
  async fetch () {
    const { store } = this.$nuxt.context
    console.info('[challenge] loading page,')
    await store.dispatch('handleUserLogin')
    await store.dispatch('challenge/fetchMyChallenge', store.state.profile.my_challenges)
  },
  methods: {
    isMine (id) {
      const included = true // this.myChallenges.includes(id)
      return included
    }
  }
}
</script>
