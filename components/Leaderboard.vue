<template>
  <div class="container max-w-5xl mx-auto m-8">
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
</template>

<script>
import SideBySideTextPictureCard from './layout-utils/SideBySideTextPictureCard'
import Overtaking from '~/assets/Overtaking.svg?inline'

export default {
  name: 'Leaderboard',
  components: { SideBySideTextPictureCard },
  props: {
    challenge: {
      type: Object,
      default: null
    },
    isMine: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style scoped>

</style>
