<template>
  <basic-page-layout>
    <!--  <page-section-title v-if="error?.statusCode === 404">
      {{ pageNotFound }}
    </page-section-title> -->
    <page-section-title>
      {{ otherError }}
    </page-section-title>
    <p>
      {{ error }}
    </p>
    <nuxt-link to="/">
      <hero-button>
        Go back home, 🦩
      </hero-button>
    </nuxt-link>
  </basic-page-layout>
</template>

<script>
import BasicPageLayout from '../components/layout-utils/BasicPageLayout'
import PageSectionTitle from '../components/layout-utils/PageSectionTitle'
import HeroButton from '../components/layout-utils/HeroButton'
export default {
  components: { HeroButton, PageSectionTitle, BasicPageLayout },
  layout: 'empty',
  props: {
    error: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      pageNotFound: '404 Not Found',
      otherError: 'An error occurred'
    }
  },
  head () {
    const title =
        (this.error) && (this.error.statusCode === 404) ? this.pageNotFound : this.otherError
    return {
      title
    }
  }
}

</script>
