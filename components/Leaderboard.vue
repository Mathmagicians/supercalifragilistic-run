<template>
  <div class="relative container max-w-full mx-auto m-8 min-h-screen items-center justify-center">
    <!-- container with scrolling ticker -->
    <side-by-side-text-picture-card :title="challenge.Name" sub-title="Leaderboard">
      <template #default>
        <h4 class="text-gray-600 text-md italic font-light">
          Motto: Crush your so-called peer-birds, and be the fastest flamingo in the flock
        </h4>
      </template>
      <template #info>
        <p> Challenge started {{ challenge.Start | timeSince }}</p>
        <p> Challenge ends in {{ challenge.End | timeSince }}</p>
      </template>
      <template #bottom>
        <Overtaking />
      </template>
    </side-by-side-text-picture-card>
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
        <th class="border-r-2 border-gray-200">
          <StarIcon size="1.5x" class="text-pink-600 inline-block" />
        </th>
        <th class="break-words sm:break-normal mx-2 ">
          Km
        </th>
        <th>
          Stars
        </th>
        <th>
          Starts
        </th>
        <th class="border-r-2 border-l-2 sm:border-none">
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
        <th class="border-r-2 border-gray-200 ">
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
      <tbody class="mx-2 font-medium text-sm sm:text-lg">
        <tr v-for="(athlete, key) in challenge.Athletes" :key="athlete.id" class="table-row">
          <td class="text-2xl sm:text-6xl text-right table-cell">
            {{ key + 1 }}
          </td>
          <td class="text-center px-2 sm:px-4 text-lg sm:text-md table-cell">
            {{ athlete.Meta.Fav ? athlete.Meta.Fav : '⁇' }} {{ athlete.Meta.Name ? athlete.Meta.Name : 'name missing' }}
          </td>
          <td class="text-center px-2 sm:px-4 border-r-2 sm:border-none text-lg">
            {{ athlete.Score.RunDays }}
          </td>
          <td class="text-right px-2 sm:px-4" :class="athlete.Score.KmsTotal ? 'text-green-600': 'text-red-600'">
            ️{{ athlete.Score.KmsTotal.toFixed(1) }}
          </td>
          <td class="text-right px-2 sm:px-4 border-r-2 border-gray-200 text-lg" :class="athlete.Score.StarsCollected ? 'text-green-600': 'text-red-600'">
            ️{{ athlete.Score.StarsCollected }}
          </td>
          <td class="text-right px-2 sm:px-4 text-lg" :class="athlete.Score.KmsTotal ? 'text-green-600': 'text-red-600'">
            ️{{ athlete.Score.KilometerBonus.toFixed(1) }}
          </td>
          <td :class="athlete.Score.StarsCollected ? 'text-green-600': 'text-red-600'" class="text-right px-2 sm:px-4 text-lg">
            {{ athlete.Score.StarBonus }}
          </td>
          <td :class="athlete.Score.RunDays ? 'text-green-600': 'text-red-600'" class="text-right px-2 sm:px-4 text-lg">
            {{ athlete.Score.StartBonus }}
          </td>
          <td class="text-right px-2 sm:px-4 text-2xl sm:text-6xl border-l-2 border-r-2 sm:border-none" :class="athlete.Score.RunDays ? 'text-green-600': 'text-red-600'">
            ️{{ athlete.Score.Total.toFixed(1) }}
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
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import { StarIcon, MapIcon, CalendarIcon, LightningBoltIcon, UserIcon, CloudDownloadIcon, CalculatorIcon, ClipboardListIcon } from '@vue-hero-icons/outline'
import SideBySideTextPictureCard from './layout-utils/SideBySideTextPictureCard'
import Overtaking from '~/assets/Overtaking.svg?inline'

export default {
  name: 'Leaderboard',
  components: { SideBySideTextPictureCard, Overtaking, StarIcon, MapIcon, CalendarIcon, UserIcon, CloudDownloadIcon, CalculatorIcon, ClipboardListIcon },
  computed: {
    ...mapGetters({
      athletes: 'challenge/getAthletes',
      challenge: 'challenge/getMyChallenge'
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
