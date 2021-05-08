<template>
  <basic-page-layout>
    <leaderboard v-for="challenge in list" :key="challenge.id" :is-mine="isMine(challenge.id)" :challenge="challenge" />
  </basic-page-layout>
</template>
<script>
import { mapGetters } from 'vuex'
import Leaderboard from '../components/Leaderboard'
import BasicPageLayout from '../components/layout-utils/BasicPageLayout'
export default {
  components: { BasicPageLayout, Leaderboard },
  computed: {
    ...mapGetters({ list: 'challenge/list' })
  },
  methods: {
    isMine (id) {
      const included = true // this.myChallenges.includes(id)
      return included
    }
  }
}
</script>
