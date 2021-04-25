<template>
  <div class="flex flex-col sm:flex-row w-full shadow-lg rounded-xl p-2">
    <div class="flex flex-col items-center justify-center border-b-2 sm:border-r-2 sm:border-b-0 border-gray-200 max-w-1/3 mx-2">
      <CheckCircleIcon size="6x" class="text-current text-md sm:text-lg font-semibold" :class="canUseStrava ? 'text-green-600': 'text-gray-400'" />
      <h4 class="font-semibold p-2">
        Strava Integration
      </h4>
      <img class="block p-2" src="https://upload.wikimedia.org/wikipedia/commons/c/cb/Strava_Logo.svg">
    </div>
    <ul v-if="showDetails">
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
import { CheckCircleIcon, KeyIcon, IdentificationIcon } from '@vue-hero-icons/outline'
import { mapGetters, mapState } from 'vuex'

export default {
  name: 'StravaIntegationIndicator',
  components: { CheckCircleIcon, KeyIcon, IdentificationIcon },
  props: {
    showDetails: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    ...mapGetters(['profileName', 'canUseStrava', 'hasStravaAuthorizationCode', 'hasStravaRefreshToken', 'hasValidStravaAccessToken', 'hasRequestedScopes']),
    ...mapState({ strava: state => state.profile.runningAppAuthentication.strava }),
    items () {
      return [
        {
          text: 'Authorization code',
          isOk: this.hasStravaAuthorizationCode,
          icon: 'KeyIcon',
          value: this.hasStravaAuthorizationCode ? `${this.strava.authorizationCode}, issued at ${this.strava.authorization_time}` : 'missing'
        },
        {
          text: 'Granted scopes',
          isOk: this.hasRequestedScopes,
          icon: 'IdentificationIcon',
          value: this.hasRequestedScopes ? this.strava.scopes : 'missing'
        },
        {
          text: 'Refresh token',
          isOk: this.hasStravaRefreshToken,
          icon: 'KeyIcon',
          value: this.hasStravaRefreshToken ? this.strava.token.refresh_token : 'missing'
        },
        {
          text: 'Valid Access Token',
          isOk: this.hasValidStravaAccessToken,
          icon: 'KeyIcon',
          value: this.hasValidStravaAccessToken ? this.strava.token.access_token : 'missing'
        }
      ]
    }
  }
}
</script>

<style scoped>

</style>
