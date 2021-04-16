<template>
  <header
    class="fixed w-full top-0 flex items-center justify-between mb-8 lg:mb-16"
    style="z-index: 9999;"
    :class="changeColor?'bg-white text-pink-400':'bg-transparent text-white'"
  >
    <!-- logo + burger -->
    <div
      class="w-full mx-auto flex flex-wrap items-center justify-between mt-0 py-2"
    >
      <nav-bar-item
        link="/"
      >
        <div
          class="pl-4 pb-4 flex flex-col-reverse lg:flex-row items-center font-bold text-lg lg:text-xl xl:text-2xl
        transform transition hover:text-underline hover:scale-105 hover:rotate-2 duration-300 ease-in-out"
        >
          <img
            class="w-16 h-16 object-cover object-left-top rounded-full ring-2 "
            :class="changeColor?'ring-pink-400':'ring-pink-50'"
            src="~/assets/flamingo.jpeg"
            alt="Crush your so-called peer-birds, and be the fastest flamingo in the flock"
          >
          <span
            class="px-4"
            :class="changeColor?'text-pink-600':'text-white'"
          >Supercalifragilisticexpialdociously ... RUN!</span>
        </div>
      </nav-bar-item>

      <!-- Menu burger -->
      <div class="sm:hidden">
        <button
          class="block text-gray-500 hover:text-white focus:text-white focus:outline-none"
          type="button"
          @click="isOpen = !isOpen"
        >
          <XIcon v-if="isOpen" />
          <MenuIcon v-if="!isOpen" />
        </button>
      </div>
    </div>
    <!-- menu items -->
    <nav
      :class="isOpen ? 'block':'hidden'"
      class="w-full flex-grow lg:flex lg:items-center lg:w-auto mt-2 lg:mt-0 p-4 lg:p-0 z-20"
    >
      <ul class="list-reset flex flex-row justify-end flex-1 items-center">
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
        <button
          class="block rounded-full border-2 p-2 relative z-10 hover:ring-4"
          :class="changeColor ? 'text-pink-400 hover:border-pink-600 border-pink-400 hover:ring-pink-600':'text-white border-white hover:ring-white'"
          @click="isUserOpen = !isUserOpen"
        >
          <UserIcon size="2x" class="text-current" />
          <p>{{ isLoggedIn }}</p>
        </button>
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
          <a href="#" class="block px-4 py-2 hover:bg-pink-400">Your Account</a>
          <a href="#" class="block px-4 py-2 hover:bg-pink-400">Contact us</a>
          <a href="#" class="block px-4 py-2 hover:bg-pink-400">Logout</a>
        </div>
      </div>

      <!-- on small screens, embed the links directly -->

      <div class="sm:hidden border-t-2 border-gray-600">
        <button class="flex items-center mt-2">
          <UserIcon size="2x" class="text-pink-50 rounded-full border-2 hover:border-pink-50 border-pink-600 p-2" />
          <span class="ml-3 font-semibold text-white">Jane Doe</span>
        </button>
        <div class="text-gray-100">
          <a href="#" class="block px-4 py-1 hover:bg-pink-400">Your Account</a>
          <a href="#" class="block px-4 py-1 hover:bg-pink-400">Contact us</a>
          <a href="#" class="block px-4 py-1 hover:bg-pink-400">Logout</a>
        </div>
      </div>
    </nav>
    <hr class="border-b border-gray-100 opacity-25 my-0 py-0">
  </header>
</template>

<script>
import { XIcon, MenuIcon, UserIcon } from '@vue-hero-icons/outline'
import NavBarItem from './layout-utils/NavBarItem'

export default {
  name: 'NavBar',
  components: { XIcon, MenuIcon, UserIcon, NavBarItem },
  data () {
    return {
      isOpen: false,
      isUserOpen: false,

      scrollPosition: null,
      menuItems: [
        { link: '/engineering', text: 'Engineering' },
        { link: '/about', text: 'Game' },
        { link: '/challenge', text: 'Challenge' },
        { link: '/profile', text: 'Profile' },
        { link: '/signup', text: ' Run!' }
      ],
      dropDownItems: [
        { link: '', text: 'Logout' }
      ]
    }
  },
  computed: {
    changeColor () {
      return this.scrollPosition > 10
    }
  },
  mounted () {
    window.addEventListener('scroll', this.updateScroll)
  },
  methods: {
    updateScroll () {
      this.scrollPosition = window.scrollY
    }
  }
}
</script>

<style scoped>

</style>
