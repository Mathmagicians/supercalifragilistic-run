<template>
  <basic-page-layout title="My Runs">
    <my-runs v-if="!$fetchState.pending && hasStravaRefreshToken" />
    <div v-if="$fetchState.pending">
      Wait while we load data ...
    </div>
    <div
      v-if="!$fetchState.pending && !hasStravaRefreshToken"
    >
      <h4 class="text-lg text-gray-700">
        Hi, 🦩, we would love to show you, how your are doing in the competition. But, you need to authorize us, to fetch data from your running app... Head over to profile settings, to get it done.
      </h4>
      <nuxt-link to="/profile">
        <hero-button>
          🏃‍♀️Go to profile settings
        </hero-button>
      </nuxt-link>
    </div>
  </basic-page-layout>
</template>

<script>
import MyRuns from '@/components/myRuns'
import BasicPageLayout from '@/components/layout-utils/BasicPageLayout'
import HeroButton from '@/components/layout-utils/HeroButton'
import { mapGetters, mapState } from 'vuex'

export default {
  name: 'Me',
  components: { MyRuns, BasicPageLayout, HeroButton },
  async fetch () {
    const { store } = this.$nuxt.context
    console.info('[me] dispatching handleUserLogin')
    await store.dispatch('handleUserLogin')
    await store.dispatch('challenge/fetchMyAthlete', { athlete: store.state.profile.id, challenges: store.state.profile.my_challenges })
    await store.dispatch('challenge/fetchMyChallenge', store.state.profile.my_challenges)
  },
  computed: {
    ...mapGetters({
      hasStravaRefreshToken: 'hasStravaRefreshToken',
      myAthlete: 'challenge/getMyAthlete'
    })
  }
}
</script>

<style scoped>

</style>
