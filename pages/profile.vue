<template>
  <basic-page-layout>
    <profile-form />
    <card>
      <h1 v-if="$fetchState.pending">
        Getting runs from Strava
      </h1>
      <div />
      <page-section-title>
        Your runs
      </page-section-title>
      <ul>
        <li v-for="run in myRuns" :key="run.id">
          {{ run }}
        </li>
      </ul>
    </card>
    <card>
      <run />
    </card>
  </basic-page-layout>
</template>

<script>
import { mapActions } from 'vuex'
import Card from '../components/layout-utils/Card'
import BasicPageLayout from '../components/layout-utils/BasicPageLayout'
import PageSectionTitle from '../components/layout-utils/PageSectionTitle'

export default {
  components: { PageSectionTitle, BasicPageLayout, Card },
  data () {
    return {
      myRuns: []
    }
  },
  async fetch () {
    const { store, error } = this.$nuxt.context
    try {
      await store.dispatch('fetchAthleteActivity')
      this.myRuns = store.state.profile.runs
    } catch (e) {
      error({
        statusCode: 503,
        message: 'Unable to fetch your runs from Strava :('
      })
    }
  }
}

</script>
