<template>
  <ScreenWrapper>
    <div v-html="htmlStr"></div>
  </ScreenWrapper>
</template>

<script>
  import ScreenWrapper from "@/components/ScreenWrapper"

  export default {
    name: "ScreenHTML",
    components: {
      ScreenWrapper,
    },
    props: {
      htmlStr: {
        type: String,
        default: ''
      }
    }
  }
</script>

<style scoped>

</style>
