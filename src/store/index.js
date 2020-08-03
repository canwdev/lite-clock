import Vue from 'vue'
import Vuex from 'vuex'
import {getSettingsLS, setSettingsLS} from "@/utils"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    settings: getSettingsLS() || {
      currentPageIndex: 0,
      isLightTheme: false,
      isBingWallpaper: false,
      isCustomWallpaper: false,
      customWallpaperUrl: null,
      dataApiUrl: 'data.json',
    }
  },
  getters: {
    currentPageIndex: state => state.settings.currentPageIndex,
    isLightTheme: state => state.settings.isLightTheme,
    isBingWallpaper: state => state.settings.isBingWallpaper,
    isCustomWallpaper: state => state.settings.isCustomWallpaper,
    customWallpaperUrl: state => state.settings.customWallpaperUrl,
    dataApiUrl: state => state.settings.dataApiUrl,
  },
  mutations: {
    setIsLightTheme: (state, val) => {
      state.settings.isLightTheme = val
      state.settings.isBingWallpaper = false
      state.settings.isCustomWallpaper = false
      setSettingsLS(state.settings)
    },
    setCurrentPageIndex: (state, val) => {
      state.settings.currentPageIndex = val
      setSettingsLS(state.settings)
    },
    setIsBingWallpaper: (state, val) => {
      state.settings.isBingWallpaper = val
      state.settings.isLightTheme = false
      state.settings.isCustomWallpaper = false
      setSettingsLS(state.settings)
    },
    setIsCustomWallpaper: (state, val) => {
      state.settings.isCustomWallpaper = val
      state.settings.isLightTheme = false
      state.settings.isBingWallpaper = false
      setSettingsLS(state.settings)
    },
    setCustomWallpaperUrl: (state, val) => {
      state.settings.customWallpaperUrl = val
      state.settings.isBingWallpaper = false
      state.settings.isLightTheme = false
      state.settings.isCustomWallpaper = true
      setSettingsLS(state.settings)
    },
    setDataApiUrl: (state, val) => {
      state.settings.dataApiUrl = val
      setSettingsLS(state.settings)
    },
    updateSettings(state, kv) {
      const {key, value} = kv
      this.state.settings[key] = value
      setSettingsLS(state.settings)
    }
  },
  actions: {
  },
  modules: {
  }
})
