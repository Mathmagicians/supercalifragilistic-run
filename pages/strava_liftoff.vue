<template>
  <div>
    Now we need to have strava authorization... redirecting
  </div>
</template>

<script>
export default {
  name: 'StravaLanding',

  asyncData (ctx) {
    console.log('redirecting to strava', ctx)
    ctx.redirect(ctx.$config.strava_authorize_url)
    this.pending = false
    return {}
  }
}
</script>

<style scoped>

</style>
