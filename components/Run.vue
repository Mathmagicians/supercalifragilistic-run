<template>
  <div>
    <h2 class="text-2xl text-bold text-gray-800">
      Run
    </h2>

    <div id="map-wrap" class="min-w-1/2 w-1/2" style="height: 50vw; width: 50vw; overflow: auto;">
      <client-only>
        <l-map :zoom="13" :center="center">
          <l-tile-layer url="http://{s}.tile.osm.org/{z}/{x}/{y}.png" />
          <l-marker :lat-lng="[55.9464418,8.1277591]" />
        </l-map>
      </client-only>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Run',
  data () {
    return {
      center: '[41.279736, 0.723744]'
    }
  }
}
</script>

<style scoped>

</style>
