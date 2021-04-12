<template>
  <basic-page-layout>
    <leaderboard />
  </basic-page-layout>
</template>
<script>
import Leaderboard from '../components/Leaderboard'
import BasicPageLayout from '../components/layout-utils/BasicPageLayout'
export default {
  components: { BasicPageLayout, Leaderboard }
}
</script>
