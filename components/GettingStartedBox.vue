<template>
  <div class="w-full md:w-1/3 p-6 flex flex-col flex-grow flex-shrink">
    <div class="flex-1 bg-white rounded-t rounded-b-none overflow-hidden shadow">
      <a href="#" class="flex flex-wrap no-underline hover:no-underline">
        <p class="w-full text-gray-600 text-xs md:text-sm px-6">
          {{ subtitle }}
        </p>
        <div class="w-full font-bold text-xl text-gray-800 px-6">
          {{ title }}
        </div>
        <p class="text-gray-800 text-base px-6 mb-5">
          <slot name="main"> info text
          </slot>
        </p>
      </a>
    </div>
    <div class="flex-none mt-auto bg-white rounded-b rounded-t-none overflow-hidden shadow p-6">
      <div class="flex items-center justify-start">
        <hero-button color-change="true">
          Action
        </hero-button>
      </div>
    </div>
  </div>
</template>
<script>
import HeroButton from './HeroButton'
export default {
  name: 'GettingStartedBox',
  components: { HeroButton },
  props: {
    title: {
      type: String,
      default: 'title'
    },
    subtitle: {
      type: String,
      default: 'subtitle'
    }
  }
}
</script>
