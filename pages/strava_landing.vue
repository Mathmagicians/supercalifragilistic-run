<template>
  <basic-page-layout>
    <page-section-title>Congratulations {{ profileName }}, a successful landing, Strava authorization done!</page-section-title>
    <strava-integation-indicator />
  </basic-page-layout>
</template>

<script>
import { mapActions, mapGetters, mapMutations, mapState } from 'vuex'
import PageSectionTitle from '../components/layout-utils/PageSectionTitle'
import StravaIntegationIndicator from '../components/StravaIntegationIndicator'
import BasicPageLayout from '../components/layout-utils/BasicPageLayout'

export default {
  name: 'StravaLanding',
  components: { BasicPageLayout, StravaIntegationIndicator, PageSectionTitle },
  async asyncData ({ query, store, error }) {
    // we receive an authorization code as query parameter, we commit this to vuex, and afterwards call the action to get a strava token
    console.info(`[strava_landing] received code ${query.code} and scope ${query.scope} from strava`)
    if (query.code) {
      console.log('[strava_landing] strava is before authorization ', store.state.profile.runningAppAuthentication.strava)
      store.commit('setStravaAuthorization', { authorization_code: query.code, scopes: query.scope })
      console.log('[strava_landing] strava is after authorization ', store.state.profile.runningAppAuthentication.strava)
      await store.dispatch('acquireStravaRefreshToken')
      console.log('[strava_landing] strava is after token ', store.state.profile.runningAppAuthentication.strava)
    } else { error({ message: 'Didnt receive authorization code from Strava', statusCode: 400 }) }
  },
  computed: {
    ...mapGetters(['profileName', 'canUseStrava', 'hasStravaAuthorizationCode', 'hasStravaRefreshToken', 'hasValidStravaAccessToken', 'hasRequestedScopes']),
    ...mapState({ strava: state => state.profile.runningAppAuthentication.strava })
  },
  methods: {
    ...mapActions(['acquireStravaRefreshToken']),
    ...mapMutations(['setStravaAuthorization'])
  }

}
</script>

<style scoped>

</style>
