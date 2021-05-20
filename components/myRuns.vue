<template>
  <div class="w-full ">
    <page-section-title>
      Your runs
    </page-section-title>
    <p class="text-xs text-gray-400">
      Data fetched {{ latest_fetch| timeSince }}
    </p>
    <div class="flex flex-col sm:flex-row flex-wrap">
      <run
        v-for="(aRun, key) in runs"
        :key="aRun.id"
        :run="aRun"
        :number="runs.length - key"
        class="w-1/2"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import PageSectionTitle from './layout-utils/PageSectionTitle'

export default {
  name: 'MyRuns',
  components: { PageSectionTitle },
  computed: {
    ...mapGetters(['runs', 'latest_fetch'])
  }
}
</script>

<style scoped>

</style>
