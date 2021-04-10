<template>
  <div>
    <p>Run component</p>

    <div id="map-wrap" class="min-w-1/2 w-1/2" style="height: 100vh; width: 100vh;">
      <client-only>
        <l-map :zoom="13" :center="[55.9464418,8.1277591]">
          <l-tile-layer url="http://{s}.tile.osm.org/{z}/{x}/{y}.png" />
          <l-marker :lat-lng="[55.9464418,8.1277591]" />
        </l-map>
      </client-only>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Run'
}
</script>

<style scoped>

</style>
