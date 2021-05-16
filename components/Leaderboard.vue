<template>
  <div class="relative container max-w-full mx-auto m-8 min-h-screen items-center justify-center">
    <!-- container with scrolling ticker -->
    <side-by-side-text-picture-card :title="challenge.name" sub-title="Leaderboard">
      <template #default>
        <h4 class="text-gray-600 text-md italic font-light">
          Motto: Crush your so-called peer-birds, and be the fastest flamingo in the flock
        </h4>
      </template>
      <template #bottom>
        <Overtaking />
      </template>
    </side-by-side-text-picture-card>
    <div class="flex flex-col">
      <leader-entry v-for="athlete in athletes" :key="athlete.id" :athlete="athlete" />
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import SideBySideTextPictureCard from './layout-utils/SideBySideTextPictureCard'
import LeaderEntry from './layout-utils/LeaderEntry'
import Overtaking from '~/assets/Overtaking.svg?inline'

export default {
  name: 'Leaderboard',
  components: { SideBySideTextPictureCard, Overtaking, LeaderEntry },
  props: {
    challenge: {
      type: Object,
      default: null
    },
    isMine: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      scrollText: [' 1. 🥦 Jacek ⭐️ 20', '1. 🥦 Jacek ⭐️ 20', '2. 🏃‍♂️ Simon ⭐️ 0', '1. 🥦 Jacek ⭐️ 20', '2. 🏃‍♂️ Simon ⭐️ 0', '1. 🥦 Jacek ⭐️ 20', ' 1. 🥦 Jacek ⭐️ 20', '1. 🥦 Jacek ⭐️ 20', '2. 🏃‍♂️ Simon ⭐️ 0', '1. 🥦 Jacek ⭐️ 20', '2. 🏃‍♂️ Simon ⭐️ 0', '1. 🥦 Jacek ⭐️ 20']
    }
  },
  computed: {
    ...mapGetters({
      athletes: 'challenge/getAthletes'
    })
  }
}
</script>

<style scoped>
.scroller {
  animation: 60s scroll alternate infinite
}

@keyframes scroll {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-100%);
  }
}
</style>
