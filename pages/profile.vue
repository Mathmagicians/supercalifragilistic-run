<template>
  <basic-page-layout>
    <page-section-title>Profile</page-section-title>
    <card>
      User: {{ user }}, Email: {{ email }}
    </card>
    <card>
      <run />
    </card>
  </basic-page-layout>
</template>

<script>
import Card from '../components/layout-utils/Card'
import BasicPageLayout from '../components/layout-utils/BasicPageLayout'
import PageSectionTitle from '../components/layout-utils/PageSectionTitle'
export default {
  components: { PageSectionTitle, BasicPageLayout, Card },

  data () {
    return {
      fromLambda: {},
      token: null,
      user: null,
      email: null
    }
  },

  // async fetch () {
  // const res = await this.$axios.$get('/profile')
  // this.fromLambda = res
  // const fetchuser = await this.$auth.fetchUser()
  // console.log('fetched ', fetchuser)

  //   this.email = this.$auth.user.email
  //  this.user = this.$auth.user.username
  //  },
  mounted () {

  },
  created () {
    // this.email = this.$auth.user.email
    // this.user = this.$auth.user.username
  }

}

</script>
