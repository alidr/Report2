<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import AdminRouer from './router/adminRouter.js'
import BusinessRouter from './router/businessRouter.js'
import DealerRouter from './router/dealerRouter.js'
import ManagerRouter from './router/managerRouter.js'

export default {
  name: 'App',
  computed: {
    ...mapGetters([
      'AccessId'
    ])
  },
  watch: {
    'AccessId': function() {
      this.initRouter()
    }
  },
  methods: {
    initRouter() {
      let AccessId = this.AccessId
      if (AccessId == -1) {
        this.$router.addRoutes(AdminRouer)
      } else if (AccessId == 5) {
        this.$router.addRoutes(BusinessRouter)
      } else if (AccessId == 4) {
        this.$router.addRoutes(DealerRouter)
      }else if (AccessId == 3 ||AccessId == 2||AccessId == 1) {
        this.$router.addRoutes(ManagerRouter)
      }
      this.$router.addRoutes([{
        path: '*',
        redirect: '/404'
      }])
    }
  },
  mounted() {
    if (this.AccessId) {
      this.initRouter()
    }
  }
}
</script>

<style>
#app {
  font-size: 14px;
  height: 100%;
}
#uploadContract .cube-upload .cube-upload-file, .cube-upload-btn{
  margin: 0;
  padding: 20px;
  box-sizing: border-box;
}
#uploadContract .cube-upload-file-def{
  width: 100% !important;
  height: 60vh !important;
}
#uploadContract .cube-upload-btn-def{
  width: 100% !important;
  height: 60vh !important;
  background-color: #f0f0f0;
}

 .cube-upload-file + .cube-upload-btn {
      margin-top: -200px;
      opacity: 0;
 }
</style>
