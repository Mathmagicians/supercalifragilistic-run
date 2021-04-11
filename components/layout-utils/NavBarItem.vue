<template>
  <nuxt-link :to="link" class="block text-gray- font-semibold rounded hover:bg-gray-400 sm:ml-2 px-2">
    <slot />
  </nuxt-link>
</template>

<script>
export default {
  name: 'MenuItem',
  props: {
    link: {
      type: String,
      default: '#'
    }
  }
}
</script>

<style scoped>

</style>
