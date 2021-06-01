<template>
  <div class="mt-6 mb-8 sm:mt-12 b-2 rounded-lg border-gray-200 p-4 flex flex-col items-center w-full">
    <div id="title" class="border-t-2 border-pink-400 mt-4 lg:m-t-8 h-32 flex flex-row p-2 ">
      <div>
        <h2 class="font-bold sm:font-extrabold text-4xl sm:text-8xl font-bold leading-tight text-gray-600 px-8">
          {{ number[0] }}
          <span v-if="number[1]>1" class="text-sm text-gray-400">/{{ number[1] }}</span>
        </h2>
      </div>
      <div
        v-for="s in stats"
        :key="s.title"
        class="border-r-2 text-pink-600 border-gray-100 px-1 sm:px-2 flex flex-col align-bottom"
      >
        <component
          :is="s.icon"
          size="2x"
          class="text-current"
        />
        <span v-if="s.title!=='When'" class="mt-4 text-md sm:text-lg text-gray-600">{{ s.value }}<span
          class="text-sm text-gray-400 px-1"
        >{{ s.unit }}</span></span>
        <span v-if="s.title==='When'" class="mt-4 text-md sm:text-lg text-gray-600"> {{ run.start_date | dateSince }}<span
          class="text-sm text-gray-400 px-1"
        >{{ s.unit }}</span></span>
        <span class="mt-2 text-xs text-gray-400">{{ s.title }}</span>
      </div>
    </div>

    <div id="map-wrap" style="height: 50vw; width: 80vw; overflow: hidden;">
      <client-only>
        <l-map :zoom="zoom" :center="center" :min-zoom="8" @ready="initMap">
          <l-tile-layer
            :url="url"
            :attribution="attribution"
          />
          <l-marker
            v-for="s in stars"
            :key="s.ID"
            :lat-lng="[s.Lat, s.Lang]"
            :icon="icon"
          >
            <l-popup>
              <h1>{{ s.Name }}️</h1>
              <p>({{ s.Lat }}, {{ s.Lang }})</p>
              <p>{{ s.Description }}</p>
            </l-popup>
          </l-marker>
          <l-marker
            :lat-lng="center"
            :icon="runnerIcon"
          />
          <l-polyline :lat-lngs="polyline.latlngs" :color="polyline.color" />
        </l-map>
      </client-only>
    </div>
    <ul>
      <li v-if="starVisits && starVisits.length>0" class="font-semibold capitalize">
        Visited stars
      </li>
      <li v-for="sv in starVisits" :key="sv.StarId+sv.RunId">
        ⭐ You found a <span v-if="sv.FirstTime" class="text-green-600">NEW </span> star at {{ sv.StarName }} <span class="text-xs text-gray-400">({{ sv.StarId }})</span>. Flyby distance was {{ (sv.Distance*1000).toFixed(0) }} m.
        <span v-if="!sv.FirstTime" class="text-gray-400">You have been here before, so no extra points 🦩</span>
      </li>
    </ul>
  </div>
</template>

<script>
import { StarIcon, MapIcon, ClockIcon, CalendarIcon, LightningBoltIcon } from '@vue-hero-icons/outline'
import { mapGetters, mapState } from 'vuex'

const polyUtil = require('polyline-encoded')

