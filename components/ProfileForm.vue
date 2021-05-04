<template>
  <div>
    <page-section-title>Profile Settings</page-section-title>

    <!-- Strava integration flow -->
    <side-by-side-text-picture-card
      class="w-full mt-6 lg:mt-12 items-end"
      title="Authorize data access"
      sub-title="We can register your points with data from your runs"
      :has-errors="!canUseStrava"
      icon="KeyIcon"
    >
      <template #info>
        <div v-if="!canUseStrava">
          Supercalifragilistic will automatically synchronize data from your running application*.
          <br>
          We will compute your points for each run, and update the leaderboard.
          <br>
          The only thing you - 🦩 - have to remember, is to turn on your running app when your run.
          <br>
          <span class="text-xs italic">*) We are currently only supporting Strava. </span>
        </div>
        <div
          v-else
        >
          Thank you for trusting us with your Strava data.
          We promise to keep your data safe and secure.
          <br>
          We will compute your points for each run, and update the leaderboard.
          <br>
          The only thing you - 🦩 - have to remember, is to turn on your running app when your run.
        </div>
      </template>
      <template #error>
        Please authorize Supercalifragilistic, to receive activity data from your running app.
      </template>
      <template #bottom>
        <strava-integation-indicator class="w-1/2" />
      </template>
    </side-by-side-text-picture-card>

    <!-- basic profile -->
    <side-by-side-text-picture-card
      :has-errors="!isBasicProfileReady"
      class="w-full mt-6 lg:mt-12"
      title="Basic Profile"
      :border="true"
      icon="IdentificationIcon"
    >
      <template #info>
        We take care of your data and your privacy.
        <br>
        Wherever possible, profile information is prefilled with data, obtained from your Facebook profile.
      </template>
      <template #error>
        We are missing information for your basic profile. Please fill out the form fields.
      </template>
      <template #bottom>
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
              @change="changeMail"
            >
          </template>
        </form-row>

        <form-row id="Name">
          <template #field="fieldProps">
            <input
              :id="fieldProps.id"
              :value="name"
              :class="inputClass"
              class="rounded-lg"
              type="text"
              placeholder="Your name"
              @change="changeName"
            >
          </template>
        </form-row>

        <!-- fav emoji avatar -->
        <form-row id="fav">
          <template #field="fieldProps">
            <input
              :id="fieldProps.fav"
              :value="fav"
              :class="inputClass"
              type="text"
              placeholder="Your favorite emoji"
              @change="changeFav"
            >
          </template>
        </form-row>

        <!-- gender -->
        <form-row id="gender">
          <template #field="fieldProps">
            <div :id="fieldProps.gender" class="relative max-w-1/3">
              <Gender
                class="static inset-0 z-0 fill-current text-gray-700 object-cover w-full border-b-2 border-gray-400"
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
            <p class="py-2 text-sm font-semibold text-gray-600">
              {{ !gender ? 'Select your gender, my dear.' : 'Your gender is ' }}
              <span class="text-xl font-bold">{{ gender === 'F' ? '♀' : '' }}{{ gender === 'M' ? '♂' : '' }}</span>
            </p>
          </template>
        </form-row>

        <!-- health -->
        <form-row id="health">
          <template #field="fieldProps">
            <div :id="fieldProps.health" class="relative max-w-1/3">
              <div
                class="flex flex-row rounded-lg border-2"
                :class="healthy ?'border-green-600 ring-4 ring-green-400': 'border-yellow-600 ring-4 ring-yellow-400'"
              >
                <span class="block text-4xl w-1/2 border-2 border-green-400 text-center leading-loose">🏃‍♂ 🏃‍♀️️</span>
                <span class="block text-4xl w-1/2 border-2 border-yellow-400 text-center leading-loose">🆘 🏥</span>
              </div>
              <button
                tabindex="-1"
                class="absolute inset-y-0 left-0 z-5 h-full w-1/2 bg-green-400 opacity-20 cursor-default hover:opacity-40 border-none"
                :class="healthy ? 'opacity-20':'opacity-0'"
                @click="updateHealthy(true)"
              />
              <!-- male -->
              <button
                tabindex="-1"
                class="absolute inset-y-0 right-0 z-5 h-full w-1/2 bg-yellow-400 opacity-20 cursor-default hover:opacity-40 border-none"
                :class=" !healthy ? 'opacity-20':'opacity-0'"
                @click="updateHealthy(false)"
              />
            </div>
            <p class="py-2 text-sm font-semibold text-gray-600">
              Please indicate, if you are ready for a running challenge:
            </p>
            <p>
              {{ healthy === true ? ' Oh yes, I am so ready!':' Uh, oh, barely alive, I need time off to heal 🏥' }}
            </p>
          </template>
        </form-row>
      </template>
    </side-by-side-text-picture-card>

    <!-- join a challenge -->
    <side-by-side-text-picture-card
      title="Join a challenge"
      sub-title="That's why you are here, right?"
      icon="UserAddIcon"
      :has-errors="!isChallengeReady"
    >
      <template #info>
        Now, join a challenge, tie your shoe laces, and the fun part can begin.
      </template>
      <template #error>
        You need to join a challenge, and select some stars ⭐️.
      </template>
      <template #bottom>
        button to join challenge
        map
        form fields to pick stars
      </template>
    </side-by-side-text-picture-card>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import PageSectionTitle from './layout-utils/PageSectionTitle'
import FormRow from './layout-utils/FormRow'
import SideBySideTextPictureCard from './layout-utils/SideBySideTextPictureCard'
import UserAvatar from './layout-utils/UserAvatar'
import StravaIntegationIndicator from './StravaIntegationIndicator'
import Gender from '~/assets/What-sex.svg?inline'

export default {
  name: 'ProfileForm',
  components: { StravaIntegationIndicator, UserAvatar, FormRow, PageSectionTitle, Gender, SideBySideTextPictureCard },
  data () {
    return {
      userId: null,
      accessToken: null,
      basicInfoChanged: false
    }
  },
  computed: {
    ...mapState({
      gender: state => state.profile.basic.gender,
      email: state => state.profile.basic.mail,
      name: state => state.profile.basic.name,
      healthy: state => state.profile.basic.healthy,
      fav: state => state.profile.basic.fav
    }),
    ...mapGetters([
      'profileImageUri', 'canUseStrava', 'isBasicProfileReady', 'isChallengeReady'
    ])
  },
  created () {
    this.inputClass = 'form-input block w-full bg-gray-50 text-pink-600 text-lg focus:bg-white rounded-lg'
  },
  methods: {
    ...mapActions(['updateGender', 'updateName', 'updateFav', 'updateMail', 'updateHealthy']),
    changeName (e) {
      console.log('changing name ', e.target.value)
      this.updateName(e.target.value)
    },
    changeFav (e) {
      this.updateFav(e.target.value)
    },
    changeMail (e) {
      this.updateMail(e.target.value)
    }
  }

}
</script>

<style scoped>

</style>
//{"data":{"height":50,"is_silhouette":false,"url":"https://platform-lookaside.fbsbx.com/platform/profilepic/?asid=10222488903865108&height=50&width=50&ext=1621781516&hash=AeSr7vx-V7krZhdVurs","width":50}}"
