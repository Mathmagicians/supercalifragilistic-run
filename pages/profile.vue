<template>
  <basic-page-layout>
    <profile-form />
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
  components: { BasicPageLayout, Card }
}

</script>
