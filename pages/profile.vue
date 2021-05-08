<template>
  <basic-page-layout>
    <profile-form v-if="!$fetchState.pending" />
    <div v-else>
      Wait while we load data ...
    </div>
    <my-runs v-if="!$fetchState.pending && hasStravaRefreshToken" />
  </basic-page-layout>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import BasicPageLayout from '../components/layout-utils/BasicPageLayout'
import MyRuns from '../components/myRuns'

export default {
  components: { MyRuns, BasicPageLayout },
  async fetch () {
    const { store } = this.$nuxt.context
    console.info('[profile] loading page, user is authenticated but login has not been performed.\t', 'load status: ', this.profileLoadStatus(), ', loggedIn: ', this.loggedIn())
    if (this.profileLoadStatus() === -1 && this.loggedIn()) {
      console.info('[profile] dispatching handleUserlogin')
      await this.$store.dispatch('handleUserLogin')
    } else { await store.dispatch('fetchProfile') }
  },
  computed: {
    ...mapGetters(['hasStravaRefreshToken'])
  },
  methods: {
    ...mapState({
      loggedIn: state => state.auth.loggedIn,
      profileLoadStatus: state => state.profileLoadStatus
    })
  }

}

</script>
