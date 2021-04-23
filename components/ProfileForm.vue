<template>
  <div>
    <page-section-title>Your profile</page-section-title>
    <GettingStartedBox title="Basic profile info 🦩" subtitle="We take care of your data and your privacy">
      <template #main>
        name, gender, mail, picture (from facebook)

        Email is: {{ email }}, userId is: {{ userId }}, logged in {{ loggedIn }}
        <!-- name -->
        <div class="md:flex mb-6">
          <div class="md:w-1/3">
            <label class="block text-gray-600 font-bold md:text-left mb-3 md:mb-0 pr-4" for="name">
              Name :
            </label>
          </div>
          <div class="md:w-2/3">
            <slot>
              <input
                id="name"
                :value="name"
                class="form-input block w-full bg-gray-100 text-pink-400 text-lg focus:bg-white"
                type="text"
                placeholder="Your name"
                @input="updateName"
              >
            </slot>
            <p class="py-2 text-sm text-gray-600">
              Your name, dear {{ !name ? '🦩' : name }}
            </p>
          </div>
        </div>

        <!-- gender -->
        <div class="md:flex mb-6">
          <div class="md:w-1/3">
            <label class="block text-gray-600 font-bold md:text-left mb-3 md:mb-0 pr-4" for="gender">
              Gender :
            </label>
          </div>
          <div class="md:w-2/3">
            <div id="gender" class="relative">
              <Gender
                class="static inset-0 z-0 fill-current text-gray-700 object-cover"
              />
              <!--female -->
              <button
                tabindex="-1"
                class="absolute inset-y-0 left-0 z-5 h-full w-1/2 bg-pink-400 opacity-20 cursor-default hover:opacity-40"
                :class="gender === 'F' ? 'opacity-20':'opacity-0'"
                @click="updateGender('F')"
              />
              <!-- male -->
              <button
                tabindex="-1"
                class="absolute inset-y-0 right-0 z-5 h-full w-1/2 bg-blue-400 opacity-20 cursor-default hover:opacity-40"
                :class="gender === 'M' ? 'opacity-20':'opacity-0'"
                @click="updateGender('M')"
              />
            </div>
            <p />
            <p class="py-2 text-sm text-gray-600">
              {{ !gender ? 'Select your gender, my dear.' : 'Your gender is ' }}
              {{ gender === 'F' ? '♀' : '' }}{{ gender === 'M' ? '♂' : '' }}
            </p>
          </div>
        </div>

        <!-- profile picture -->
      </template>
    </GettingStartedBox>
    <GettingStartedBox title="Authorize data access" subtitle="Authorize receiving data from your running app">
      <template #main>
        <ul class="flex-col text-left">
          <li>Please authorize Supercalifragilistic, to receive activity data from your running app.</li>
          <li>Supercalifragilistic will automatically synchronize data from your running application*.</li>
          <li>We will compute your points for each run, and update the leaderboard.</li>
          <li>The only thing you - 🦩 - have to remember, is to turn on your running app when your run.</li>
          <li> *) We are currently only supporting Strava.</li>
        </ul>
      </template>
      <template #bottom>
        <hero-button>
          Authorize Strava
          <img src="https://upload.wikimedia.org/wikipedia/commons/c/cb/Strava_Logo.svg">
        </hero-button>
      </template>
    </GettingStartedBox>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import PageSectionTitle from './layout-utils/PageSectionTitle'
import HeroButton from './layout-utils/HeroButton'
import GettingStartedBox from './GettingStartedBox'
import Gender from '~/assets/What-sex.svg?inline'

export default {
  name: 'ProfileForm',
  components: { GettingStartedBox, HeroButton, PageSectionTitle, Gender },
  computed: {
    ...mapState({
      gender: state => state.profile.gender,
      name: state => state.profile.name
    })
  },
  data () {
    return {
      email: null,
      userId: null,
      accessToken: null,
      profilePicture: null,
      loggedIn: false
    }
  },
  created () {
    console.log('Fetching user')
    this.loggedIn = this.$auth.strategy.token.get()
    this.$auth.fetchUser().then(console.log('fetched user ', this.$auth.user.userId))
    this.email = this.$auth.user ? this.$auth.user.email : 'not defined, sorry'
    this.userId = this.$auth.user ? this.$auth.user.subject : 'not defined 😣'
  },
  mounted () {
    console.log('Route is: ', this.$route.fullPath, '\n params are: ', this.$route.params)
  },
  methods: {
    updateName (e) {
      this.$store.commit('updateProfileName', e.target.value)
    },
    updateGender (g) {
      this.$store.commit('updateProfileGender', g)
    }
  }

}
</script>

<style scoped>

</style>
