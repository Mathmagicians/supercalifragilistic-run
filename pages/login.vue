<template>
  <basic-page-layout>
    <page-section-title>Sign up to be a supercalifragilistic 🦩</page-section-title>
    <signin-button v-if="!loggedIn" @click="login">
      hero sign in
    </signin-button>
    <div v-else>
      <p> Welcome, you are signed in ...</p>
      <hero-button @click="logout">
        Log out
      </hero-button>
    </div>
  </basic-page-layout>
</template>

<script>
import PageSectionTitle from '../components/layout-utils/PageSectionTitle'
import BasicPageLayout from '../components/layout-utils/BasicPageLayout'
import HeroButton from '../components/layout-utils/HeroButton'
import SigninButton from '../components/layout-utils/SigninButton'

export default {
  name: 'Login',
  auth: false,
  components: { SigninButton, HeroButton, BasicPageLayout, PageSectionTitle },
  data () {
    return {
      loggedIn: false
    }
  },
  created () {
    this.loggedIn = !!this.$auth.strategy.token.get()
  },
  methods: {
    login () {
      console.log('Trying to log in')
      this.$auth.loginWith('awsCognito')
    },
    logout () {
      console.log('Logging out ...')
      this.$auth.logout()
    }
  }
}
</script>

<style scoped>

</style>
