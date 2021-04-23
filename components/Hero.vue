<template>
  <div>
    <div class="pt-2 lg:pt-8">
      <main-hero />
    </div>
    <hero-page-wave
      :is-top="true"
      :image-url="require('~/assets/hero_art_top.svg')"
    />
    <section
      class="
      bg-white
      border-b
      py-8"
    >
      <div class="container max-w-5xl mx-auto m-8">
        <page-section-title>
          Add the FUN to RUN
        </page-section-title>

        <side-by-side-text-picture-card
          title="Mock your friends"
          :image-url="require('~/assets/Overtaking.svg')"
        >
          Show your friends, that you are not the laziest flamingo from the flock.
          <br>
          You get points for getting off the couch, and running.
          <br>
          You get points for overtaking your more lazy friends, that stayed on the couch.
          <br>
          You get the right to mock them, as you run by.
        </side-by-side-text-picture-card>

        <side-by-side-text-picture-card
          :reverse="true"
          title="Run for the stars"
          :image-url="require('~/assets/Star.svg')"
        >
          Get ready for some urban exploring.
          <br>
          Every player in the challenge brings some star locations.
          <br>
          You get points for running by star locations, and you get more points the larger your star collection becomes.
        </side-by-side-text-picture-card>
      </div>
    </section>

    <section class="bg-white border-b py-8">
      <page-section-title>
        Join the Running Challenge
      </page-section-title>
      <div class="container mx-auto flex flex-wrap flex-row pt-4 pb-12">
        <getting-started-box
          class="md:w-1/3"
          title="Integrated with running apps"
          subtitle="Automated point tracking"
        >
          You don't have to worry about book keeping.
          Just use a running app, and all metrics will be collected.
          At this point, we offer integration with the running app Strava.
        </getting-started-box>

        <getting-started-box
          class="md:w-1/3"
          subtitle="We value privacy"
          title="All your data are secure"
        >
          We use modern cloud computing, and security mechanisms.
          <br>
          OAuth 2.0 authentication, together with server side encryption ensures, that your personal data are safe.
        </getting-started-box>

        <getting-started-box
          class="md:w-1/3"
          title="Prize pool"
          subtitle="Increase motivation by incentives"
        >
          Pay up to the prize pool, it will increase your motivation for running.
        </getting-started-box>
      </div>
    </section>

    <hero-page-wave
      :is-top="false"
      :image-url="require('~/assets/hero_art_bottom.svg')"
    />

    <main-call-to-action />
  </div>
</template>

<script>
import PageSectionTitle from './layout-utils/PageSectionTitle'
import SideBySideTextPictureCard from './layout-utils/SideBySideTextPictureCard'
import HeroPageWave from './layout-utils/HeroPageWave'
export default {
  name: 'Hero',
  components: { HeroPageWave, SideBySideTextPictureCard, PageSectionTitle }
}
</script>
