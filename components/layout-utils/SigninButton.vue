<template>
  <div>
    <hero-button v-if="!loggedIn" :color-change="changeColor" @click="login">
      🦩 Sign in !
    </hero-button>
    <nuxt-link v-else to="/challenge">
      <hero-button>
        🦩 Check out the challenges, and join the fun!
      </hero-button>
    </nuxt-link>
  </div>
</template>

<script>
import { mapState } from 'vuex'
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
  computed: {
    ...mapState({
      loggedIn: state => state.auth.loggedIn
    })
  },
  methods: {
    login () {
      this.$auth.loginWith('awsCognito')
    }
  }
}
</script>
