<template>
  <basic-page-layout>
    <page-section-title>
      Engineering
    </page-section-title>
    <p>
      Received from server: {{ fromLambda }}
    </p>
    <p>
      Lambda url is: {{ $config.axios.baseUrl }}
    </p>
  </basic-page-layout>
</template>

<script>

import BasicPageLayout from '../components/layout-utils/BasicPageLayout'
import PageSectionTitle from '../components/layout-utils/PageSectionTitle'

export default {
  auth: false,
  components: { PageSectionTitle, BasicPageLayout },

  data () {
    return {
      fromLambda: {}
    }
  },

  async fetch () {
    this.fromLambda = await this.$axios.$get('/')
  }

}

</script>
