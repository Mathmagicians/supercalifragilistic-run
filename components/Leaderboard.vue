<template>
  <div class="container max-w-5xl mx-auto m-8">
    <page-section-title>
      Situation overview
    </page-section-title>

    <h1>Events</h1>
    <div class="w-full aspect-w-4 aspect-h-3 lg:aspect-w-16 lg:aspect-h-9">
      <img
        class="w-full h-full object-cover object-left-top"
        src="~/assets/Overtaking.svg"
        alt="Crush your so-called peer-birds, and be the fastest flamingo in the flock"
      >
    </div>
    <h1>Leaderboard for the Spring 2021 Challenge:</h1>
  </div>
</template>

<script>
import PageSectionTitle from './layout-utils/PageSectionTitle'
export default {
  name: 'Leaderboard',
  components: { PageSectionTitle }
}
</script>

<style scoped>

</style>
