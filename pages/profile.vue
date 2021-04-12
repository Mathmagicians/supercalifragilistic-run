<template>
  <basic-page-layout>
    <page-section-title>Profile</page-section-title>
    <card>
      User: {{ user }}
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
      user: 'themathmagician'
    }
  },

  async fetch () {
    const res = await this.$axios.$get('/profile')
    this.fromLambda = res
  }

}

</script>
