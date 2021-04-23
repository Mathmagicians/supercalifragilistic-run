<template>
  <div>
    <page-section-title>Your profile</page-section-title>
    <GettingStartedBox
      id="basic_profile"
      title="Basic profile info 🦩"
      subtitle="We take care of your data and your privacy"
    >
      <template #main>
        <!-- rows with basic profile data  name, gender, mail, picture (from facebook) -->
        <form-row id="picture" class="mt-2">
          <template #field="fieldProps">
            <UserAvatar :id="fieldProps.id" :image-uri="profileImageUri" />
          </template>
        </form-row>

        <form-row id="email">
          <template #field="fieldProps">
            <input
              :id="fieldProps.id"
              :class="inputClass"
              type="text"
              :placeholder="`enter content for ${fieldProps.id}`"
              :value="email"
            >
          </template>
        </form-row>

        <form-row id="Name">
          <template #field="fieldProps">
            <input
              :id="fieldProps.id"
              :value="name"
              :class="inputClass"
              type="text"
              placeholder="Your name"
              @input="updateName"
            >
          </template>
        </form-row>

        <!-- gender -->
        <div class="md:flex mb-6">
          <div class="md:w-1/3">
            <label class="block text-gray-600 font-bold md:text-left mb-3 md:mb-0 pr-4" for="gender">
              Gender :
            </label>
          </div>
          <div class="md:w-2/3">
            <div id="gender" class="relative max-w-1/3">
              <Gender
                class="static inset-0 z-0 fill-current text-gray-700 object-cover w-full"
              />
              <!--female -->
              <button
                tabindex="-1"
                class="absolute inset-y-0 left-0 z-5 h-full w-1/2 w-1/2 bg-pink-400 opacity-20 cursor-default hover:opacity-40"
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
      <template #bottom>
        <div v-if="basicInfoChanged" class="flex flex-row">
          <hero-button>
            Update Profile Info
          </hero-button>
          <hero-button>
            Cancel
          </hero-button>
        </div>
        <p>Data synchronized from Facebook.</p>
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
        <p>todo: deauthorize + show authorized status</p>
      </template>
    </GettingStartedBox>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import PageSectionTitle from './layout-utils/PageSectionTitle'
import HeroButton from './layout-utils/HeroButton'
import GettingStartedBox from './GettingStartedBox'
import FormRow from './layout-utils/FormRow'
import UserAvatar from './layout-utils/UserAvatar'
import Gender from '~/assets/What-sex.svg?inline'

export default {
  name: 'ProfileForm',
  components: { UserAvatar, FormRow, GettingStartedBox, HeroButton, PageSectionTitle, Gender },
  data () {
    return {
      userId: null,
      accessToken: null,
      basicInfoChanged: false
    }
  },
  computed: {
    ...mapState({
      gender: state => state.profile.gender,
      name: state => state.auth.user.given_name,
      email: state => state.auth.user.email
    }),
    ...mapGetters([
      'profileImageUri'
    ])
  },
  created () {
    this.inputClass = 'form-input block w-full bg-gray-100 text-pink-400 text-lg focus:bg-white'
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
//{"data":{"height":50,"is_silhouette":false,"url":"https://platform-lookaside.fbsbx.com/platform/profilepic/?asid=10222488903865108&height=50&width=50&ext=1621781516&hash=AeSr7vx-V7krZhdVurs","width":50}}"
