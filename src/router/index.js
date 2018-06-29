import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'
import Login from '@/pages/login'
import NotFound from '@/pages/notFound'
import Home from '@/pages/home'
import AccountManagement from '@/pages/accountManagement'
import CompanyList from '@/pages/admin_HomeDecoration'
import CompanyDetail from '@/pages/companyDetail'
import ModifyPsd from '@/pages/modifyPsd'
import AnnounceList from "@/pages/AnnounceList";
import CompeteProductAnalysis from "@/pages/competeProductAnalysis";
import MessageCenter from "@/pages/messageCenter";
import AppealDetails from "@/pages/manager_appealDetails"
import Announce from "@/pages/Announce"
import ApprovalRecord from "@/pages/busniess_ApprovalRecord";


Vue.use(Router)

// const Home = () => import ('@/pages/home')

 
let router = new Router({
  routes: [
    {
      path: '/',
      redirect: store.state.AccessId ? '/home' : '/login'
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
       meta: {
        title: '登录'
      }
    },
    {
      path: '/home',
      component: Home,
      meta: {
        title: '首页'
      }
    }, {
      path: '/accountManagement',
      component: AccountManagement,
      meta: {
          title: '账户管理'
      }
    }, {
      path: '/companyList',
      component: CompanyList,
      meta: {
        title: '家装公司列表'
      }
    }, {
      path: '/companyDetail',
      component: CompanyDetail,
      meta: {
        title: '公司详情'
      }
    }, {
      path: '/modifyPsd',
      component: ModifyPsd,
      meta: {
        title: '修改密码'
      }
    }, {
      path: '/announceList',
      component: AnnounceList,
      meta: {
        title: '公告栏'
      }
    },
    {
      path: '/announce',
      component: Announce,
      meta: {
        title: '公告栏'
      }
    },
     {
      path: '/competeProduct',
      component: CompeteProductAnalysis,
      meta: {
        title: '竞品分析'
      }
    },
     {
      path: '/messageCenter',
      component: MessageCenter,
      meta: {
        title: '消息中心'
      }
    }, {
      path: '/appealDetails',
      component: AppealDetails,
      meta: {
        title: '申诉详情'
      },
    },
    {
      path: '/approvalRecord',
      component: ApprovalRecord,
      meta: {
        title: '审批记录'
      },
    },
    {
      path: '/404',
      component: NotFound,
      meta: {
          title: '页面未找到'
      }
    },

  ]
})
router.beforeEach((to, from, next) => {
  /* 路由发生变化修改页面title */
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})

export default router
