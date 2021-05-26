<template>
  <div class="w-full ">
    <page-section-title>
      {{ myAthlete.Meta.Fav }} {{ myAthlete.Meta.Name }}'s Running Efforts
    </page-section-title>
    <p class="text-xs text-gray-400 ">
      Data fetched {{ myAthlete.Meta.LatestFetch | timeSince }}
    </p>
    <leaderboard :athletes="[myAthlete]" />
    <div class="flex flex-col sm:flex-row flex-wrap">
      <div v-for="(e, k) in myAthlete.Events" :key="e.Date">
        <div class="bg-gray-900 text-white text-3xl my-4 text-current p-overflow-hidden">
          <h2 class="p-2 text-center">
            <CalendarIcon size="1.5x" class="inline-block" /> Run Day {{ myAthlete.Events.length - k }} ✨ {{ e.Date }}
            ✨  <LightningBoltIcon size="1.5x" class="inline-block" /> Runs {{ e.Runs.length }}
            ✨ <CalculatorIcon size="1.5x" class="inline-block" />
            Score {{ (e.Score.Total).toFixed(0) }}
            ✨ <MapIcon size="1.5x" class="inline-block" />
            Distance {{ (e.Score.KmsTotal).toFixed(1) }} km
            ✨ <StarIcon size="1.5x" class="inline-block" />
            Stars {{ e.Score.StarsCollected }}
          </h2>
        </div>
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
</template>

<script>
import { mapGetters } from 'vuex'
import { StarIcon, MapIcon, CalendarIcon, LightningBoltIcon, UserIcon, CloudDownloadIcon, CalculatorIcon, ClipboardListIcon } from '@vue-hero-icons/outline'
import PageSectionTitle from './layout-utils/PageSectionTitle'

export default {
  name: 'MyRuns',
  components: { PageSectionTitle, CalendarIcon, LightningBoltIcon, MapIcon, CalculatorIcon, StarIcon },
  computed: {
    ...mapGetters({
      myAthlete: 'challenge/getMyAthlete'
    })

  }
}
</script>

<style scoped>

</style>
