<template>
  <div>
    <h1 class="w-full my-2 text-5xl font-bold leading-tight text-center text-gray-800 text-center">
      <slot />
    </h1>
    <div class="w-full mb-4">
      <div class="h-1 mx-auto gradient w-64 opacity-25 my-0 py-0 rounded-t" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'PageSectionTitle'
}
</script>

<style scoped>

</style>
