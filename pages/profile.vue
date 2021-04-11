<template>
  <div class="">
    <card>
      Profile for Agata
    </card>
    <card>
      <run />
    </card>
    <p>Received from server ... {{ fromLambda }}</p>
  </div>
</template>

<script>
import Card from '../components/layout-utils/Card'
export default {
  components: { Card },
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
