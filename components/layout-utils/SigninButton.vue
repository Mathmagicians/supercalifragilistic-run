<template>
  <hero-button :color-change="changeColor" @click="login">
    🦩 Sign up !
  </hero-button>
</template>

<script>
import HeroButton from './HeroButton'

export default {
  name: 'SigninButton',
  components: { HeroButton },
  props: {
    changeColor: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    login () {
      this.$auth.loginWith('awsCognito')
    }
  }
}
</script>
