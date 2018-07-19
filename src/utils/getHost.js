export default {
  install(Vue, options) {
    //添加cookie
    Vue.prototype.getHost = function () {
      const getHost = "https://bbapi.efotile.com/api"
      return getHost
    }
    global.getHost = Vue.prototype.getHost;
    
    Vue.prototype.getImgHost = function () {
      const getImgHost = "https://bbapi.efotile.com/"
      return getImgHost
    }
  }
}