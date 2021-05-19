<template>
  <basic-page-layout>
    <profile-form v-if="!$fetchState.pending" />
    <div v-else>
      Wait while we load data ...
    </div>
  </basic-page-layout>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import BasicPageLayout from '../components/layout-utils/BasicPageLayout'

export default {
  components: { BasicPageLayout },
  async fetch () {
    const { store } = this.$nuxt.context
    console.info('[profile] dispatching handleUserLogin')
    await store.dispatch('handleUserLogin')
    console.info('[profile] user is logged in and profile loaded')
  }
}

</script>
