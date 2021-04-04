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
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style>

.container {
@apply min-h-screen flex justify-center items-center text-center mx-auto;
}
</style>
