<template>
  <basic-page-layout>
    <div v-if="!$fetchState.pending" class="relative container max-w-full mx-auto m-8 min-h-screen items-center justify-center">
      <!-- container with scrolling ticker -->

      <side-by-side-text-picture-card :title="challenge.Name" sub-title="Leaderboard">
        <template #default>
          <h4 class="text-gray-600 text-md italic font-light">
            Motto: Crush your so-called peer-birds, and be the fastest flamingo in the flock
          </h4>
        </template>
        <template v-if="isChallengeRunning" #info>
          <p> Challenge <span class="italic">running</span> since</p>
          <p class="text-right px-2 sm:px-4 text-lg sm:text-2xl text-green-600">
            {{ ticker | countUp(challenge.Start) }}
          </p>
          <p> Challenge ends in</p>
          <p class="text-right px-2 sm:px-4 text-lg sm:text-2xl  text-red-600">
            {{ ticker | countDown(challenge.End) }}
          </p>
        </template>
        <template v-else-if="isChallengeOver" #info>
          <p> Challenge is over since</p>
          <p class="text-right px-2 sm:px-4 text-lg sm:text-2xl  text-red-600">
            {{ ticker | countDown(challenge.End) }}
          </p>
          <div class="flex flex-row items-end">
            <medal :athlete="athletes[1]" :with-podium="true" for="2" />
            <medal :athlete="athletes[0]" :with-podium="true" for="1" />
            <medal :athlete="athletes[2]" :with-podium="true" for="3" />
          </div>
        </template>
        <template #bottom>
          <Overtaking />
        </template>
      </side-by-side-text-picture-card>
      <leaderboard v-if="athletes" :athletes="athletes" />
    </div>
    <div v-else>
      Wait while we load data ...
    </div>
  </basic-page-layout>
</template>
<script>
import { mapGetters } from 'vuex'
import Leaderboard from '../components/Leaderboard'
import BasicPageLayout from '../components/layout-utils/BasicPageLayout'
import SideBySideTextPictureCard from '../components/layout-utils/SideBySideTextPictureCard'
import Medal from '~/components/Medal'
import Overtaking from '~/assets/Overtaking.svg?inline'

export default {
  components: { Medal, BasicPageLayout, Leaderboard, SideBySideTextPictureCard, Overtaking },
  computed: {
    ...mapGetters({
      athletes: 'challenge/getAthletes',
      challenge: 'challenge/getMyChallenge'
    }),
    isChallengeRunning () {
      return this.challenge && this.ticker <= this.challenge.End * 1000 && this.challenge.Start * 1000 <= this.ticker
    },
    isChallengeOver () {
      return this.challenge && this.ticker > this.challenge.End * 1000
    }
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
        setTimeout(() => { this.ticker = new Date() }, 60000)
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
