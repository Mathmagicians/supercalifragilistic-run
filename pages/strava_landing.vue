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
    if (query.code) {
      store.commit('setStravaAuthorization', { authorizationCode: query.code, scopes: query.scope })
      await store.dispatch('acquireStravaRefreshToken')
    }
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
