<template>
  <div class="screen-wrapper"><slot></slot></div>
</template>

<script>
  export default {
    name: "ScreenWrapper"
  }
</script>

<style scoped>
.screen-wrapper {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
</style>
