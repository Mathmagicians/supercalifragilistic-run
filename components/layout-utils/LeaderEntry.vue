<template>
  <tr v-if="athlete.Meta.RapStatus" class=" border-t-2  border-gray-200 text-lg py-2 text-right w-full">
    <td> 1</td>
    <td>
      {{ athlete.Meta.Fav ? athlete.Meta.Fav : '⁇' }}
    </td>
    <td>
      {{ athlete.Meta.Name ? athlete.Meta.Name : 'name missing' }}
    </td>
    <td>
      🏃‍♂ Runs
      <span :class="athlete.Runs ? 'text-green-600': 'text-red-600'">️{{ athlete.Runs ? athlete.Runs.length: 0 }} </span>
    </td>
    <td>
      <span :class="athlete.Score.StartBonus ? 'text-green-600': 'text-red-600'">️{{ athlete.Score.StartBonus }} </span>
    </td>
    <td>
      <span :class="athlete.Score.Kilometer ? 'text-green-600': 'text-red-600'">️{{ athlete.Score.Kilometer.toFixed(1) }} </span>
    </td>
    <td>
      <span :class="athlete.Score.Stars ? 'text-green-600': 'text-red-600'">️{{ athlete.Score.Stars ? athlete.Score.Stars: 'pending' }} </span>
    </td>
    <td>
      <span :class="athlete.Score.Total ? 'text-green-600': 'text-red-600'">️{{ athlete.Score.Total.toFixed(1) }} </span>
    </td>
    <td>
      Latest data sync{{ athlete.Meta.LatestFetch | timeSince }}
    </td>
  </tr>
  <tr v-else>
    <td class="py-2 w-full">
      <span class="block border-r-1 border-gray-200 px-2 py-4 font-medium" />
      <span class="block border-r-1 border-gray-200 px-2 py-4" />
    </td>
  </tr>
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
