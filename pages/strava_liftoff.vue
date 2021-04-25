<template>
  <div>
    Now we need to have strava authorization... redirecting
  </div>
</template>

<script>
export default {
  name: 'StravaLanding',

  asyncData (ctx) {
    ctx.redirect(ctx.$config.strava_authorize_url)
    return {}
  }
}
</script>

<style scoped>

</style>
