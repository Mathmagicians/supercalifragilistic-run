<template>
  <div>
    <p>Engineering</p>
    <p>
      Received from server: {{ fromLambda }}
    </p>
    <p>
      Lambda url is: {{ $config.axios.baseUrl }}
    </p>
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
    this.fromLambda = await this.$axios.$get('/')
  }

}

</script>
