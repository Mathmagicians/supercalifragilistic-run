<template>
  <div>
    <ul>
      <li> Welcome, you have landed succesfully from strava authorization.</li>
      <li> code is: {{ authorizationCode }}</li>
      <li>scope is: {{ scopes }}</li>
      <li>queryparams are: {{ $route.query }}</li>
    </ul>
  </div>
</template>

<script>
import { mapActions, mapMutations } from 'vuex'

export default {
  name: 'StravaLanding',

  async asyncData ({ query, store }) {
    // we receive an authorization code as query parameter, we commit this to vuex, and afterwards call the action to get a strava token
    if (query.code) {
      store.commit('setStravaAuthorization', { authorizationCode: query.code, scopes: query.scope })
    } else { console.error('Missing code from strava') }
    await store.dispatch('getStravaToken')
    console.log('token from strava')
  },
  computed: {
    authorizationCode () {
      return this.$route.query.code
    },
    scopes () {
      return this.$route.query.scope
    }
  },
  methods: {
    ...mapActions(['getStravaToken']),
    ...mapMutations(['setStravaAuthorization'])
  }

}
</script>

<style scoped>

</style>
