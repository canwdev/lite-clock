<template>
  <ScreenWrapper class="screen-text">

    <MarqueeText
        :duration="duration"
        :paused="false"
        :repeat="2"
    >
      <div class="text" :style="styleFont">{{text}}</div>
    </MarqueeText>
  </ScreenWrapper>
</template>

<script>
  import ScreenWrapper from "@/components/ScreenWrapper"
  import MarqueeText from 'vue-marquee-text-component'

  export default {
    name: "ScreenText",
    components: {
      ScreenWrapper,
      MarqueeText
    },
    props: {
      text: {
        type: String,
        default: ''
      },
      config: {
        type: Object,
        default() {
          return {
            fontFamily: ''
          }
        }
      }
    },
    computed: {
      duration() {
        return this.text.length/1.5
      },
      styleFont() {
        if (this.config && this.config.style) {
          return {
            ...this.config.style
          }
        }
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .screen-text {
    display flex
    align-items center
    justify-content center

    .text {
      font-size: 15vw
      margin: 15vw
    }

    >>> .marquee-text-content {
      width: 200000px
    }
  }
</style>
