<template>
  <div
    class="
      w-full
      overflow-hidden"
  >
    <h1 v-if="$fetchState.pending">
      Getting runs from Strava
    </h1>
    <div v-if="!$fetchState.pending && !!runs">
      <page-section-title>
        Your runs
      </page-section-title>
      <p class="text-xs text-gray-400">
        Data fetched at {{ new Date() }}
      </p>
      <ul>
        <li v-for="aRun in myRuns" :key="aRun.id">
          <run :run="aRun" />
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import PageSectionTitle from './layout-utils/PageSectionTitle'

export default {
  name: 'MyRuns',
  components: { PageSectionTitle },

  data () {
    return {
      myRuns: []
    }
  },
  async fetch () {
    const { store, error } = this.$nuxt.context
    await store.dispatch('fetchAthleteActivity')
    this.myRuns = store.state.profile.runs
  },
  computed: {
    ...mapGetters(['runs'])
  }
}
</script>

<style scoped>

</style>
