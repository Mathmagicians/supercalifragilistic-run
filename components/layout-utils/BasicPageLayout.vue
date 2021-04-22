<template>
  <div class="mt-2 lg:mt-8">
    <slot name="top" />
    <hero-page-wave
      :is-top="true"
      :image-url="require('~/assets/hero_art_top.svg')"
    />
    <section
      class="
      bg-white
      border-b
      py-8
      mt-4"
    >
      <div class="container max-w-5xl mx-auto m-8 text-gray-800">
        <slot>
          content <slot />
        </slot>
      </div>
    </section>
    <hero-page-wave
      :is-top="false"
      :image-url="require('~/assets/hero_art_bottom.svg')"
    />
  </div>
</template>

<script>

import HeroPageWave from './HeroPageWave'
export default {
  name: 'BasicPageLayout',
  components: { HeroPageWave }
}
</script>

<style scoped>

</style>
