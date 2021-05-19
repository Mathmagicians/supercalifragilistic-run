<template>
  <div class="m-4 b-2 rounded-lg border-gray-200 p-4 flex flex-col items-center">
    <div id="title" class="border-t-2 border-pink-400 mt-4 lg:m-t-8 h-32 flex flex-row p-2 ">
      <div v-for="s in stats" :key="s.title" class="border-r-2 text-pink-600 border-gray-100 px-2 flex flex-col align-baseline">
        <component
          :is="s.icon"
          size="2.5x"
          class="text-current"
        />
        <span v-if="s.title!=='When'" class="mt-4 text-lg text-gray-600">{{ s.value }}<span class="text-sm text-gray-400 px-1">{{ s.unit }}</span></span>
        <span v-if="s.title==='When'" class="mt-4 text-lg text-gray-600"> {{ run.start_date | dateSince }}<span class="text-sm text-gray-400 px-1">{{ s.unit }}</span></span>
        <span class="mt-2 text-xs text-gray-400">{{ s.title }}</span>
      </div>
    </div>

    <div id="map-wrap" style="height: 30vw; width: 40vw; overflow: hidden;">
      <client-only>
        <l-map :zoom="14" :center="center" @ready="initMap">
          <l-tile-layer
            :url="url"
            :attribution="attribution"
          />
          <l-marker
            :lat-lng="star"
            :icon="icon"
          >
            <l-popup>
              <p>Hello, this is a star ⭐created by 🥦 ️</p>
              <p>{{ center }}</p>
            </l-popup>
          </l-marker>
          <l-polyline :lat-lngs="polyline.latlngs" :color="polyline.color" />
        </l-map>
      </client-only>
    </div>
  </div>
</template>

<script>
import { StarIcon, MapIcon, ClockIcon, CalendarIcon, LightningBoltIcon } from '@vue-hero-icons/outline'
const polyUtil = require('polyline-encoded')

export default {
  name: 'Run',
  components: { StarIcon, MapIcon, ClockIcon, CalendarIcon, LightningBoltIcon },
  props: {
    run: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      attribution: '© <a href="http://osm.org/copyright">OpenStreetMap</a> contributors |',
      worldsNavel: [55.67644, 12.56824],
      url: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
      icon: null,
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
          value: this.run.distance,
          icon: 'MapIcon'
        },
        {
          title: 'Stars',
          unit: '',
          value: 12,
          icon: 'StarIcon'
        }
      ]
    }
  },
  methods: {

    initMap () {
      this.setIconStyles()
      this.decode()
    },

    setIconStyles () {
      this.icon = this.$L.icon({
        iconUrl: require('~/assets/bw_star_marker.png')
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

</style>
