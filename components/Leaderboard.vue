<template>
  <table class="table table-auto border-collapse border-t-4 border-b-4 border-pink-400 text-gray-700 w-full">
    <thead class="text-md sm:text-xl px-2 py-4 mx-2 text-current text-center text-pink-600">
      <th>
        <ClipboardListIcon size="1.5x" class="text-pink-600 inline-block" />
      </th>
      <th>
        <UserIcon size="1.5x" class="text-pink-600 inline-block" />
      </th>
      <th>
        <CalendarIcon size="1.5x" class="text-pink-600 inline-block" />
      </th>
      <th>
        <MapIcon size="1.5x" class="text-pink-600 inline-block" />
      </th>
      <th class="border-r-2 border-gray-200 w-1/12">
        <StarIcon size="1.5x" class="text-pink-600 inline-block" />
      </th>
      <th class="break-words sm:break-normal mx-2 w-1/12">
        Km
      </th>
      <th>
        Stars
      </th>
      <th>
        Starts
      </th>
      <th class="border-r-2 border-l-2 sm:border-none w-1/8">
        <CalculatorIcon size="1.5x" class="text-pink-600 inline-block" />
      </th>
      <th>
        <CloudDownloadIcon size="1.5x" class="text-pink-600 inline-block" />
      </th>
    </thead>
    <thead class="font-extralight text-xs sm:text-sm px-1 py-1 border-b-2 mx-2 text-gray-400 whitespace-normal text-center">
      <th>
        Position
      </th>
      <th>
        Athlete
      </th>
      <th>
        Run Days
      </th>
      <th>
        Distance
      </th>
      <th class="border-r-2 border-gray-200">
        Stars
      </th>
      <th>
        Km Bonus
      </th>
      <th>
        Star Bonus
      </th>
      <th>
        Start Bonus
      </th>
      <th>
        Total
      </th>
      <th>
        Sync
      </th>
    </thead>
    <tbody v-if="athletes" class="mx-2 font-medium text-sm sm:text-lg">
      <tr v-for="(athlete) in athletes" :key="athlete.id" class="table-row">
        <td class="text-2xl sm:text-6xl text-right table-cell">
          {{ position(athlete.ProfileId) }}
        </td>
        <td class="text-center px-2 sm:px-4 text-lg sm:text-md table-cell">
          {{ athlete.Meta.Fav ? athlete.Meta.Fav : '⁇' }} {{ athlete.Meta.Name ? athlete.Meta.Name : 'name missing' }}
        </td>
        <td class="text-center px-2 sm:px-4 border-r-2 sm:border-none text-lg">
          {{ athlete.Score.RunDays }}
        </td>
        <td class="text-right px-2 sm:px-4" :class="athlete.Score.KmsTotal ? 'text-green-600': 'text-red-600'">
          ️{{ athlete.Score.KmsTotal.toFixed(0) }}
        </td>
        <td class="text-right px-2 sm:px-4 border-r-2 border-gray-200 text-lg" :class="athlete.Score.StarsCollected ? 'text-green-600': 'text-red-600'">
          ️{{ athlete.Score.StarsCollected }}
        </td>
        <td class="text-right px-2 sm:px-4 text-lg" :class="athlete.Score.KmsTotal ? 'text-green-600': 'text-red-600'">
          ️{{ athlete.Score.KilometerBonus.toFixed(0) }}
        </td>
        <td :class="athlete.Score.StarsCollected ? 'text-green-600': 'text-red-600'" class="text-right px-2 sm:px-4 text-lg">
          {{ athlete.Score.StarBonus }}
        </td>
        <td :class="athlete.Score.RunDays ? 'text-green-600': 'text-red-600'" class="text-right px-2 sm:px-4 text-lg">
          {{ athlete.Score.StartBonus }}
        </td>
        <td class="text-right px-2 sm:px-4 text-2xl sm:text-6xl border-l-2 border-r-2 sm:border-none" :class="athlete.Score.RunDays ? 'text-green-600': 'text-red-600'">
          ️{{ athlete.Score.Total.toFixed(0) }}
        </td>
        <td v-if="athlete.Meta.RapStatus" class="text-right text-xs text-gray-400">
          {{ athlete.Meta.LatestFetch | timeSince }}
        </td>
        <td v-else class="text-right text-xs text-gray-400">
          <p class="hidden sm:block">
            So sorry 🦩 ...
          </p>
          <p class="hidden sm:block">
            Can not show scores
          </p>
          <p>Strava not authorized</p>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import { StarIcon, MapIcon, CalendarIcon, LightningBoltIcon, UserIcon, CloudDownloadIcon, CalculatorIcon, ClipboardListIcon } from '@vue-hero-icons/outline'

export default {
  name: 'Leaderboard',
  components: { StarIcon, MapIcon, CalendarIcon, UserIcon, CloudDownloadIcon, CalculatorIcon, ClipboardListIcon },
  props: {
    athletes: {
      type: Array,
      required: true
    }
  },
  computed: {
    ...mapGetters({
      challenge: 'challenge/getMyChallenge',
      position: 'challenge/getAthletePosition'
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
