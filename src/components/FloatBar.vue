<template>
  <div class="float-bar">
    <button title="全屏切换" @click="toggleFullscreen">⌗</button>
    <button title="设置" @click="$emit('openSettings')">✱</button>
  </div>
</template>

<script>
  import screenfull from 'screenfull'

  export default {
    name: "FloatBar",
    methods: {
      toggleFullscreen() {
        screenfull.toggle()
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .float-bar {
    position: absolute;
    top: $commonPadding
    right: $commonPadding
    z-index 10

    button {
      background transparent
      border none
      outline none
      font-size: 20px
      color inherit
      cursor pointer
      opacity 0.5

      &:active {
        opacity 1
      }
    }
  }
</style>
