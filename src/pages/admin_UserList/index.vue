<template>
  <!-- 用户列表管理 -->
  <div class="UserList">
    <div class="top">
      <div class="search">
        <input type="text" placeholder="请搜索公司名称关键词">
        <span>搜索</span>
      </div>
      <button type="button" v-if="isShow" @click="addUser" >添加</button>
      <div class="classList">
        <ul>
          <li>
            <p>{{AllpostSelect}}</p>
            <span @click="maskStatus(0)"></span>
          </li>
          <li>
            <p>{{TimeSelect}}</p>
            <span @click="maskStatus(1)"></span>
          </li>

        </ul>

      </div>
    </div>
    <div class="UserListAll">
      <ul>
        <li v-for="(item,index) in list" :key="index">
          <a href="javascript:;" @click="editUser(item.ID)">
            <div class="listTop">
              <p>{{item.Name}}</p>
              <b>
                <span>岗位： {{item.JobName}}</span>
              </b>
              <b>
                <span>组织： {{item.Organization}}</span>
              </b>
              <img src="./delete.png" alt="" @click.stop="deleteUser(item.ID)">
            </div>

            <div class="listBottom" >
              <p v-if="item.IsShow">已签约／总数：
                <span>{{item.Count}}</span>／{{item.TotalCount}}</p>
              <i>点击详情>></i>
            </div>
          </a>

        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import axios from "axios"
import qs from "qs";
export default {
    name: 'UserList',
    data(){
      return{
        JobId:'',
        Sort:'',
        Keyword:'',
        list:[],
        isShow:false,
        // 全部岗位
        Allpost:[{
          id:'',
          name:'全部岗位'
        },{
          id:1,
          name:'管理员'
        },{
          id:2,
          name:'分公司总经理'
        },{
          id:3,
          name:'部门经理'
        },{
          id:4,
          name:'区域经理'
        },{
          id:5,
          name:'经销商'
        },{
          id:6,
          name:'业务员'
        }],
        // 新建时间顺序
        Time:[{
          id:1,
          name:'新建时间顺序'
        },{
          id:2,
          name:'新建时间逆序'
        }],
        AllpostHasActive:0,
        AllpostSelect:"全部岗位",
        TimeHasActive:0,
        TimeSelect:"新建时间顺序",
      }
    },
    computed: {
    ...mapGetters([
      'AccessId'
    ])
    },
    created(){
      if (this.AccessId==-1 || this.AccessId==3) {
        //管理员
        this.getList()
        this.isShow = true
      }else if (this.AccessId==4 ) {
        //经销商
        this.getBusiness()
      }
      
      
    },
    methods:{
      getList(){
        // console.log(222)
        axios({
          url:this.getHost()+'/UserInfo/GetUserInfoList', 
          method:'post',
          data:qs.stringify({
            UserId:getCookie('UserId'),
            token:getCookie('token'),
            Keyword:this.Keyword,
            JobId:this.JobId,
            Sort:this.Sort,
          })
        })
        .then(res=>{
          console.log(res)
          if (res.data.Status===1) {
            this.list = res.data.Data.list
          }else if (res.data.Status<0) {
            this.delCookie("UserId")
            this.delCookie("token")
            this.setAccessId('')
            location.replace('/')
          }
          else{
            this.getToast(res.data.Message,'warn')
          }
        })
        .catch(res=>{
          this.getToast(res.data.Message,'warn')
        })
      },
      getBusiness(){
        console.log(222)
        axios({
          url:this.getHost()+'/Approval/GetUserList', 
          method:'post',
          data:qs.stringify({
            UserId:getCookie('UserId'),
            token:getCookie('token'),
            Keyword:this.Keyword,
            JobId:this.JobId,
            Sort:this.Sort,
          })
        })
        .then(res=>{
          console.log(res)
          if (res.data.Status===1) {
            this.list = res.data.Data.list
          }else if (res.data.Status<0) {
            this.delCookie("UserId")
            this.delCookie("token")
            this.setAccessId('')
            location.replace('/')
          }
          else{
            this.getToast(res.data.Message,'warn')
          }
        })
        .catch(res=>{
          this.getToast(res.data.Message,'warn')
        })
      },
      maskStatus(index){
        if (this.hasMask[index] == true) {
          
          this.hasMask[index] = false   
        }else{
            
            this.hasMask[index] = true

          }
        for (let i = 0; i < this.hasMask.length; i++) {
          
          if (index==i) {
            continue
          }
          this.hasMask[i] = false
        }
        this.Mask = this.hasMask[index]?true:false
      },
      AllpostHasActive(index,name){
      this.AllpostHasActive = index
      this.AllpostSelect = name
      },
      TimeHasActive(index,name){
        this.TimeHasActive = index
        this.TimeSelect = name
      },
      addUser(){
        this.$router.push({'path':'/addUser'})
      },
      editUser(ID){
         this.$router.push({path:'/editUser',query:{id:ID}})
      },
      deleteUser(ID){
          axios({
          url:this.getHost()+'/UserInfo/DelUserInfo', 
          method:'post',
          data:qs.stringify({
            UserId:getCookie('UserId'),
            token:getCookie('token'),
            Id:ID
          })
        })
        .then(res=>{
          console.log(res)
          if (res.data.Status===1) {
            this.getToast("删除成功",'warn')
            this.getList()
          }else if (res.data.Status<0) {
            this.delCookie("UserId")
            this.delCookie("token")
            this.setAccessId('')
            location.replace('/')
          }
          else{
            this.getToast(res.data.Message,'warn')
          }
        })
        .catch(res=>{
          this.getToast(res.data.Message,'warn')
        })
      }
    }
  }

