<template>
  <nuxt-link to="/profile?action=login">
    <hero-button :color-change="!changeColor" @click="login">
      🦩 Sign up !
    </hero-button>
  </nuxt-link>
</template>
<script>
import HeroButton from './HeroButton'

export default {
  name: 'SigninButton',
  components: { HeroButton },
  layout: 'Unauthorized',
  props: {
    changeColor: {}
  },
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
