<template>
  <div class="home-page" :class="{'light-theme':isLightTheme}">
    <!--浮动条-->
    <FloatBar
        @openSettings="sidebarOpened = true"
    />

    <!--设置-->
    <b-sidebar
        type="is-light"
        :fullheight="true"
        :overlay="true"
        :right="true"
        :open.sync="sidebarOpened"
    >
      <div class="settings-wrap">
        <b-button class="settings-close" type="is-light" @click="sidebarOpened = false">╳</b-button>
        <div class="settings-title">设置</div>
        <div class="settings-row">
          <b-switch class="switch-full-width" v-model="isLightTheme">明亮主题 ☯</b-switch>
        </div>
        <div class="settings-row">
          <b-switch class="switch-full-width" v-model="isBingWallpaper">Bing 壁纸</b-switch>
        </div>
        <div class="settings-row">
          <b-switch v-model="isCustomWallpaper"></b-switch>
          <b-button @click="changeCustomWallpaper">自定义背景</b-button>
          <b-button type="is-text" @click="showWallpaperHelp">?</b-button>
        </div>
        <div class="settings-row">
          <b-button @click="changeDataAPI">自定义 DataAPI</b-button>
          <b-button type="is-text" @click="refreshData">刷新</b-button>
        </div>
      </div>
    </b-sidebar>

    <!--全局Loading-->
    <b-loading :is-full-page="true" :active.sync="isLoading" :can-cancel="false"></b-loading>

    <!--Bing壁纸-->
    <WallpaperBgBing
        v-if="isBingWallpaper"
    />
    <WallpaperBgBase
      v-else-if="isCustomWallpaper"
      :wallpaper-url="customWallpaperUrl"
      :description="customWallpaperUrl"
    />

    <!--Mini时钟-->
    <div class="mini-clock-wrap" v-if="showMiniClock">
      <LiteClockDigital :is-mini="true"/>
    </div>

    <!--本体-->
    <b-carousel
        class="full-vh"
        :value="currentPageIndex"
        :autoplay="false"
        :interval="5000"
        :arrow="false"
        indicator-style="is-boxes"
        animated="fade"
        @change="(i) => currentPageIndex = i"
    >
      <b-carousel-item
          v-for="(item, index) in screenList"
          :key="index"
          class="screen-wrapper full-vh"
      >
        <template v-if="index === currentPageIndex">
          <ScreenClock
              v-if="item.type === SCREEN_TYPES.clock"
              :config="item.config"
          />

          <ScreenText
              v-if="item.type === SCREEN_TYPES.text"
              :text="item.content"
              :config="item.config"
          />

          <ScreenHTML
              v-if="item.type === SCREEN_TYPES.html"
              :htmlStr="item.content"
          />

          <ScreenIFrame
              v-if="item.type === SCREEN_TYPES.iframe"
              :src="item.content"
          />

        </template>
      </b-carousel-item>
    </b-carousel>

  </div>
</template>

