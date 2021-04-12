<template>
  <div>
    <hero-page-vawe
      :is-top="true"
      :image-url="require('~/assets/hero_art_top.svg')"
    />
    <section
      class="
      bg-white
      border-b
      py-8"
    >
      <div class="container max-w-5xl mx-auto m-8 text-gray-800">
        <slot>
          content <slot />
        </slot>
      </div>
    </section>
    <hero-page-vawe
      :is-top="false"
      :image-url="require('~/assets/hero_art_bottom.svg')"
    />
  </div>
</template>
<script>
export default {
  name: 'BasicPageLayout'
}
</script>

<style scoped>

</style>
