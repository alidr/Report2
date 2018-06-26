const Appeal = () =>
  import ('@/pages/dealer_Appeal')
const ApprovalCompany = () =>import ('@/pages/manager_approvalCompany')
const CompanyContract = () =>import ('@/pages/manager_companyContract')
const GiveUpCompany = () =>import ('@/pages/manager_giveUpCompany')
const UserList = () =>
  import ('@/pages/admin_UserList')
const AppealManger = () =>
  import ('@/pages/manager_AppealManger')

export default [
{
  path: '/approvalCompany',
  component: ApprovalCompany,
  meta: {
      title: '新建公司待审批'
  },
},
{
  path: '/companyContract',
  component: CompanyContract,
  meta: {
      title: '新建公司已签约'
  },
},
{
  path: '/giveUpCompany',
  component: GiveUpCompany,
  meta: {
      title: '放弃跟进'
  },
}, {
  path: '/appealManger',
  component: AppealManger,
  meta: {
    title: '跟进申诉'
  },
}, {
  path: '/UserList',
  component: UserList,
  meta: {
    title: '用户列表'
  },
}, , {
  path: '/appeal',
  component: Appeal,
  meta: {
    title: '申诉审批'
  },
},
]
