<template>
  <div class="flex flex-col items-center mx-2 sm:mx-5 w-1/8">
    <!-- medal -->
    <div
      class="rounded-full border-4 ring-4 p-6 sm:p-12 mb-2 bg-gradient-to-tr"
      :class="medal"
    >
      <component
        :is="mp.image"
        class="inline-block fill-current text-md font-extrabold w-48 h-48 p-4 filter blur-xl"
        :class="textColor"
      />
    </div>
    <!-- podium -->
    <div
      v-if="withPodium"
      class="border-4 rounded-lg shadow-lg w-full bg-gradient-to-tr "
      :class="podium"
    >
      <ul class="text-center py-2">
        <li class="text-2xl sm:text-6xl" :class="textColor">
          {{ mp.podiumTextTop }}
        </li>
        <li>
          {{ mp.podiumTextMiddle }}
        </li>
        <li class=" text-lg sm:text-2xl text-gray-700">
          {{ athlete.Meta.Fav ? athlete.Meta.Fav : '⁇' }} {{ athlete.Meta.Name ? athlete.Meta.Name : 'name missing' }}
        </li>
        <li v-for="index in podiumHeight" :key="index">
          <span class="text-white">- </span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>

import First from '~/assets/First.svg?inline'
import Second from '~/assets/Second.svg?inline'
import Third from '~/assets/Third.svg?inline'
import Allstars from '~/assets/Allstars.svg?inline'
import Overtaking from '~/assets/Overtaking.svg?inline'

const medalProperties = {
  1: {
    color: 'yellow-400',
    image: 'First',
    podiumHeight: 5,
    podiumTextTop: '1st',
    podiumTextMiddle: 'place'
  },
  2: {
    color: 'gray-400',
    image: 'Second',
    podiumHeight: 3,
    podiumTextTop: '2nd',
    podiumTextMiddle: 'place'
  },
  3: {
    color: 'yellow-700',
    image: 'Third',
    podiumHeight: 2,
    podiumTextTop: '3rd',
    podiumTextMiddle: 'place'
  },
  AllStars: {
    color: 'pink-400',
    image: 'Allstars',
    podiumTextTop: '⭐️',
    podiumTextMiddle: 'collected all stars'
  },
  MostKilometersWeek: {},
  MostStarsWeek: {},
  Default: {
    color: 'blue-400',
    image: 'Overtaking',
    podiumTextTop: '🦩',
    podiumTextMiddle: 'Awarded for participation'
  }
}

export default {
  name: 'Medal',
  components: { First, Second, Third, Allstars, Overtaking },
  props: {
    for: {
      type: String,
      default: 'Default'
    },
    athlete: {
      type: Object,
      required: true
    },
    withPodium: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    mp () {
      return medalProperties[this.for] ? medalProperties[this.for] : medalProperties.Default
    },
    baseColor () {
      return this.mp.color.split('-')[0]
    },
    medal () {
      return `from-${this.mp.color} via-white to-${this.baseColor}-200 ${this.textColor} border-${this.mp.color} ring-${this.mp.color}`
    },
    podium () {
      return `from-${this.baseColor}-200 via-${this.baseColor}-100 to-white border-${this.mp.color} ${this.textColor}`
    },
    podiumHeight () {
      return this.mp?.podiumHeight ? this.mp.podiumHeight : 1
    },
    textColor () {
      return `text-${this.mp.color}`
    }
  }

}
</script>
