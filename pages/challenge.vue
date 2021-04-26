<template>
  <basic-page-layout>
    <leaderboard v-for="challenge in challenges" :key="challenge.id" :is-mine="isMine(challenge.id)" :challenge="challenge" />
  </basic-page-layout>
</template>
<script>
import { mapState } from 'vuex'
import Leaderboard from '../components/Leaderboard'
import BasicPageLayout from '../components/layout-utils/BasicPageLayout'
export default {
  components: { BasicPageLayout, Leaderboard },
  computed: {
    ...mapState({
      challenges: state => state.challenges,
      myChallenges: state => state.profile.challenges
    })
  },
  methods: {
    isMine (id) {
      const included = this.myChallenges.includes(id)
      return included
    }
  }
}
</script>
