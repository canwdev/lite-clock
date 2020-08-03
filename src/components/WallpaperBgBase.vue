<template>
  <div class="custom-wallpaper-bg" :style="styleBg">
    <div class="_shadow" v-if="wallpaperUrl"></div>
    <div class="footnote-wrapper">
      <a :href="wallpaperUrl" target="_blank">{{description}}</a>
    </div>
  </div>
</template>

<script>
  export default {
    name: "WallpaperBgBase",
    props:{
      wallpaperUrl: {
        type: String,
        default: null
      },
      description: {
        type: String,
        default: null
      }
    },
    computed: {
      styleBg() {
        if (!this.wallpaperUrl) {
          return null
        }
        return {
          backgroundImage: `url(${this.wallpaperUrl})`
        }
      }
    },
  }
</script>

<style lang="stylus" scoped>
  .custom-wallpaper-bg {
    background-size cover
    background-repeat no-repeat
    background-position center
    background-image url("../assets/images/bg.svg")
    position: relative;
    width: 100%
    height: 100%

    ._shadow {
      position: absolute;
      top: 0
      left: 0
      right: 0
      bottom: 0
      background rgba(0,0,0, 0.4)
    }
    .footnote-wrapper {
      position: fixed;
      right $commonPadding
      bottom $commonPadding
      width 150px
      text-align: right;
      z-index 10
      font-size: 12px
      word-break break-all
      a {
        display inline-block
        color rgba(255, 255, 255, 0.8)
        &:active {
          color #fff
        }
      }
    }
  }

</style>
