export default {
  install(Vue, options) {
    //添加cookie
    Vue.prototype.getToast = function (txt, type) {
       const toast = this.$createToast({
         txt,
         mask: true,
         type,
         maskClosable: true,
         time: 1000,
       })
       toast.show()
    }
  }
}