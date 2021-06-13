<template>
  <div class="relative">
    <div v-if="showAthleteDetails" class="absolute inset-0 z-50 bg-gray-50 border-gray-200 ring-gray-400 ring-4 border-4 rounded-lg overflow-scroll">
      <hero-button @click="showAthleteDetails=false">
        🦩 Back
      </hero-button>
      <my-runs :my-athlete="selectedAthlete" />
    </div>
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
        <th class="w-1/12">
          <StarIcon size="1.5x" class="text-pink-600 inline-block" />
        </th>
        <th class="border-r-2 border-gray-200  w-1/12">
          <GiftIcon size="1.5x" class="text-pink-600 inline-block" />
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
        <th>
          Stars
        </th>
        <th class="border-r-2 border-gray-200">
          Awards
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
          <td class="text-center px-2 sm:px-4 text-lg sm:text-md table-cell ">
            <button
              class="hover:-rotate-6 hover:border-b-4 hover:border-pink-600 hover:scale-105 focus:outline-none focus:shadow-outline
    transform transition  duration-300 ease-in-out"
              @click="showDetails(athlete)"
            >
              {{ athlete.Meta.Fav ? athlete.Meta.Fav : '⁇' }} {{ athlete.Meta.Name ? athlete.Meta.Name : 'name missing' }}
            </button>
          </td>
          <td class="text-center px-2 sm:px-4 border-r-2 sm:border-none text-lg">
            {{ athlete.Score.RunDays }}
          </td>
          <td class="text-right px-2 sm:px-4" :class="athlete.Score.KmsTotal ? 'text-green-600': 'text-red-600'">
            ️{{ athlete.Score.KmsTotal.toFixed(0) }}
          </td>
          <td class="text-right px-2 sm:px-4 text-lg" :class="athlete.Score.StarsCollected ? 'text-green-600': 'text-red-600'">
            ️{{ athlete.Score.StarsCollected }}
          </td>
          <td class="text-right px-2 sm:px-4 text-lg border-gray-200 border-r-2 text-green-600 flex flex-row justify-end align-middle">
            <medal v-if="athlete.Score.AllStars" :with-podium="false" :athlete="athlete" for="AllStars" />
            <medal v-if="athlete.Score.WeekWithMostKms" :with-podium="false" :athlete="athlete" for="WeekWithMostKms" />
            <medal v-if="athlete.Score.WeekWithMostStars" :with-podium="false" :athlete="athlete" for="WeekWithMostStars" />
            <medal v-if="position(athlete.ProfileId) === 1" :with-podium="false" :athlete="athlete" :for="1" />
            <medal v-if="position(athlete.ProfileId) === 2" :with-podium="false" :athlete="athlete" :for="2" />
            <medal v-if="position(athlete.ProfileId) === 3" :with-podium="false" :athlete="athlete" :for="3" />
            <p v-if="athlete.Score.SpecialPrize">
              {{ athlete.Score.SpecialPrize }}
            </p>
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
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import { StarIcon, MapIcon, CalendarIcon, LightningBoltIcon, UserIcon, CloudDownloadIcon, CalculatorIcon, ClipboardListIcon, GiftIcon } from '@vue-hero-icons/outline'
import HeroButton from '@/components/layout-utils/HeroButton'

export default {
  name: 'Leaderboard',
  components: { StarIcon, MapIcon, CalendarIcon, UserIcon, CloudDownloadIcon, CalculatorIcon, ClipboardListIcon, GiftIcon, HeroButton },
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
  },
  data () {
    return {
      showAthleteDetails: false,
      selectedAthlete: null
    }
  },
  methods: {
    showDetails (athlete) {
      console.log('clicked a:', athlete)
      this.selectedAthlete = athlete
      this.showAthleteDetails = true
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
