<template>
  <div class="container px-3 mx-auto flex flex-wrap flex-column md:flex-row items-center">
    <!--Left Col-->
    <div class="flex flex-col mt-4 md:mt-6 lg: mt-0 w-full md:w-2/5 justify-center items-start text-center md:text-left">
      <ul class="uppercase tracking-loose w-full">
        <li>
          A spoonful of sugar helps the medicine go down
        </li>
        <li class="italic text-right text-xs">
          - ☂️  Mary Poppins.
        </li>
      </ul>
      <h1 class="my-4 text-5xl font-bold leading-tight">
        Running is more fun, when you can mock your friends!
      </h1>
      <ul class="leading-normal text-2xl mb-8">
        <li> Collect stars.</li>
        <li /> Mock your friends.</li>
        <li> Get in shape.</li>
        <li> Win the prize pool.</li>
        </mock>
        </li>
      </ul>
      <signin-button change-color="false" />
    </div>
    <!--Right Col-->
    <div class="w-full md:w-3/5 py-6 px-2 md:px-6 text-center">
      <SuperRun class="w-full md:w-4/5 z-50 fill-current text-white" />
    </div>
  </div>
</template>

<script>
import SigninButton from './layout-utils/SigninButton'
import SuperRun from '~/assets/Super-run.svg?inline'

export default {
  name: 'MainHero',
  components: { SigninButton, SuperRun }
}
</script>
