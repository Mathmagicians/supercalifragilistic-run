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
    <table class="table-auto border-collapse border-t-4 border-b-4 border-pink-400 text-gray-700 w-full">
      <thead class="font-semibold text-md sm:text-xl px-2 py-4 border-b-2 mx-2">
        <th>
          Position
        </th>
        <th>
          Fav
        </th>
        <th class="border-r-2 sm:border-none">
          Name
        </th>
        <th>
          Runs
        </th>
        <th>
          Bonus
        </th>
        <th class="break-words sm:break-normal mx-2">
          Kilometers
        </th>
        <th>
          Stars
        </th>
        <th class="border-r-2 border-l-2 sm:border-none">
          Score
        </th>
        <th>
          Latest Data Sync
        </th>
      </thead>
      <tbody class="mx-2 font-medium text-sm">
        <tr v-for="(athlete, key) in challenge.Athletes" :key="athlete.id">
          <td class="text-2xl sm:text-6xl text-right">
            {{ key + 1 }}
          </td>
          <td class="text-center px-2 sm:px-4 text-lg sm:text-md">
            {{ athlete.Meta.Fav ? athlete.Meta.Fav : '⁇' }}
          </td>
          <td class="text-center px-2 sm:px-4 border-r-2 sm:border-none">
            {{ athlete.Meta.Name ? athlete.Meta.Name : 'name missing' }}
          </td>
          <td class="text-right px-2 sm:px-4" :class="athlete.Runs ? 'text-green-600': 'text-red-600'">
            ️{{ athlete.Runs ? athlete.Runs.length : 0 }}
          </td>
          <td class="text-right px-2 sm:px-4" :class="athlete.Score.StartBonus ? 'text-green-600': 'text-red-600'">
            ️{{ athlete.Score.StartBonus }}
          </td>
          <td class="text-right px-2 sm:px-4" :class="athlete.Score.Kilometer ? 'text-green-600': 'text-red-600'">
            ️{{ athlete.Score.Kilometer.toFixed(1) }}
          </td>
          <td :class="athlete.Score.Stars ? 'text-green-600': 'text-red-600'" class="text-center px-2 sm:px-4">
            {{ athlete.Score.Stars ? athlete.Score.Stars : 'pending' }}
          </td>
          <td class="text-right px-2 sm:px-4 text-2xl sm:text-6xl border-l-2 border-r-2 sm:border-none" :class="athlete.Score.Total ? 'text-green-600': 'text-red-600'">
            ️{{ athlete.Score.Total.toFixed(1) }}
          </td>
          <td v-if="athlete.Meta.RapStatus" class="text-right text-sm text-gray-400">
            {{ athlete.Meta.LatestFetch | timeSince }}
          </td>
          <td v-else class="text-right text-xs text-gray-400">
            <p class="hidden sm:block">
              So sorry 🦩 ...
            </p>
            <p class="hidden sm:block">
              Can not show scores for user {{ athlete.Meta.Fav ? athlete.Meta.Fav : '⁇' }}
              {{ athlete.Meta.Name ? athlete.Meta.Name : 'name missing' }} .
            </p>
            <p> User needs to authorize data fetch from Strava.</p>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="flex flex-col">
      <leader-entry v-for="athlete in challenge.Athletes" :key="athlete.id" :athlete="athlete" />
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import SideBySideTextPictureCard from './layout-utils/SideBySideTextPictureCard'
import Overtaking from '~/assets/Overtaking.svg?inline'

export default {
  name: 'Leaderboard',
  components: { SideBySideTextPictureCard, Overtaking },
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
