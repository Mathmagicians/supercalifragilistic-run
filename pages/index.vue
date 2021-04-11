<template>
  <div>
    <hero />
  </div>
</template>

<script>
import Hero from '../components/Hero'

export default {
  components: { Hero },
  data () {
    return {
      fromLambda: {}
    }
  },

  async fetch () {
    const res = await this.$axios.$get('/')
    this.fromLambda = res
  }

}

</script>
