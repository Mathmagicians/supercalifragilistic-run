<template>
  <div class="w-full flex-col">
    <page-section-title>
      {{ myAthlete.Meta.Fav }} {{ myAthlete.Meta.Name }}'s Running Efforts
    </page-section-title>
    <p class="text-xs text-gray-400 text-current">
      <CloudDownloadIcon size="1.5x" class="inline-block" /> Data fetched {{ myAthlete.Meta.LatestFetch | timeSince }}
    </p>
    <leaderboard :athletes="[myAthlete]" class="my-2 sm:my-4" />
    <div class="flex flex-col">
      <div v-for="(e, k) in myAthlete.Events" :key="e.Date">
        <div
          class="bg-gray-900 text-white text-xl sm:text-3xl my-2 sm:my-4 text-current relative"
        >
          <button
            class="absolute left-2 bottom-2 sm:inset-y-2 opacity-25 p-0 m-0 ring-2 border-2 bg-gray-700 text-white border-white ring-gray-50
             font-bold rounded-full shadow-lg
              hover:underline  hover:opacity-90 hover:scale-125
              focus:outline-none focus:opacity-90
              transform transition  duration-300 ease-in-out
           "
            :class=" k === isVisibleIndex ? 'opacity-90 hover:-rotate-90' : 'hover:rotate-90'"
          >
            <chevron-right-icon v-if="k !== isVisibleIndex" size="1.5x" class="inline-block" @click="isVisibleIndex=k" />
            <chevron-down-icon v-if="k === isVisibleIndex" size="1.5x" class="inline-block" @click="isVisibleIndex=-1" />
          </button>
          <h2 class="p-4 sm:px-4 sm:py-8 text-center">
            <CalendarIcon size="1.5x" class="inline-block" /> Run Day {{ myAthlete.Events.length - k }} ✨ {{ e.Date }}
            ✨  <LightningBoltIcon size="1.5x" class="inline-block" /> Runs {{ e.Runs.length }}
            ✨ <CalculatorIcon size="1.5x" class="inline-block" />
            Score {{ (e.Score.Total).toFixed(0) }}
            ✨ <MapIcon size="1.5x" class="inline-block" />
            Distance {{ (e.Score.KmsTotal).toFixed(1) }} km
            ✨ <StarIcon size="1.5x" class="inline-block" />
            Stars {{ e.Score.StarsCollected }} ✨
          </h2>
        </div>
        <div v-if="k === isVisibleIndex">
          <run
            v-for="(aRun, j) in e.Runs"
            :key="aRun.id"
            :run="aRun.Run"
            :star-visits="aRun.StarVisits"
            :run-value="aRun.RunValue"
            :number="[myAthlete.Events.length - k, e.Runs.length - j]"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { StarIcon, MapIcon, CalendarIcon, LightningBoltIcon, UserIcon, CloudDownloadIcon, CalculatorIcon, ChevronRightIcon, ChevronDownIcon } from '@vue-hero-icons/outline'
import HeroButton from '@/components/layout-utils/HeroButton'
import PageSectionTitle from './layout-utils/PageSectionTitle'

export default {
  name: 'MyRuns',
  components: { PageSectionTitle, CalendarIcon, LightningBoltIcon, MapIcon, CalculatorIcon, StarIcon, CloudDownloadIcon, ChevronRightIcon, ChevronDownIcon },
  props: {
    myAthlete: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      isVisibleIndex: 0
    }
  }
}
</script>

<style scoped>

</style>
