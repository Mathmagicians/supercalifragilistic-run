<template>
  <basic-page-layout>
    <page-section-title>Sign up to be a supercalifragilistic 🦩</page-section-title>
    <hero-button v-if="!loggedIn" @click="login">
      Login
    </hero-button>
    <div v-else>
      <p> Logging in ...</p>
    </div>
    <hero-button>Authenticate with Strava</hero-button>
  </basic-page-layout>
</template>

<script>
import PageSectionTitle from '../components/layout-utils/PageSectionTitle'
import HeroButton from '../components/HeroButton'
import BasicPageLayout from '../components/layout-utils/BasicPageLayout'

export default {
  name: 'Login',
  components: { BasicPageLayout, HeroButton, PageSectionTitle },
  layout: 'Unauthorized',
  data () {
    return {
      loggedIn: false
    }
  },
  created () {
    this.loggedIn = this.$auth.strategy.token.get()
  },
  methods: {
    login () {
      console.log('Trying to log in')
      this.$auth.loginWith('awsCognito')
    }
  }
}
</script>

<style scoped>

</style>