<script>
  import store from '@/store'
  import {getData} from "@/utils/api"
  import {SCREEN_TYPES, dataOffline} from "@/utils/enum"
  import FloatBar from "@/components/FloatBar"
  import ScreenClock from "@/components/ScreenClock"
  import ScreenText from "@/components/ScreenText"
  import ScreenHTML from "@/components/ScreenHTML"
  import ScreenIFrame from "@/components/ScreenIFrame"
  import WallpaperBgBing from "@/components/WallpaperBgBing"
  import WallpaperBgBase from "@/components/WallpaperBgBase"
  import LiteClockDigital from "@/components/LiteClockDigital"

  export default {
    name: 'Home',
    components: {
      FloatBar,
      ScreenClock,
      ScreenText,
      ScreenHTML,
      ScreenIFrame,
      WallpaperBgBing,
      WallpaperBgBase,
      LiteClockDigital
    },
    computed: {
      showMiniClock() {
        const screen = this.currentScreen

        if (!screen) {
          return false
        }

        const config = screen.config || {}

        return screen.type !== SCREEN_TYPES.clock ||
          (screen.type === SCREEN_TYPES.clock && !config.isAnalog)
      },
      currentScreen() {
        return this.screenList[this.currentPageIndex]
      },
      currentPageIndex: {
        get: () => store.getters.currentPageIndex,
        set: val => store.commit('setCurrentPageIndex', val)
      },
      isLightTheme: {
        get: () => store.getters.isLightTheme,
        set: val => store.commit('setIsLightTheme', val)
      },
      isBingWallpaper: {
        get: () => store.getters.isBingWallpaper,
        set: val => store.commit('setIsBingWallpaper', val)
      },
      isCustomWallpaper: {
        get: () => store.getters.isCustomWallpaper,
        set: val => store.commit('setIsCustomWallpaper', val)
      },
      customWallpaperUrl: {
        get: () => store.getters.customWallpaperUrl,
        set: val => store.commit('setCustomWallpaperUrl', val)
      },
      dataApiUrl: {
        get: () => store.getters.dataApiUrl,
        set: val => store.commit('setDataApiUrl', val)
      },
    },
    data() {
      return {
        store: store.state,
        SCREEN_TYPES: Object.freeze(SCREEN_TYPES),
        screenList: [],
        isLoading: false,
        sidebarOpened: false
      }
    },
    created() {
      this.fetchData()
    },
    methods: {
      refreshData() {
        this.initIndex = 0
        this.fetchData(true)
      },
      fetchData(showSuccess = false) {
        this.isLoading = true
        getData().then(data => {
          this.screenList = data.screenList

          if (showSuccess) {
            this.$buefy.toast.open({
              message: `获取DataAPI成功！`,
              position: 'is-bottom',
              type: 'is-success'
            })
          }

        }).catch(e => {
          this.$buefy.toast.open({
            message: `获取DataAPI失败，使用离线数据`,
            position: 'is-bottom',
            type: 'is-danger'
          })
          console.log(e)
          this.screenList = dataOffline.screenList
        }).finally(() => {
          this.isLoading = false
        })
      },
      changeCustomWallpaper() {
        this.$buefy.dialog.prompt({
          message: `自定义背景图片URL`,
          inputAttrs: {
            value: this.customWallpaperUrl,
            placeholder: 'https://api.ixiaowai.cn/api/api.php'
          },
          trapFocus: true,
          onConfirm: (value) => {
            this.customWallpaperUrl = value
          }
        })
      },
      showWallpaperHelp() {
        this.$buefy.dialog.alert({
          message: `<p>推荐使用小歪API：</p><pre><a href="https://api.ixiaowai.cn/api/api.php" target="_blank">https://api.ixiaowai.cn/api/api.php</a>（二次元动漫）<br><br><a href="https://api.ixiaowai.cn/mcapi/mcapi.php" target="_blank">https://api.ixiaowai.cn/mcapi/mcapi.php</a>（mc酱动漫）<br><br><a href="https://api.ixiaowai.cn/gqapi/gqapi.php" target="_blank">https://api.ixiaowai.cn/gqapi/gqapi.php</a>（高清壁纸）</pre>`,
          confirmText: 'Cool!'
        })
      },
      changeDataAPI() {
        this.$buefy.dialog.prompt({
          message: `设置DataAPI`,
          inputAttrs: {
            value: this.dataApiUrl,
            placeholder: 'data.json'
          },
          trapFocus: true,
          onConfirm: (value) => {
            this.dataApiUrl = value
            this.refreshData()
          }
        })
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .home-page {
    background $darkBg
    color $darkText
    transition all 1s

    &.light-theme {
      background $lightBg
      color $lightText
    }

    >>> .custom-wallpaper-bg {
      position: absolute;
      top: 0
      bottom: 0
      right: 0
      left: 0
    }

    .mini-clock-wrap {
      position: absolute;
      top: $commonPadding
      left: $commonPadding
      width 130px
      height 50px
    }
  }
</style>

<style lang="stylus">
  .settings-wrap {
    padding $commonPadding
    overflow-y auto

    .settings-close {
      position: absolute;
      right $commonPadding
      top $commonPadding
    }

    .settings-title {
      font-size: 20px
      margin-bottom: $commonPadding
    }

    .settings-row {
      margin-top: $commonPadding*2
      display flex
      align-items center

      .switch-full-width {
        width: 100%
      }
    }
  }

</style>
