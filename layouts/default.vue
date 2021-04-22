<template>
  <div class="leading-normal tracking-normal gradient font-sans auto-mx min-h-screen ">
    <div class="min-h-screen">
      <NavBar />
      <Nuxt />
    </div>

    <footer
      class="text-center font-mono uppercase bg-white
      border-b
      py-8 text-gray-800"
    >
      <div class="mx-auto flex flex-col md:flex-row justify-around">
        <span class="border-r-2 px-2">Powered by 🔥 & 🦄. © Mathmagicians, 2021.</span>
        <span
          class="border-r-2 px-2 text-gray-400"
        > Commit id: {{ $config.git_commit }}</span>
      </div>
    </footer>
  </div>
</template>

<style>

.gradient {
  background: linear-gradient(to right, #fa709a 0%, #fee140 100%);
}
</style>

//background: linear-gradient(90deg, #d53369 0%, #daae51 100%);
//background-image: linear-gradient(to right, #eea2a2 0%, #bbc1bf 19%, #57c6e1 42%, #b49fda 79%, #7ac5d8 100%);
//background-image: linear-gradient(to top, #d5dee7 0%, #ffafbd 0%, #c9ffbf 100%);
//background-image: linear-gradient(to right, #fa709a 0%, #fee140 100%);

//.main-container {@apply justify-center items-center text-center text-white;}
