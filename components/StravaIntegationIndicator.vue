<template>
  <div class="flex flex-col sm:flex-row align-middle w-full shadow-lg rounded-xl p-2">
    <div class="flex flex-col items-center  justify-center border-b-2 sm:border-r-2 sm:border-b-0 border-gray-200 max-w-1/3 mx-2">
      <CheckCircleIcon size="6x" class="text-current text-md sm:text-lg font-semibold" :class="canUseStrava ? 'text-green-600': 'text-gray-400'" />
      <img class="block p-2" src="https://upload.wikimedia.org/wikipedia/commons/c/cb/Strava_Logo.svg">
      <h4 class="font-semibold p-2">
        Integration Status
      </h4>
      <nuxt-link v-if="!canUseStrava" to="strava_liftoff" class="center px-2 m-t-24">
        <hero-button class="border-green-400 border-2 hover:ring-4 hover:ring-green-600">
          Authorize data access
          <img class="block p-2" src="https://upload.wikimedia.org/wikipedia/commons/c/cb/Strava_Logo.svg">
        </hero-button>
      </nuxt-link>
      <hero-button
        v-if="canUseStrava"
        class="border-red-500 border-2 bg-red-400 text-white hover:ring-2 hover:ring-red-600 center px-2 m-t-24 mx-4"
        @click="revokeStravaAccess()"
      >
        Revoke data access
      </hero-button>
    </div>

    <ul v-if="showDetails ">
      <li v-for="item in items" :key="item.slotName" class="text-base mx-2 my-1">
        <component
          :is="item.icon"
          size="2x"
          class="text-current text-md sm:text-lg font-semibold"
          :class="item.isOk ? 'text-green-600': 'text-gray-400'"
        />
        <div class="flex flex-col flex-auto">
          <span class="block font-semibold text-base">{{ item.text }}</span>
          <span class="block font-light text-gray-400 text-sm overflow-ellipsis">{{ item.value }}</span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { CheckCircleIcon, KeyIcon, IdentificationIcon, ClockIcon } from '@vue-hero-icons/outline'
import { mapActions, mapGetters, mapState } from 'vuex'
import HeroButton from './layout-utils/HeroButton'

export default {
  name: 'StravaIntegationIndicator',
  components: { HeroButton, CheckCircleIcon, KeyIcon, IdentificationIcon, ClockIcon },
  props: {
    showDetails: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    ...mapGetters(['profileName', 'canUseStrava', 'hasStravaAuthorizationCode', 'hasStravaRefreshToken', 'hasStravaAccessToken', 'hasRequestedScopes', 'isStravaAccessTokenValid']),
    items () {
      return [
        {
          text: 'Authorization code',
          isOk: this.hasStravaAuthorizationCode,
          icon: 'KeyIcon',
          value: this.hasStravaAuthorizationCode ? `${this.authorization_code()}, issued at ${this.authorization_time()}` : 'missing'
        },
        {
          text: 'Granted scopes',
          isOk: this.hasRequestedScopes,
          icon: 'IdentificationIcon',
          value: this.hasRequestedScopes ? this.scopes() : 'missing'
        },
        {
          text: 'Refresh token',
          isOk: this.hasStravaRefreshToken,
          icon: 'KeyIcon',
          value: this.hasStravaRefreshToken ? this.refresh_token() : 'missing'
        },
        {
          text: 'Access Token',
          isOk: this.hasStravaAccessToken,
          icon: 'KeyIcon',
          value: this.hasStravaAccessToken ? this.access_token() : 'missing'
        },
        {
          text: 'Token valid until',
          isOk: this.isStravaAccessTokenValid,
          icon: 'ClockIcon',
          value: this.isStravaAccessTokenValid ? this.expires_at() : `expired at ${this.expires_at()}`
        }
      ]
    }
  },
  methods: {
    // ...mapState({ strava: state => state.profile.runningAppAuthentication.strava }),
    ...mapGetters(['authorization_code', 'authorization_time', 'scopes', 'refresh_token', 'access_token', 'expires_at']),
    ...mapActions(['revokeStravaAccess'])
  }
}
</script>

<style scoped>

</style>
