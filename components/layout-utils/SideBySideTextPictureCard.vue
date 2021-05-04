<template>
  <div
    :class="reverse ? 'md:flex-row-reverse flex-col-reverse' : 'md:flex-row flex-col' +' ' + border ? 'border-t-1 border-b-2':''"
    class="flex flex-wrap items-end"
  >
    <div class="w-5/6 sm:w-1/2 p-8">
      <h3 class="text-3xl text-gray-800 font-bold leading-none mb-3">
        {{ title }}
      </h3>
      <h4 class="text-xl text-gray-700 font-semibold leading-none mb-3">
        {{ subTitle }}
      </h4>
      <slot class="my-4 lg:my-8 ">
        <component
          :is="icon"
          v-if="icon"
          size="2x"
          class="text-current text-md sm:text-lg font-semibold"
          :class="!hasErrors ? 'text-green-600': 'text-red-600'"
        />
      </slot>
      <div
        v-if="hasErrors"
        class="border-4 py-2 border-red-600 text-sm text-gray-600 bg-gray-50 rounded-lg prose-sm my-4 lg:my-8"
      >
        <slot name="error" />
      </div>
      <div class="border-b-2 py-2 border-gray-200 text-sm text-gray-600 bg-gray-50 rounded-lg prose-sm my-4 lg:my-8">
        <slot name="info" />
      </div>
    </div>
    <div class="w-full sm:w-1/2 p-8">
      <slot name="bottom">
        <img v-if="imageUrl" :src="imageUrl">
      </slot>
    </div>
  </div>
</template>

<script>

import { KeyIcon, IdentificationIcon, UserAddIcon } from '@vue-hero-icons/outline'

export default {
  name: 'SideBySideTextPictureCard',
  components: { IdentificationIcon, KeyIcon, UserAddIcon },
  props: {
    title: {
      type: String,
      default: 'title'
    },
    subTitle: {
      type: String,
      default: ''
    },
    imageUrl: {
      type: String,
      default: ''
    },
    reverse: {
      type: Boolean,
      default: false
    },
    border: {
      type: Boolean,
      default: false
    },
    hasErrors: {
      type: Boolean,
      default: false
    },
    icon: {
      type: String,
      default: ''
    }
  }
}
</script>

<style scoped>

</style>
