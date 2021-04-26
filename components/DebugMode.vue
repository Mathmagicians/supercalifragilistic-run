<template>
  <div>
    <div>
      <div
        class="relative inline-block w-10 mr-2 align-middle select-none transition duration-300 ease-in"
      >
        <input
          id="toggle"
          v-model="isOn"
          :class="toggleClass"
          type="checkbox"
          name="toggle"
          class="absolute block w-6 h-6 rounded-full bg-white border-4  cursor-pointer appearance-none"
        >
        <label for="toggle" :class=" isOn ? 'right-0 border-green-400 bg-green-500':'left-0 bg-gray-300 border-gray-200 '" class="block overflow-hidden h-6 rounded-full cursor-pointer" />
      </div>
      <label for="toggle" class="text-xs" :class="isOn?'text-green-400':'text-gray-700'">Debug mode {{ isOn? 'ON':'OFF' }}</label>
    </div>
    <div v-if="isOn">
      <ul v-if="$auth.user" class="mt-6 w-1/2 overflow-ellipsis text-xs text-left">
        <li>This is development mode. In case of error, note following:</li>
        <li>Visit from --{{ `device:\t ${$ua.deviceType()} os:\t ${$ua.os()}, browser:\t ${$ua.browser()}, browser version:\t ${$ua.browserVersion()}` }}</li>
        <li>{{ profileName }}, logged in!</li>
        <li> email {{ email }}</li>
        <li> userId {{ userName }}</li>
        <li> userId {{ userId }}</li>
      </ul>

      <h4>Dump of state</h4>
      <pre class="whitespace-pre text-left text-xs">
      <code>
        {{ state | pretty }}
      </code>
    </pre>
      <div />
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'

export default {
  name: 'DebugMode',
  data () {
    return {
      isOn: false,
      userAgent: 'unknown'
    }
  },
  computed: {
    ...mapState({
      loggedIn: state => state.auth.loggedIn,
      accessToken: state => state.auth.accessToken,
      email: state => state.auth.user.email,
      userName: state => state.auth.user.username,
      userId: state => state.auth.user.sub,
      state: state => state
    }),
    ...mapGetters(['profileImageUri', 'profileName']),
    toggleClass () { return (this.isOn) ? 'bg-green-400' : 'bg-gray-100' }
  },
  filters: {
    pretty (value) {
      return JSON.stringify(value, null, 4)
    }
  },
  methods: {
    toggle () { this.isOn = !this.isOn }
  }
  /* asyncData (ctx) {
    const deviceType = ctx.$ua.deviceType()
    const os = ctx.$ua.os()
    const browser = ctx.$ua.browser()
    const browserVersion = ctx.$ua.browserVersion()
    return { deviceType, os, browser, browserVersion }
  } */
}
</script>

<style scoped>

</style>
