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
                class="static inset-0 z-0 fill-current text-gray-700 object-cover w-full rounded-lg"
              />
              <!--female -->
              <button
                tabindex="-1"
                class="absolute inset-y-0 left-0 z-5 h-full w-1/2 w-1/2  cursor-default rounded-l-lg
                hover:border-2 hover:border-pink-600  hover:opacity-40 hover:bg-pink-400
                transform transition hover:scale-105 duration-300 ease-in-out"
                :class="gender === 'F' ? 'border-2 border-pink-400':'border-2 opacity-60 border-gray-400 bg-gray-400'"
                @click="updateGender('F')"
              />
              <!-- male -->
              <button
                tabindex="-1"
                class="absolute inset-y-0 right-0 z-5 h-full w-1/2  cursor-default rounded-r-lg
                hover:border-2 hover:border-blue-600 hover:opacity-40 hover:bg-blue-400
                transform transition hover:scale-105 duration-300 ease-in-out"
                :class="gender === 'M' ? 'border-2 border-blue-400':'border-2 opacity-60 border-gray-400 bg-gray-400'"
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
            <div :id="fieldProps.health" class="relative max-w-1/3 ">
              <div
                class="flex flex-row rounded-lg border-none"
              >
                <span class="block text-4xl w-1/2  text-center leading-loose">🏃‍♂ 🏃‍♀️️</span>
                <span class="block text-4xl w-1/2  text-center leading-loose">🆘 🏥</span>
              </div>
              <button
                tabindex="-1"
                class="absolute inset-y-0 left-0 z-5 h-full w-1/2 cursor-default hover:opacity-40 hover:bg-green-400 rounded-l-lg
                 transform transition hover:scale-105 duration-300 ease-in-out"
                :class="healthy ? 'border-2 border-green-600 ':'border-2 opacity-60 border-gray-400 bg-gray-400'"
                @click="updateHealthy(true)"
              />
              <!-- male -->
              <button
                tabindex="-1"
                class="absolute inset-y-0 right-0 z-5 h-full w-1/2  cursor-default hover:opacity-40 hover:bg-yellow-400 rounded-r-lg
                transform transition hover:scale-105 duration-300 ease-in-out"
                :class=" !healthy ? 'border-2 border-yellow-600 ':'border-2 opacity-60 border-gray-400 bg-gray-400'"
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
        <div
          v-for="c in challenges"
          :key="c.ID"
          class="rounded-lg flex flex-row items-center shadow-xl"
          :class="joined(c.ID)?'border-green-400 text-green-600':'border-gray-400 text-gray-400'"
        >
          <div v-if="joined(c.ID)" class="center px-4">
            <CheckCircleIcon size="4x" class="text-current" />
            <h3 class="text-gray-600 text-lg">
              Yay, you are participating in this challenge {{ fav }} !!
            </h3>
            <nuxt-link to="/challenge">
              <HeroButton>🦩 Check your position</HeroButton>
            </nuxt-link>
          </div>
          <div v-else>
            Contact admin to join this challenge...
          </div>
          <div class="border-gray-200 border-l-2 px-2">
            <h1 class="text-gray-600 text-xl font-semibold text-center">
              {{ c.Name }}
            </h1>
            <h2>Start: {{ c.Start | timeSince }}</h2>
            <h2>End: {{ c.End | timeSince }}</h2>
          </div>
        </div>
      </template>
    </side-by-side-text-picture-card>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import { CheckCircleIcon } from '@vue-hero-icons/outline'
import PageSectionTitle from './layout-utils/PageSectionTitle'
import FormRow from './layout-utils/FormRow'
import SideBySideTextPictureCard from './layout-utils/SideBySideTextPictureCard'
import HeroButton from './layout-utils/HeroButton'
import UserAvatar from './layout-utils/UserAvatar'
import StravaIntegationIndicator from './StravaIntegationIndicator'
import Gender from '~/assets/What-sex.svg?inline'

export default {
  name: 'ProfileForm',
  components: { StravaIntegationIndicator, UserAvatar, FormRow, PageSectionTitle, Gender, SideBySideTextPictureCard, CheckCircleIcon, HeroButton },
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
      fav: state => state.profile.basic.fav,
      challenges: state => state.challenge.challenges,
      myChallenges: state => state.profile.my_challenges
    }),
    ...mapGetters([
      'profileImageUri', 'canUseStrava', 'isBasicProfileReady', 'isChallengeReady'
    ])
  },
  created () {
    this.inputClass = 'form-input block w-full bg-gray-50 text-pink-600 text-lg rounded-lg focus:bg-white focus:ring-4 focus:ring-gray-600 hover:bg-white hover:ring-gray-400 hover:ring-4'
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
    },
    joined (chid) {
      return this.myChallenges.includes(chid)
    }
  }

}
</script>

<style scoped>

</style>
//{"data":{"height":50,"is_silhouette":false,"url":"https://platform-lookaside.fbsbx.com/platform/profilepic/?asid=10222488903865108&height=50&width=50&ext=1621781516&hash=AeSr7vx-V7krZhdVurs","width":50}}"