</script>

<style scoped>
  .UserList {
    width: 100%;
    overflow: hidden;
  }

  .top {
    width: 100%;
    overflow: hidden;
    margin: 0 auto;
    padding-top: 20px;
    background: white;
    padding-bottom: 16px;
    margin-bottom: 12px;
  }

  .top .search {
    float: left;
    width: 74%;
    height: 40px;
    margin-left: 15px;
    position: relative;

  }

  .top .search input {
    width: 80%;
    height: 96%;
    border: none;
    background: none;
    padding-left: 14px;
    border: 1px solid rgba(208, 208, 208, 1);
    border-radius: 4px;

  }

  .top .search span {
    display: block;
    width: 18%;
    height: 40px;
    background: rgba(182, 160, 121, 1);
    border-radius: 0px 4px 4px 0px;
    position: absolute;
    right: 0;
    top: 0;
    font-size: 14px;
    font-family: PingFangSC-Regular;
    color: rgba(255, 255, 255, 1);
    line-height: 40px;
    text-align: center;
  }

  .top button {
    float: right;
    display: block;
    width: 14%;
    height: 40px;
    background: rgba(226, 199, 143, 1);
    border-radius: 2px;
    margin-right: 18px;
    font-size: 14px;
    font-family: PingFangSC-Regular;
    color: rgba(255, 255, 255, 1);
    line-height: 40px;
    text-align: center;

  }

  .top .classList {
    width: 92%;
    overflow: hidden;
    margin: 0 auto;
    padding-top: 22px;
  }

  .top .classList ul {
    width: 100%;
    overflow: hidden;
    display: flex;
    justify-content: space-between
  }

  .top .classList ul li {
    width: 46%;
    height: 24px;
    overflow: hidden;
    position: relative;
  }

  .top .classList ul li p {
    display: block;
    width: 78%;
    height: 22px;
    border: 1px solid rgba(182, 160, 121, 1);
    ;
    border-radius: 4px;
    font-size: 12px;
    line-height: 22px;
    padding-left: 6px;

  }

  .top .classList ul li span {
    width: 20%;
    height: 24px;
    position: absolute;
    top: 0;
    right: 2px;
    background: rgba(182, 160, 121, 1);
    border-radius: 0px 4px 4px 0px;
  }

  .top .classList ul li span::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    margin: auto;
    width: 0;
    height: 0;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-top: 5px solid white;
  }

  .UserListAll {
    width: 92%;
    overflow: hidden;
    margin: 0 auto;
  }

  .UserListAll ul {
    width: 100%;
    overflow: hidden;
  }

  .UserListAll ul li {
    width: 100%;
    overflow: hidden;
    height: 80px;
    background: rgba(255, 255, 255, 1);
    border-radius: 8px;
    margin-bottom: 15px;
    padding-bottom: 20px;
  }

  .UserListAll ul li a {
    display: block;
    width: 100%;
    overflow: hidden;

  }

  .UserListAll ul li a .listTop {
    width: 92%;
    overflow: hidden;
    margin: 0 auto;
    border-bottom: 1px solid #B1B1B1;
    padding-top: 14px;
    padding-bottom: 10px;
    position: relative;
  }

  .UserListAll ul li a .listTop p {
    /* float: left; */
    font-size: 16px;
    font-family: PingFangSC-Regular;
    color: rgba(51, 51, 51, 1);
    font-weight: 650;
    margin-right: 26px;

  }

  .UserListAll ul li a .listTop b {
    float: left;
    font-size: 12px;
    font-family: PingFangSC-Regular;
    color: rgba(51, 51, 51, 1);
    font-weight: normal;
    margin-right: 12px;
    line-height: 22px;

  }

  .UserListAll ul li a .listTop img {
    position: absolute;
    right: 0px;
    /* float: right; */
    display: block;
    width: 35px;
    /* height: 12px; */
    margin-right: 15px;

  }


  .UserListAll ul li a .listBottom {
    width: 100%;
    overflow: hidden;
    margin: 0 auto;
    padding-top: 10px;
  }

  .UserListAll ul li a .listBottom p {
    float: left;
    font-size: 12px;
    font-family: PingFangSC-Regular;
    color: rgba(102, 102, 102, 1);
    padding-left: 14px;
  }

  .UserListAll ul li a .listBottom p span {
    font-size: 14px;
    font-family: PingFangSC-Regular;
    color: #B6A079;
  }

  .UserListAll ul li a .listBottom i {
    float: right;
    font-size: 12px;
    font-family: PingFangSC-Regular;
    color: rgba(51, 51, 51, 1);
    margin-right: 11px;
    font-style: normal;
  }

</style>
