<template>
  <basic-page-layout>
    <page-section-title>Profile</page-section-title>
    <card>
      User:
      <hero-button @click="$auth.fetchUser()">
        Fetch user
      </hero-button>
      token: {{ $auth.strategy.token }}
      <hero-button @click="$auth.strategy.token.get()">
        Fetch user
      </hero-button>
    </card>
    <card>
      <run />
    </card>
  </basic-page-layout>
</template>

<script>
import Card from '../components/layout-utils/Card'
import BasicPageLayout from '../components/layout-utils/BasicPageLayout'
import PageSectionTitle from '../components/layout-utils/PageSectionTitle'
export default {
  components: { PageSectionTitle, BasicPageLayout, Card },

  data () {
    return {
      fromLambda: {},
      token: {},
      user: {}
    }
  },

  async fetch () {
    const res = await this.$axios.$get('/profile')
    this.fromLambda = res
  },
  mounted () {
    // this.$auth.fetchUser().then(() => { console.log('Done fetching user') })
  }

}

</script>
