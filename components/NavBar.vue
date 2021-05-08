<template>
  <header
    class="sticky w-full top-0 flex flex-col sm:flex-row items-center justify-between lg:mb-2"
    style="z-index: 9999;"
    :class="changeColor?'bg-white text-pink-400':'bg-transparent text-white'"
  >
    <!-- for screns <sm:
     logo + burger( dropdown menu and navigation)
      sm <= size <lg
      size >= lg:
      -->
    <div
      class="w-full mx-auto flex flex-col lg:flex-row flex-wrap items-center justify-between mt-0 py-2"
    >
      <!-- logo -->
      <nav-bar-item
        link="/"
      >
        <div
          class="pl-4 pb-4 flex flex-col-reverse lg:flex-row items-center font-bold text-lg lg:text-xl xl:text-2xl
        transform transition hover:text-underline hover:scale-110 hover:-translate-y-1 duration-300 ease-in-out"
        >
          <img
            class="w-16 h-16 object-cover object-left-top rounded-full ring-2 "
            :class="changeColor?'ring-pink-400':'ring-pink-50'"
            src="~/assets/flamingo.jpeg"
            alt="Crush your so-called peer-birds, and be the fastest flamingo in the flock"
          >
          <span
            class="px-2 flex-shrink"
            :class="changeColor?'text-pink-600':'text-white'"
          >Supercalifragilisticexpialdociously ... RUN!</span>
        </div>
      </nav-bar-item>

      <!-- Menu burger, only visible below size sm -->
      <div class="sm:hidden">
        <button
          class="block font-bold text-2xl focus:outline-none py-2"
          type="button"
          @click="isOpen = !isOpen"
        >
          <XIcon v-if="isOpen" class="text-current" size="1.5x" :class="changeColorTextClass" />
          <MenuIcon
            v-if="!isOpen"
            size="1.5x"
            class="text-current"
            :class="changeColorTextClass"
          />
        </button>
      </div>
    </div>

    <!-- menu items for screens below size sm -->
    <nav
      :class="isOpen ? 'block':'hidden'"
      class="w-full flex-grow sm:flex lg:items-center lg:w-auto mt-2 lg:mt-0 p-4 lg:p-0 z-20"
    >
      <ul class="list-reset flex flex-col sm:flex-row items-start justify-end flex-1 sm:items-center">
        <li
          v-for="item in menuItems"
          :key="item.link"
        >
          <nav-bar-item
            class="hover:border-b-8 transform transition hover:text-underline hover:scale-105 hover:-rotate-6 duration-300 ease-in-out"
            :class="changeColor?'text-pink-400 hover:border-pink-400':'text-white hover:border-white'"
            :link="item.link"
          >
            {{ item.text }}
          </nav-bar-item>
        </li>
      </ul>

      <!-- use component on sm and larger screens, otherwise embed links -->
      <div
        class="hidden sm:block sm:relative"
      >
        <!-- Profile picture and name if logged in, otherwise prominent login button -->
        <div
          v-if="loggedIn"
          class="mx-2"
        >
          <button
            class="block rounded-full relative p-1 focus:outline-none hover:outline-none"
            @click="isUserOpen = !isUserOpen"
          >
            <user-avatar
              class="w-full w-32"
              :class="changeColorTextClass"
              :image-uri="profileImageUri"
              :name="profileName"
            />
          </button>
        </div>
        <signin-button
          v-else
          class="flex-nowrap"
          :change-color="changeColor"
        />

        <button
          v-if="isUserOpen"
          tabindex="-1"
          class="fixed top-0 right-0 bottom-0 left-0 h-full w-full bg-grey-900 opacity-10 cursor-default"
          @click="isUserOpen=false"
        />
        <div
          v-if="isUserOpen"
          class="absolute right-0 bg-white rounded-lg shadow-lg focus w-48 text-pink-400"
        >
          <nav-bar-item
            v-for="item in dropDownLoggedInItems"
            :key="item.link"
            :link="item.link"
            class="block px-4 py-2 hover:border-pink-400
              hover:border-b-8 transform transition hover:text-underline hover:scale-105 hover:-rotate-6 duration-300 ease-in-out"
          >
            <hero-button v-if="item.action" @click="handleFunctionCall(item.action)">
              {{ item.text }}
            </hero-button>
            <span v-else>
              {{ item.text }}
            </span>
          </nav-bar-item>
        </div>
      </div>

      <!-- on small screens, below sm, embed the links from drop down menu directly -->
      <div v-if="loggedIn" class="sm:hidden">
        <button class="mt-2 focus:outline-none">
          <user-avatar class="w-32" :image-uri="profileImageUri" :name="profileName" />
        </button>
        <ul class="flex flex-col items-start justify-end flex-1 list-reset">
          <li>
            <nav-bar-item
              v-for="item in dropDownLoggedInItems"
              :key="item.link"
              :link="item.link"
              class="hover:border-b-8 transform transition hover:scale-105 hover:-rotate-6 duration-300 ease-in-out"
              :class="changeColor?'text-pink-400 hover:border-pink-400':'text-white hover:border-white'"
            >
              <hero-button v-if="item.action" :color-change="true" @click="handleFunctionCall(item.action)">
                {{ item.text }}
              </hero-button>
              <span v-else>
                {{ item.text }}
              </span>
            </nav-bar-item>
          </li>
        </ul>
      </div>
    </nav>
    <hr class="border-b border-gray-100 opacity-25 my-0 py-0">
  </header>
</template>

<script>
import { MenuIcon, XIcon } from '@vue-hero-icons/outline'
import { mapState, mapGetters } from 'vuex'
import NavBarItem from './layout-utils/NavBarItem'
import SigninButton from './layout-utils/SigninButton'
import UserAvatar from './layout-utils/UserAvatar'
import HeroButton from './layout-utils/HeroButton'

export default {
  name: 'NavBar',
  components: { HeroButton, UserAvatar, SigninButton, XIcon, MenuIcon, NavBarItem },
  data () {
    return {
      // user menu state
      isOpen: false,
      // burger menu state
      isUserOpen: false,

      scrollPosition: null,
      menuItems: [
        { link: '/challenge', text: 'Challenge' },
        { link: '/profile', text: 'Profile' },
        { link: '/engineering', text: 'Engineering' },
        { link: '/about', text: 'Rules' }
      ],
      dropDownLoggedInItems: [
        {
          link: '/profile?action=read',
          text: (this.gender === 'F' ? '🏃‍♀️\t' : '') + (this.gender === 'M' ? '🏃‍♂️\t' : '') + 'View Profile'
        },
        { link: '/profile?action=update', text: 'Profile Settings' },
        { link: '/login', text: 'Sign out', action: 'signOut' }
      ],
      notLoggedInITems: [
        { link: '/profile?action=login', text: 'Signup' }
      ]
    }
  },
  computed: {
    changeColor () {
      return this.scrollPosition > 10
    },
    changeColorTextClass () {
      return this.changeColor ? 'text-pink-400 hover:border-pink-400 focus:border-pink-400' : 'text-white hover:border-white focus:border-white'
    },
    ...mapState({
      loggedIn: state => state.auth.loggedIn
    }),
    ...mapGetters(['profileImageUri', 'profileName'])

  },
  mounted () {
    window.addEventListener('scroll', this.updateScroll)
  },
  methods: {
    updateScroll () {
      this.scrollPosition = window.scrollY
    },
    signOut () {
      this.$auth.logout()
    },
    handleFunctionCall (functionName) {
      this[functionName]()
    }
  }
}
</script>
