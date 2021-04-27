<template>
  <basic-page-layout>
    <!--  <page-section-title v-if="error?.statusCode === 404">
      {{ pageNotFound }}
    </page-section-title> -->
    <page-section-title>
      {{ otherError }}
    </page-section-title>

    <pre class="whitespace-pre text-left text-xs">
      <code>
        {{ error | pretty }}
      </code>
    </pre>
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
  filters: {
    pretty (value) {
      return JSON.stringify(value, null, 4)
    }
  },
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
  },
  mounted () {
    console.error('Error is', this.error)
  }
}

</script>
