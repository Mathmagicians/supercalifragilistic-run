<template>
  <div>
    <section class="container mx-auto text-center py-6 mb-12">
      <h1 class="w-full my-2 text-5xl font-bold leading-tight text-center text-white">
        Hey you, flamingo, get off the couch!
      </h1>
      <div class="w-full mb-4">
        <div class="h-1 mx-auto bg-white w-1/6 opacity-25 my-0 py-0 rounded-t" />
      </div>
      <h3 class="my-4 text-3xl leading-tight">
        Don't be a laggard. Tie your shoelaces. Join your flock, and RUN.
      </h3>
      <signin-button />
    </section>
  </div>
</template>

<script>
import SigninButton from './layout-utils/SigninButton'

export default {
  name: 'MainCallToAction',
  components: { SigninButton }
}
</script>
