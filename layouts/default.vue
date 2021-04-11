<template>
  <div>
    <NavBar />
    <Nuxt class="main-container leading-normal tracking-normal text-white gradient font-sans auto-mx" />
    <footer class="text-center font-mono uppercase">
      Powered by 🔥 & 🦄. © Mathmagicians, 2021.
    </footer>
  </div>
</template>

<style>
.main-container {
  @apply min-h-screen flex justify-center items-center text-center;
}

.gradient {
  background: linear-gradient(90deg, #d53369 0%, #daae51 100%);
}
</style>
