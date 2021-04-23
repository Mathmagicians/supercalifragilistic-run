<template>
  <div class="flex flex-col sm:flex-row justify-center items-center min-h-full transform transition hover:border-b-8 hover:scale-105 hover:-rotate-6 duration-300 ease-in-out">
    <img
      v-if="imageUri"
      class="block w-16 h-16 object-cover object-top rounded-full ring-4 ring-pink-100 "
      :src="imageUri"
      :alt="name"
    >
    <UserIcon v-else size="8x" class="block text-gray-400 rounded-full ring-4 ring-pink-100 p-2" />
    <h6 v-if="name" class="uppercase text-xs mt-2 mx-2">
      {{ name }}
    </h6>
  </div>
</template>

<script>
import { UserIcon } from '@vue-hero-icons/outline'

export default {
  name: 'UserAvatar',
  components: { UserIcon },
  props: {
    imageUri: {
      type: String,
      default: null
    },
    name: {
      type: String,
      default: null
    }
  }
}
</script>

<style scoped>

</style>
