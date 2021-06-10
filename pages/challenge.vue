<template>
  <basic-page-layout v-if="!$fetchState.pending">
    <div class="relative container max-w-full mx-auto m-8 min-h-screen items-center justify-center">
      <!-- container with scrolling ticker -->
      <side-by-side-text-picture-card :title="challenge.Name" sub-title="Leaderboard">
        <template #default>
          <h4 class="text-gray-600 text-md italic font-light">
            Motto: Crush your so-called peer-birds, and be the fastest flamingo in the flock
          </h4>
        </template>
        <template #info>
          <p> Challenge <span class="italic">running</span> since</p>
          <p class="text-right px-2 sm:px-4 text-lg sm:text-2xl text-green-600">
            {{ ticker | countUp(challenge.Start) }}
          </p>
          <p> Challenge ends in</p>
          <p class="text-right px-2 sm:px-4 text-lg sm:text-2xl  text-red-600">
            {{ ticker | countDown(challenge.End) }}
          </p>
        </template>
        <template #bottom>
          <Overtaking />
        </template>
      </side-by-side-text-picture-card>
      <leaderboard v-if="athletes" :athletes="athletes" />
    </div>
  </basic-page-layout>
  <div v-else>
    Wait while we load data ...
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import Leaderboard from '../components/Leaderboard'
import BasicPageLayout from '../components/layout-utils/BasicPageLayout'
import SideBySideTextPictureCard from '../components/layout-utils/SideBySideTextPictureCard'
import Overtaking from '~/assets/Overtaking.svg?inline'

export default {
  components: { BasicPageLayout, Leaderboard, SideBySideTextPictureCard, Overtaking },
  computed: {
    ...mapGetters({
      athletes: 'challenge/getAthletes',
      challenge: 'challenge/getMyChallenge'
    })
  },
  data () {
    return {
      ticker: new Date()
    }
  },
  async fetch () {
    const { store } = this.$nuxt.context
    console.info('[challenge] loading page,')
    await store.dispatch('handleUserLogin')
    await store.dispatch('challenge/fetchMyChallenge', store.state.profile.my_challenges)
  },
  watch: {
    ticker: {
      handler (value) {
        setTimeout(() => { this.ticker = new Date() }, 1000)
      },
      immediate: true
    }
  },
  methods: {
    isMine (id) {
      const included = true // this.myChallenges.includes(id)
      return included
    }
  }
}
</script>