export default {
  name: 'Run',
  components: { StarIcon, MapIcon, ClockIcon, CalendarIcon, LightningBoltIcon },
  props: {
    run: {
      type: Object,
      default: null
    },
    number: {
      type: Array,
      required: true
    },
    starVisits: {
      type: Array,
      required: true
    },
    runValue: {
      type: Object,
      required: true
    },
    fav: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      attribution: '© <a href="http://osm.org/copyright">OpenStreetMap</a> | © <a href="https://www.mapbox.com/about/maps/">MapBox</a>',
      worldsNavel: [55.67644, 12.56824],
      url: this.$config.mapbox_url,
      icon: null,
      runnerIcon: null,
      polyline: {
        latlngs: [],
        color: 'DeepPink'
      }
    }
  },
  computed: {
    star () {
      return this.worldsNavel
    },
    center () {
      return this.run ? [this.run.start_latitude, this.run.start_longitude] : this.worldsNavel
    },
    zoom () {
      // 14 is a nice default zoom value, that shows a run of about 3-4 km on one map
      let z = 14
      if (this?.run?.distance) {
        z -= (Math.floor(Math.log2(this.run.distance)) - 11)
        console.log(this.run.distance, this.run.distance / 4, Math.floor(this.run.distance / 4))
      }
      return z
    },
    stats () {
      return [
        {
          title: 'Your went running',
          unit: '',
          value: this.run.name,
          icon: 'LightningBoltIcon'
        },
        {
          title: 'When',
          unit: '',
          value: '',
          icon: 'CalendarIcon'
        },
        {
          title: 'Average speed',
          unit: 'km/h',
          value: (this.run.average_speed * 3.6).toFixed(1),
          icon: 'ClockIcon'
        },
        {
          title: 'Pace',
          unit: 'min/km',
          value: (100 / (6 * this.run.average_speed)).toFixed(1),
          icon: 'ClockIcon'
        },
        {
          title: 'Distance',
          unit: 'km',
          value: (this.run.distance / 1000).toFixed(1),
          icon: 'MapIcon'
        },
        {
          title: 'Stars',
          unit: '',
          value: this.runValue.NewStars,
          icon: 'StarIcon'
        }
      ]
    },
    ...mapGetters({
      stars: 'challenge/getStars'
    })
  },
  methods: {

    initMap () {
      this.setIconStyles()
      this.decode()
    },

    setIconStyles () {
      // const iconsvg = '<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><text y="0.9em" font-size="90">⭐️</text></svg>'
      // this.icon = this.$L.icon({
      // iconUrl: require('~/assets/bw_star_marker.png')
      //  html: '⭐️',
      // iconUrl: 'data:image/svg+xml;base64,' + btoa(iconsvg)

      // })
      const starHtml = '<h1 style="font-size: 35px">⭐️</h1>'
      const favHtml = `<h1 style="font-size: 75px">${this.fav}</h1>`
      this.icon = this.$L.divIcon({ iconSize: [32, 32], iconAnchor: [16, 16 + 9], html: starHtml, className: 'mymarker' })
      this.runnerIcon = this.$L.divIcon({
        iconSize: [32, 32],
        iconAnchor: [16, 16 + 9],
        html: favHtml,
        className: 'mymarker'
      })
    },
    decode () {
      // const encoded = 'im}zFkjlCWpADBGHLBCUISIK@FCGKI[e@Om@KUC[EU@CJHCc@GM?Y@@@ABHALHB\\\\GNAPGNSZQf@Af@ICDDA?BNA?HLPXDl@Qb@UHBVn@NVRR`@HJFpBnC^^LXHh@JVVZVBNHdABRD`A@h@C@?C@D?fAe@ZELBPNTFf@A`@JFANDDARJl@p@Pj@HFLAHDHL@NAKDCBVRp@A@JTRTVPZh@BHFD^p@@DCL@RDV?NRLHLLh@HJRh@JNZx@Hp@BH?PCRCEDa@DM@KGQ?QK_@m@{AWw@U_@KW@WKe@O_@MMc@y@gAqAEM?IQ]C?SOIC_@o@IEa@e@_@OMA?@MGC@M?A@E?CDQKm@SKMG?M?GB?AIHOBs@\\\\UA_@DUEI@q@AI@ME_@A_@GC@E?UOIQOs@We@q@y@}@wAIGU]SGIAWMa@k@O]@QDCLWGSIA[Ha@@GBONKDICGKI_@Eu@YaBAUDSHgBHe@@k@TwAH[Hs@b@m@Ty@HMRk@l@}@E?EBGLWRGJ]|@Sv@MTMJEJGZK~@M`@Ij@S|BEz@En@Z`BLfADNHNAHEBIJq@FO?KBc@AWP[DEDUBOFE@OICB?FHHEJ?LCDDFABGCAH@XD`@AL@PDF@LHJ@HDJf@j@DCB@@JABHF?D?CMOm@_@IFE@BHCFO?Qb@MPOx@Iz@FPBA@DAEE@r@R'
      if (this.run.summary_polyline) {
        this.polyline.latlngs = polyUtil.decode(this.run.summary_polyline)
        console.info('polyline decoded', this.polyline.latlngs)
      }
    }
  }
}
</script>

<style scoped>
.mymarker {
  font-size: 75px;
}
</style>
