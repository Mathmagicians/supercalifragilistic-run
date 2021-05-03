<template>
  <div
    class="
      w-full
      rounded-lg
      shadow-md
      m-2
      overflow-hidden"
  >
    <h1 v-if="$fetchState.pending">
      Getting runs from Strava
    </h1>
    <div />
    <page-section-title>
      Your runs
    </page-section-title>
    <ul>
      <li v-for="aRun in myRuns" :key="aRun.id">
        <run :run="aRun" />
      </li>
    </ul>
  </div>
</template>

<script>
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
  }
}
</script>

<style scoped>

</style>
