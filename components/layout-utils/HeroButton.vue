<template>
  <button
    class="mx-auto lg:mx-0 hover:underline  font-bold rounded-full my-6 py-4 px-8 shadow-lg
    focus:outline-none focus:shadow-outline
    transform transition hover:scale-105 duration-300 ease-in-out"
    :class="colorChange ? 'gradient text-white' : 'bg-white text-gray-800' "
    @click="$emit('click')"
  >
    <slot />
  </button>
</template>
<script>
export default {
  name: 'HeroButton',
  props: {
    colorChange: {
      type: Boolean,
      default: false
    }
  }
}
</script>
