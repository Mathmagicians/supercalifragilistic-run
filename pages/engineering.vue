<template>
  <basic-page-layout>
    <page-section-title>
      {{ engineeringPage.description }}
    </page-section-title>
    <nuxt-content :document="engineeringPage" class="prose lg:prose-lg" />
  </basic-page-layout>
</template>

<script>

import BasicPageLayout from '../components/layout-utils/BasicPageLayout'
import PageSectionTitle from '../components/layout-utils/PageSectionTitle'

export default {
  auth: false,
  components: { PageSectionTitle, BasicPageLayout },

  async asyncData ({ $content }) {
    const engineeringPage = await $content('engineering').fetch()
    return { engineeringPage }
  }

}

</script>
