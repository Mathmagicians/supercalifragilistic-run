<template>
  <div>
    <page-section-title>Your profile</page-section-title>
    <GettingStartedBox title="Basic profile info">
      name, gender, mail, picture (from facebook)
      <input :value="name" @input="name=event.target.valuegit ">
    </GettingStartedBox>
    <GettingStartedBox title="Authorize data access" subtitle="Authorize receiving data from your running app">
      <ul>
        <li>Please authorize Supercalifragilistic, to receive activity data from your running app.</li>
        <li>Supercalifragilistic will automatically synchronize data from your running application.</li>
        <li>We will compute your points for each run, and update the leaderboard. </li>
        <li>The only thing you have to remember, is to turn on your running app when your run 🦩.</li>
      </ul>

      We are currently only supporting Strava.
      <hero-button>
        Authorize Strava
        <img src="https://upload.wikimedia.org/wikipedia/commons/c/cb/Strava_Logo.svg">
      </hero-button>
    </GettingStartedBox>
  </div>
</template>

<script>
import PageSectionTitle from './layout-utils/PageSectionTitle'
import HeroButton from './HeroButton'
import GettingStartedBox from './GettingStartedBox'
export default {
  name: 'ProfileForm',
  components: { GettingStartedBox, HeroButton, PageSectionTitle },
  data () {
    return {
      profile: {
        name: '',
        mail: '',
        gender: '',
        profilePicture: '',
        badges: [],
        runs: [],
        runningAppAuthentication: {
          strava: {}
        },
        challenges: [],
        events: []
      }
    }
  }
}
</script>

<style scoped>

</style>
