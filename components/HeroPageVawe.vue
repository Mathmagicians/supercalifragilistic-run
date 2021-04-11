<template>
  <div
    :class=" isTop? '-mt-6 lg:-mt-12 lg:-mb-12': 'mb-4 lg:mb-8'"
    class="relative"
  >
    <img :src="imageUrl">
  </div>
</template>

<script>
export default {
  name: 'HeroPageWave',
  props: {
    imageUrl: {
      type: String,
      default: ''
    },
    isTop: {
      type: Boolean,
      default: false
    }
  }
}
</script>
