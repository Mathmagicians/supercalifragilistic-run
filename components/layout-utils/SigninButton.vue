<template>
  <nuxt-link to="/login">
    <hero-button :color-change="!changeColor">
      🦩 Sign up !
    </hero-button>
  </nuxt-link>
</template>
<script>
import HeroButton from './HeroButton'

export default {
  name: 'SigninButton',
  components: { HeroButton },
  props: {
    changeColor: {}
  }
}
</script>
