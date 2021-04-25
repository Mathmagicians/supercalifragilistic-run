<template>
  <basic-page-layout>
    <div v-if="!loggedIn">
      <page-section-title>Sign up to be a supercalifragilistic 🦩</page-section-title>
      <signin-button @click="login" />
    </div>
    <div v-else>
      <page-section-title>Welcome, {{ profileName }} 🦩</page-section-title>
      <p> You are signed in, have fun ...</p>
      <hero-button @click="logout">
        Sign out
      </hero-button>
    </div>
  </basic-page-layout>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import PageSectionTitle from '../components/layout-utils/PageSectionTitle'
import BasicPageLayout from '../components/layout-utils/BasicPageLayout'
import HeroButton from '../components/layout-utils/HeroButton'
import SigninButton from '../components/layout-utils/SigninButton'

export default {
  name: 'Login',
  auth: false,
  components: { SigninButton, HeroButton, BasicPageLayout, PageSectionTitle },
  computed: {
    ...mapState({
      loggedIn: state => state.auth.loggedIn
    }),
    ...mapGetters(['profileName'])
  },
  methods: {
    login () {
      this.$auth.loginWith('awsCognito')
    },
    logout () {
      this.$auth.logout()
    }
  }
}
</script>

<style scoped>

</style>
