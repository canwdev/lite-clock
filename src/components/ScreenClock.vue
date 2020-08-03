<template>
  <ScreenWrapper>
    <LiteClockDigital v-if="config.isAnalog"
      :isLightTheme="isLightTheme"
    />
    <LiteClockAnalog v-else
      :isLightTheme="isLightTheme"
    />
  </ScreenWrapper>
</template>

<script>
  import ScreenWrapper from "@/components/ScreenWrapper"
  import LiteClockDigital from "@/components/LiteClockDigital"
  import LiteClockAnalog from "@/components/LiteClockAnalog"
  import store from "@/store"
  export default {
    name: "ScreenClock",
    components: {
      ScreenWrapper,
      LiteClockDigital,
      LiteClockAnalog
    },
    props:{
      config: {
        type: Object,
        default() {
          return {
            isAnalog: false
          }
        }
      }
    },
    computed: {
      isLightTheme: () => store.getters.isLightTheme
    }
  }
</script>

<style scoped>

</style>
