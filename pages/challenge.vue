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
          <div>
            <ul class="text-current">
              <li class="flex items-center px-2 my-10 sm:my-20">
                <First class="w-1/4 text-current text-white ring-yellow-500 ring-4 border-4 border-yellow-300 rounded-full bg-yellow-200" />
                <p class="text-right px-2 sm:px-4 text-lg sm:text-2xl ">
                  <span class="text-2xl sm:text-6xl text-yellow-400">1st </span> place goes to {{ athletes[0].Meta.Fav ? athletes[0].Meta.Fav : '⁇' }} {{ athletes[0].Meta.Name ? athletes[0].Meta.Name : 'name missing' }}
                </p>
              </li>
              <li class="flex items-center px-2 my-10 sm:my-20">
                <Second class="w-1/4 text-current  ring-gray-500 ring-4 border-4 border-gray-400 rounded-full bg-gray-200" />
                <p class="text-right px-2 sm:px-4 text-lg sm:text-2xl">
                  <span class="text-2xl sm:text-6xl text-gray-500">2nd </span> place goes to {{ athletes[1].Meta.Fav ? athletes[1].Meta.Fav : '⁇' }} {{ athletes[1].Meta.Name ? athletes[1].Meta.Name : 'name missing' }}
                </p>
              </li>
              <li class="flex items-center px-2 my-10 sm:my-20">
                <Third class="w-1/4 text-current ring-yellow-800 ring-4 border-4 border-yellow-700 rounded-full bg-yellow-600" />
                <p class="text-right px-2 sm:px-4 text-lg sm:text-2xl">
                  <span class="text-2xl sm:text-6xl text-yellow-800">3rd </span> place goes to {{ athletes[2].Meta.Fav ? athletes[2].Meta.Fav : '⁇' }} {{ athletes[2].Meta.Name ? athletes[2].Meta.Name : 'name missing' }}
                </p>
              </li>
            </ul>
          </div>
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
import First from '~/assets/First.svg?inline'
import Second from '~/assets/Second.svg?inline'
import Third from '~/assets/Third.svg?inline'

export default {
  components: { BasicPageLayout, Leaderboard, SideBySideTextPictureCard, Overtaking, First, Second, Third },
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
