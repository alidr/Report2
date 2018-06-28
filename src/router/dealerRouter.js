const Demo = () =>
  import ('@/pages/dealer_demo')
const Appeal = () =>
  import ('@/pages/dealer_Appeal')
const AppealFollowUp = () =>
  import ('@/pages/dealer_appealFollowUp')
const Allgroups = () =>
  import ('@/pages/dealer_allgroups')
const NewGroup = () =>
  import ('@/pages/dealer_newGroup')
const SelectMember = () =>
  import ('@/pages/dealer_selectMember')
const WaitGroup = () =>
  import ('@/pages/dealer_waitGroup')
const UserList = () =>
  import ('@/pages/admin_UserList')
const MyGroup = () =>
  import ('@/pages/business_myGroup')
const SalesmanList = () =>
  import ('@/pages/SalesmanList')

export default [{
    path: '/demo',
    component: Demo,
    meta: {
      title: '经销商demo'
    },

  },
  {
    path: '/appeal',
    component: Appeal,
    meta: {
      title: '申诉审批'
    },
  },
  {
    path: '/appealFollowUp',
    component: AppealFollowUp,
    meta: {
      title: '跟进审批'
    },
  },
  {
    path: '/allgroups',
    component: Allgroups,
    meta: {
      title: '所有小组'
    },
  },
  {
    path: '/newGroup',
    component: NewGroup,
    meta: {
      title: '新建小组'
    },
  },
  {
    path: '/selectMember',
    component: SelectMember,
    meta: {
      title: '选择组员'
    },
  },
  {
    path: '/waitGroup',
    component: WaitGroup,
    meta: {
      title: '待审批小组'
    },
  },
   {
     path: '/UserList',
     component: UserList,
     meta: {
       title: '用户列表'
     },
   }, {
     path: '/myGroup',
     component: MyGroup,
     meta: {
       title: '我的小组'
     },
   } ,{
     path: '/SalesmanList',
     component: SalesmanList,
     meta: {
       title: '业务员列表'
     },
   },
]