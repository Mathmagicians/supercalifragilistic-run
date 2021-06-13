<template>
  <div
    class="flex flex-col items-center mx-2 sm:mx-5 "
    :class="withPodium ? 'w-1/8' : 'w-18 h-18 sm:w-26 sm:h-26'"
  >
    <div
      class="overflow-hidden rounded-full  mb-2 transform transition hover:scale-125 hover:-rotate-12 hover:-translate-y-20 duration-500 ease-in-out bg-gradient-to-tr"
      :class="`${withPodium? 'border-4 ring-4 p-6 sm:p-12': 'border-2 p-2 sm:p-3'} ${mp.mg} ${mp.text} ${mp.border} ${mp.ring}`"
    >
      <component
        :is="mp.image"
        class="inline-block fill-current text-md font-extrabold  p-4 "
        :class="`${mp.text} ${withPodium ? 'w-24 h-24 sm:w-48 sm:h-48' : 'w-16 h-16 sm:w-24 sm:h-24'}`"
      />
    </div>

    <div
      v-if="withPodium"
      class="border-4 rounded-lg shadow-lg w-full bg-gradient-to-t from-pink-200 via-pink-100 to-white"
      :class="mp.text"
    >
      <ul class="text-center py-2">
        <li class="text-2xl sm:text-6xl" :class="mp.text">
          {{ mp.podiumTextTop }}
        </li>
        <li>
          {{ mp.podiumTextMiddle }}
        </li>
        <li v-for="index in podiumHeight" :key="index">
          <span class="text-white">- </span>
        </li>
        <li class=" text-lg sm:text-2xl text-gray-700">
          {{ athlete.Meta.Fav ? athlete.Meta.Fav : '⁇' }} {{ athlete.Meta.Name ? athlete.Meta.Name : 'name missing' }}
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
import SuperRun from '~/assets/Super-run.svg?inline'

const medalProperties = {
  1: {
    color: 'yellow-400',
    mg: 'from-yellow-100 via-white to-yellow-400',
    text: 'text-yellow-400',
    border: 'border-yellow-400',
    ring: 'ring-yellow-200',
    image: 'First',
    podiumHeight: 5,
    podiumTextTop: '1st',
    podiumTextMiddle: 'place'
  },
  2: {
    color: 'gray-400',
    mg: 'from-gray-100 via-white to-gray-400',
    text: 'text-gray-400',
    border: 'border-gray-400',
    ring: 'ring-gray-200',
    image: 'Second',
    podiumHeight: 3,
    podiumTextTop: '2nd',
    podiumTextMiddle: 'place'
  },
  3: {
    color: 'yellow-700',
    mg: 'from-yellow-500 via-white to-yellow-700',
    text: 'text-yellow-700',
    border: 'border-yellow-700',
    ring: 'ring-yellow-200',
    image: 'Third',
    podiumHeight: 2,
    podiumTextTop: '3rd',
    podiumTextMiddle: 'place'
  },
  AllStars: {
    color: 'pink-400',
    mg: 'from-pink-100 via-white to-pink-400',
    text: 'text-pink-400',
    border: 'border-pink-400',
    ring: 'ring-pink-100',
    image: 'Allstars',
    podiumTextTop: '⭐️',
    podiumTextMiddle: 'collected all stars'
  },
  WeekWithMostKms: {
    color: 'blue-400',
    mg: 'from-pink-100 via-white to-blue-400',
    text: 'text-blue-400',
    border: 'border-blue-400',
    ring: 'ring-blue-100',
    image: 'Overtaking',
    podiumTextTop: '⭐️',
    podiumTextMiddle: 'Most Kilometers in a Week'
  },
  WeekWithMostStars: {
    color: 'pink-400',
    mg: 'from-pink-100 via-white to-blue-400',
    text: 'text-blue-400',
    border: 'border-pink-400',
    ring: 'ring-pink-100',
    image: 'SuperRun',
    podiumTextTop: '⭐️',
    podiumTextMiddle: 'Most Stars in a Week'
  },
  Default: {
    color: 'pink-400',
    mg: 'from-pink-100 via-white to-pink-400',
    text: 'text-pink-400',
    border: 'border-pink-400',
    ring: 'ring-pink-100',
    image: 'Overtaking',
    podiumTextTop: '🦩',
    podiumTextMiddle: 'Awarded for participation'
  }
}

export default {
  name: 'Medal',
  components: { First, Second, Third, Allstars, Overtaking, SuperRun },
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
    podiumHeight () {
      return this.mp?.podiumHeight ? this.mp.podiumHeight : 1
    }
  }

}
</script>
