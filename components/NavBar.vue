<template>
  <header class="bg-gray-900 sm:flex sm:justify-between sm:items-center sm:px-4 sm:py-1">
    <!-- logo + burger -->
    <div class="flex justify-between items-center px-4 py-1 sm:p-0">
      <nav-bar-item link="/">
        <div class="flex flex-row items-center">
          <img
            class="w-16 h-16 object-cover object-left-top"
            src="~/assets/flamingo.jpeg"
            alt="Crush your so-called peer-birds, and be the fastest flamingo in the flock"
          >
          <p class="font-extrabold text-xs text-pink-600 px-2">
            Supercalifragilisticexpialdociously...RUN!
          </p>
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
    <nav :class="isOpen ? 'block':'hidden'" class="px-2 pt-2 pb-4 sm:flex sm:items-center text-white sm:p-0">
      <nav-bar-item link="/about">
        💁‍♀️ About the game
      </nav-bar-item>
      <nav-bar-item link="/engineering">
        👩🏽‍💻 Engineering
      </nav-bar-item>
      <nav-bar-item link="/challenge">
        🦩 Challenge
      </nav-bar-item>
      <nav-bar-item link="/profile">
        Profile
      </nav-bar-item>
      <nav-bar-item link="/signup">
        🏃‍♀️Lets run
      </nav-bar-item>

      <!-- use component on sm and larger screens, otherwise embed links -->
      <LazyAccountDropdown class="hidden sm:block mx-2 sm:ml-8 text-gray-700" />
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
      isOpen: false
    }
  }
}
</script>

<style scoped>

</style>
