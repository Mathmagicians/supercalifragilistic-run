<template>
  <basic-page-layout>
    <page-section-title>Sign up to be a supercalifragilistic 🦩</page-section-title>
    <signin-button v-if="!loggedIn" @click="login" />
    <div v-else>
      <p> Logging in ...</p>
    </div>
    <!-- debugging -->
    User:
    <hero-button @click="$auth.fetchUser()">
      Fetch user
    </hero-button>
    <hero-button @click="$auth.strategy.token.get()">
      get token
    </hero-button>
  </basic-page-layout>
</template>

<script>
import PageSectionTitle from '../components/layout-utils/PageSectionTitle'
import BasicPageLayout from '../components/layout-utils/BasicPageLayout'
import SigninButton from '../components/layout-utils/SigninButton'
import HeroButton from '../components/layout-utils/HeroButton'

export default {
  name: 'Login',
  components: { HeroButton, SigninButton, BasicPageLayout, PageSectionTitle },
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
