<template>
  <div class="container">
    <div>
      <img src="~/assets/Super-run.svg">
      <h1 class="title">
        supercalifragilistic-run
      </h1>
      <h2>
        Lambda url is: {{ $config.axios.baseUrl }}
      </h2>
      <p>
        Received from server: {{ fromLambda }}
      </p>
    </div>
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
    console.log('fetching data from ', this.$axios)
    const res = await this.$axios.$get('/')
    this.fromLambda = res
  }

}

</script>

<style>

.container {
  @apply min-h-screen flex justify-center items-center text-center mx-auto;
}
</style>
