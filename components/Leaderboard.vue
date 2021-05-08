<template>
  <div class="relative container max-w-full mx-auto m-8 min-h-screen items-center justify-center">
    <!-- container with scrolling ticker -->
    <div>
      <side-by-side-text-picture-card :title="challenge.name">
        <template #default>
          <h4 class="text-gray-600 text-md italic font-light">
            Motto: Crush your so-called peer-birds, and be the fastest flamingo in the flock
          </h4>
          <h1 class="text-gray-700 text-lg">
            Leaderboard
          </h1>
          <ul>
            <li> 1. 🥦 Jacek ⭐️ 20</li>
            <li> 2. 🏃‍♂️ Simon ⭐️ 0</li>
          </ul>
          ..
          <h1 class="text-gray-700 text-lg">
            Events
          </h1>
          ...
        </template>
        <template #bottom>
          <Overtaking />
        </template>
      </side-by-side-text-picture-card>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import SideBySideTextPictureCard from './layout-utils/SideBySideTextPictureCard'
import Overtaking from '~/assets/Overtaking.svg?inline'

export default {
  name: 'Leaderboard',
  components: { SideBySideTextPictureCard, Overtaking },
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
