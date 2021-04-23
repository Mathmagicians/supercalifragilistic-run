<template>
  <div class="md:flex mb-6">
    <div class="md:w-1/3">
      <label class="block text-gray-600 font-bold md:text-left mb-3 md:mb-0 pr-4" :for="id">
        <slot name="label">
          {{ id.toUpperCase() }}
        </slot></label>
    </div>
    <div class="md:w-2/3">
      <slot
        :id="id"
        name="field"
      >
        field {{ id }}
      </slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FormRow',
  props: {
    id: {
      type: String,
      default: `form-row-${Math.floor(Math.random() * 101)}`
    }
  }
}
</script>

<style scoped>

</style>
