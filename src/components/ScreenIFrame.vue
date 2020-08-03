<template>
  <ScreenWrapper class="iframe-wrap">
    <iframe :src="src"></iframe>
  </ScreenWrapper>
</template>

<script>
  import ScreenWrapper from "@/components/ScreenWrapper"

  export default {
    name: "ScreenIFrame",
    components: {
      ScreenWrapper,
    },
    props: {
      src: {
        type: String,
        default: ''
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .iframe-wrap {
    padding-top: 60px
    padding-bottom: 60px

    iframe {
      width: 100%
      height: 100%
      background-color #fff
    }

  }
</style>
