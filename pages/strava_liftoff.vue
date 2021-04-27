<template>
  <div>
    Now we need to have strava authorization... redirecting
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapState } from 'vuex'

export default {
  name: 'StravaLanding',

  asyncData ({ $config, redirect, store }) {
    console.log('refresh token', store.getters.hasStravaRefreshToken)
    if (!store.getters.hasStravaRefreshToken) {
      store.commit('setStravaDataAccessAuthLoadStatus', 1)
      redirect(302, $config.strava_authorize_url)
    } else {
      redirect(302, '/strava_landing', { message: 'strava_refresh_token_exists' })
    }
    return {}
  }
}
</script>

<style scoped>

</style>
