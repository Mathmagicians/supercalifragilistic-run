<template>
  <div
    :class="reverse ? 'md:flex-row-reverse flex-col-reverse' : 'md:flex-row flex-col'"
    class="flex flex-wrap"
  >
    <div class="w-5/6 sm:w-1/2 p-8">
      <h3 class="text-3xl text-gray-800 font-bold leading-none mb-3">
        {{ title }}
      </h3>
      <p class="text-gray-600 my-8">
        <slot />
      </p>
    </div>
    <div class="w-full sm:w-1/2 p-6 mt-6">
      <img v-if="imageUrl" :src="imageUrl">
      <span v-if="heroName">{{ heroName }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SideBySideTextPictureCard',
  props: {
    title: {
      type: String,
      default: 'title'
    },
    imageUrl: {
      type: String,
      default: ''
    },
    heroName: {
      type: String,
      default: ''
    },
    reverse: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style scoped>

</style>
