<template>
  <basic-page-layout>
    <page-section-title>Sign up to be a supercalifragilistic 🦩</page-section-title>
    <hero-button v-if="!loggedIn" @click="login">
      hero sign in
    </hero-button>
    <button v-if="!loggedIn" @click="login">
      regular button
    </button>
    <div v-else>
      <p> Logging in ...</p>
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

export default {
  name: 'Login',
  // auth: false,
  components: { HeroButton, BasicPageLayout, PageSectionTitle },
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
