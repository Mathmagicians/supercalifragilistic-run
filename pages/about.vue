<template>
  <basic-page-layout class="mx-auto border-2 border-blue-800">
    <side-by-side-text-picture-card :title="rulesPage.title">
      {{ rulesPage.description }}
      <template #bottom>
        <SuperRun class="fill-current  text-pink-400" />
      </template>
    </side-by-side-text-picture-card>

    <nuxt-content :document="rulesPage" class="prose lg:prose-lg " />
  </basic-page-layout>
</template>

<script>
import BasicPageLayout from '../components/layout-utils/BasicPageLayout'
import SideBySideTextPictureCard from '../components/layout-utils/SideBySideTextPictureCard'
import SuperRun from '~/assets/Super-run.svg?inline'
export default {
  auth: false,
  components: { SideBySideTextPictureCard, BasicPageLayout, SuperRun },

  async asyncData ({ $content }) {
    const rulesPage = await $content('rules').fetch()
    return { rulesPage }
  }

}
</script>
