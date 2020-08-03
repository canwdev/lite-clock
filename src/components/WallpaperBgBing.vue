<template>
  <WallpaperBgBase
    :wallpaper-url="wallpaperUrl"
    :description="footnoteText"
  />
</template>

<script>
  import {isProd} from "@/utils"
  import {BING_WALLPAPER_API} from "@/utils/enum"
  // 常量定义
  const BING_API = isProd ? BING_WALLPAPER_API : '/bing'
  const LS_BING_DATA = 'AWOS_BING_WALLPAPER'
  import axios from 'axios'
  import moment from 'moment'
  import WallpaperBgBase from "@/components/WallpaperBgBase"

  export default {
    name: "WallpaperBgBing",
    components: {
      WallpaperBgBase
    },
    data() {
      return {
        timeoutBingWallpaper: null,
        retryTimes: 0, // 防止死循环
        footnoteText: '',
        wallpaperUrl: null
      }
    },
    mounted() {
      this.setBingWallpaper()
    },
    beforeDestroy() {
      clearTimeout(this.timeoutBingWallpaper)
    },
    methods: {
      setBingWallpaper(clear = false) {

        const retryFail = this.retryTimes > 3
        if (clear || retryFail) {
          if (retryFail) {
            console.log('重试3遍仍然失败，取消请求')
            this.retryTimes = 0
          }
          clearTimeout(this.timeoutBingWallpaper)
          document.body.style.backgroundImage = null
          this.footnoteText = ''
          this.wallpaperUrl = null
          localStorage.removeItem(LS_BING_DATA)
          return
        }

        const lsData = JSON.parse(localStorage.getItem(LS_BING_DATA) || 'null')
        const expireTime = this.getBingWallpaperExpireTime(lsData)

        if (lsData && expireTime > 0) {
          this.setBingWallpaperDOM(lsData)
          this.autoUpdateBingWallpaper({expireTime})
          return
        }

        /**
         * 原接Bing存在跨域，需要使用反向代理
         * https://www.bing.com/HPImageArchive.aspx?format=js&idx=0&n=1
         */
        axios.get(BING_API + '/HPImageArchive.aspx?format=js&idx=0&n=1').then(res => {
          const {data} = res

          this.setBingWallpaperDOM(data)
          console.log('Bing壁纸更新！', moment(Date.now()).format('HH:mm:ss LL dddd'), data)

          localStorage.setItem(LS_BING_DATA, JSON.stringify(data))
          this.autoUpdateBingWallpaper({data})
          this.retryTimes = 0
        }).catch(e => {
          console.error(e)
          this.retryTimes++
        })


        // document.body.style.backgroundImage = `url('https://api.dujin.org/bing/1920.php')`
      },
      setBingWallpaperDOM(data) {
        const image = data.images[0]
        const url = `https://www.bing.com${image.url}`
        // document.body.style.backgroundImage = `url('${url}')`
        this.footnoteText = image.copyright
        this.wallpaperUrl = url
      },
      /**
       * 获取Bing壁纸到期时间
       */
      getBingWallpaperExpireTime(data) {
        if (!data) return 0

        const image = data.images[0]
        const endDateStr = image.enddate
        const year = Number.parseInt(endDateStr.substr(0, 4))
        const month = Number.parseInt(endDateStr.substr(4, 2))
        const day = Number.parseInt(endDateStr.substr(6, 2))

        const expireDate = new Date(year, month - 1, day + 1)
        const now = new Date()
        console.log('Bing壁纸过期时间', moment(expireDate).from(now))
        return expireDate - now
      },
      autoUpdateBingWallpaper({data, expireTime}) {
        clearTimeout(this.timeoutBingWallpaper)

        if (!expireTime) {
          expireTime = this.getBingWallpaperExpireTime(data)
        }

        // 定时自动刷新 Bing 壁纸（延迟1小时）
        expireTime += 600000

        this.timeoutBingWallpaper = setTimeout(this.setBingWallpaper, expireTime)
        console.log('下次Bing壁纸更新时间', moment(Date.now() + expireTime).format('HH:mm:ss LL dddd'))
      }
    }
  }
</script>

<style lang="stylus" scoped>
</style>
