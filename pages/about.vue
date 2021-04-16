<template>
  <basic-page-layout>
    <page-section-title>
      About the game
    </page-section-title>
    <SuperRun class="fill-current  text-pink-400" />
  </basic-page-layout>
</template>
<script>
import BasicPageLayout from '../components/layout-utils/BasicPageLayout'
import PageSectionTitle from '../components/layout-utils/PageSectionTitle'
import SuperRun from '~/assets/Super-run.svg?inline'
export default {
  auth: false,
  components: { PageSectionTitle, BasicPageLayout, SuperRun }

}
</script>
