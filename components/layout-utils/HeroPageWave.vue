<template>
  <div
    :class=" isTop? '-mt-4 lg:-mt-8 lg:-mb-8': 'mb-4 lg:mb-8'"
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
