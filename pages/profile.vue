<template>
  <div class="">
    <p>Received from server ... {{ fromLambda }}</p>
    <run />
  </div>
</template>

<script>
export default {
  data () {
    return {
      fromLambda: {}
    }
  },

  async fetch () {
    const res = await this.$axios.$get('/profile')
    this.fromLambda = res
  }

}

</script>
