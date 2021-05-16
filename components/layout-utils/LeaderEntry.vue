<template>
  <div class="flex flex-rows justify-evenly border-t-2 border-b-1 border-gray-200 text-lg py-2 items-center">
    <span class="block border-r-1 border-gray-200 px-2 py-4 w-1/12"> {{ athlete.basic.fav ? athlete.basic.fav : '⁇' }}</span>
    <span class="block border-r-1 border-gray-200 px-2 py-4 w-1/6">{{ athlete.basic.name ? athlete.basic.name : 'name missing' }} </span>
    <span class="block border-r-1 border-gray-200 px-2 py-4 font-semibold w-1/6"> 🏃‍♂ Runs
      <span :class="athlete.runs ? 'text-green-600': 'text-red-600'">️{{ athlete.runs ? athlete.runs.length: 0 }} </span>
    </span>
    <span class="block border-r-1 border-gray-200 px-2 py-4 font-semibold w-1/6"> 🏃‍♂ Start Bonus
      <span :class="athlete.scores.startBonus ? 'text-green-600': 'text-red-600'">️{{ athlete.scores.startBonus }} </span>
    </span>
    <span class="block border-r-1 border-gray-200 px-2 py-4 font-semibold w-1/6"> 🗺 Kilometers
      <span :class="athlete.scores.distanceTotal ? 'text-green-600': 'text-red-600'">️{{ athlete.scores.distanceTotal.toFixed(1) }} </span>
    </span>
    <span class="block border-r-1 border-gray-200 px-2 py-4 font-semibold w-1/6"> ⭐️ Stars
      <span :class="athlete.scores.stars ? 'text-green-600': 'text-red-600'">️{{ athlete.scores.stars ? athlete.scores.stars: 'pending' }} </span>
    </span>
    <span class="block border-r-1 border-gray-200 px-2 py-4 font-bold  text-xl w-1/6">
      <span :class="athlete.scores.total ? 'text-green-600': 'text-red-600'">️{{ athlete.scores.total.toFixed(1) }} </span>
    </span>
    <span class="block border-r-1 border-gray-200 px-2 py-4 text-gray-400 font-light text-xs w-1/6">Latest fetch {{ new Date(athlete.runningAppAuthentication.strava.latest_server_fetch*1000) }}</span>
  </div>
</template>

<script>
export default {
  name: 'LeaderEntry',
  props: {
    athlete: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>

</style>
