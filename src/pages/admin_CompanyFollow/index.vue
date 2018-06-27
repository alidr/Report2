<template>
  <!-- 公司待跟进 -->
  <div class="CompanyFollow">
    <div class="top">
      <div class="search">
        <input type="text" placeholder="请搜索公司名称关键词">
        <span>搜索</span>
      </div>
      <div class="classList">
<<<<<<< HEAD
        <ul>
          <li>
            <p>全部类型</p>
            <span></span>
          </li>
          <li>
            <p>所有状态</p>
            <span></span>
          </li>
          <li>
            <p>组员</p>
            <span></span>
          </li>
        </ul>

=======
          <div class="filter">
              <span class="filterResult">{{AllSelect}}</span>
              <span class="iconfont icon-xiaosanjiao icon" @click="maskStatus(0)"></span>
          </div>
          <div class="filter">
            <span class="filterResult">{{StatesSelect}}</span>
            <span class="iconfont icon-xiaosanjiao icon" @click="maskStatus(1)"></span>
        </div>
>>>>>>> 1fd1e8fb96e3c302f81179141e32c20286e49821
      </div>
      <!-- <ul class="selectListStatus" v-show="hasMask[0]">
          <li v-for="(item,index) in Status" :key="index" :class="{active:index==AllHasActive}" @click="AllHasActive(index,item.name)">{{item.name}}</li>
          <div class="mask"></div>
        </ul>
        <ul class="selectListStyle" v-show="hasMask[1]">
          <li v-for="(item,index) in Style" :key="index" :class="{active:index==StatesHasActive}" @click="StatesHasActive(index,item.name)">{{item.name}}</li>
          <div class="mask"></div>
        </ul> -->
    </div>
    <div class="companyList">
      <ul>
        <li v-for="(item,index) in list" :key="index" @click="companyDetail(item.ID)">
          <a href="javascript:;">
            <div class="listTop">
              <span v-if="item.IsEmphasis">
                <img src="./guanzhu_03.png" alt="">
              </span>
              <b>剩余保护期：{{item.EndDate}}天</b>
            </div>
            <div class="listMid">
              <span :class="{active:checkBoxs[index]}" v-if="select" @click="check(index,item.ID)"></span>
              <button type="button">{{item.StatusName}}</button>
              <p>{{item.Name}}</p>
            </div>
            <div class="listBottom">
              <i>{{item.CreateDate}}</i>
              <p>{{item.Content}}</p>
              <b>{{item.UserName}}</b>
            </div>
          </a>

        </li>
      </ul>
    </div>

    <footer v-if="selected">
      <span :class="{active:checkAllBox}" @click="checkAll(list)"></span>
      <p>已选择
        <b>{{idList.length}}</b>个家装公司</p>
      <button type="button" @click="distribution">分配业务员</button>
    </footer>
  </div>
</template>

<script>
  import qs from 'qs'
  import axios from "axios";
  import { mapGetters, mapMutations } from 'vuex'
  export default {
    name: 'CompanyFollow',
    data(){
      return{
        list:[],
        checkBoxs:[],
        checkAllBox:false,
        idList:[],
<<<<<<< HEAD
        selected:true
=======
        All:[{
          id:'',
          name:'全部岗位'
        },{
          id:1,
          name:'传统公司'
        },
        {
          id:2,
          name:'XXXX'
        }],
        // 所有状态
        States:[{
          id:1,
          name:'已放弃'
        },{
          id:2,
          name:'已删除'
        },{
          id:3,
          name:'已新建'
        }],
        AllHasActive:0,
        AllSelect:"全部类型",
        StatesHasActive:0,
        StatesSelect:"所有状态",
>>>>>>> 1fd1e8fb96e3c302f81179141e32c20286e49821
      }
    },
    created(){
      localStorage.removeItem("CompanyID")
      if (this.AccessId==-1) {
        this.getList()
      }else if (this.AccessId==5){
        this.getMyMember()
        this.selected = false
      } 
    },
     computed: {
      ...mapGetters([
        'AccessId'
      ])
    },
    methods:{
      companyDetail(id){
        this.$router.push({
          path:'/companyDetail',
          query:{
            id:id,
            stylePlay:1
          }
        })
      },
      getMyMember(){
        axios({
          url:this.getHost()+'/UserInfo/GetUserCompanyList', 
          method:'post',
          data:qs.stringify({
            UserId:getCookie('UserId'),
            token:getCookie('token'),
            Status:"",
            CategoryID:'',
            keyword:'',
            SaleID:'',
            // Page:1
          })
        })
        .then(res=>{
          console.log(res)
          if (res.data.Status===1) {
            this.list  = res.data.Data.list          
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
      },
      getList(){
        axios({
          url:this.getHost()+'/Admin/WaitFollowList', 
          method:'post',
          data:qs.stringify({
            UserId:getCookie('UserId'),
            token:getCookie('token'),
            Status:"",
            CompanyTypeID:'',
            keyword:''

          })
        })
        .then(res=>{
          console.log(res)
          if (res.data.Status===1) {
            this.list  = res.data.Data.list
            for (let i = 0; i < this.list.length; i++) {
              this.checkBoxs.push(false)
              
            } 
            console.log(this.checkBoxs);
                      
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
      },
      check(index,id){
        console.log(index)
        if (this.checkBoxs[index]) {
          this.checkBoxs[index]=false
          this.checkAllBox = false
          for (let i = 0; i <  this.idList.length; i++) {
          if (this.idList[i]==id) {
            this.idList.splice(i)
            }
          }

          for (let i = 0; i < this.checkBoxs.length; i++) {
          if (this.checkBoxs[i]) {
             this.checkAllBox = true
          }
        }
          
        }else{
          this.checkBoxs[index]=true
          this.idList.push(id)
          this.checkAllBox = true
        } 

        this.idList = this.idList.slice()
        this.checkBoxs = this.checkBoxs.slice()
        console.log(this.idList);
        

      },
      checkAll(list){
        
        if (this.checkAllBox) {
          console.log(111)
          this.checkAllBox =false
          console.log(this.checkBoxs);
          this.idList = this.idList.splice()
          for (let i = 0; i <list.length; i++) {
            this.checkBoxs[i]= false
          }
          this.checkBoxs = this.checkBoxs.slice()
        }else{
          console.log(222);
          
          this.checkAllBox = true
          for (let i = 0; i < list.length; i++) {
            this.checkBoxs[i] = true
            this.idList.push(list[i].ID)
          }
           this.checkBoxs = this.checkBoxs.slice()
           this.idList = this.idList.slice()
           console.log(this.checkBoxs);
        }
        console.log(this.idList);

      },
      distribution(){
        if (this.idList.length==0) {
          this.getToast("请选择要分配的公司",'warn')
        }else{
          localStorage.setItem("CompanyID",JSON.stringify(this.idList))
          this.$router.push({
            path:'/SalesmanList'
          })
        }
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
      AllHasActive(index,name){
      this.AllHasActive = index
      this.AllSelect = name
      },
      StatesHasActive(index,name){
        this.StatesHasActive = index
        this.StatesSelect = name
      },

    }
  }

</script>

<style scoped>
  @import '../../common/filter.css';
  .CompanyFollow {
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
    width: 92%;
    height: 44px;
    margin: 0 auto;
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
    height: 44px;
    background: rgba(182, 160, 121, 1);
    border-radius: 0px 4px 4px 0px;
    position: absolute;
    right: 0;
    top: 0;
    font-size: 14px;
    font-family: PingFangSC-Regular;
    color: rgba(255, 255, 255, 1);
    line-height: 44px;
    text-align: center;
  }

  .top .classList {
    width: 92%;
    overflow: hidden;
    margin: 0 auto;
    padding-top: 22px;
    display: flex;
    justify-content: space-between;
  }
  .top .classList .filter{
    margin-right: 0;
    width: 42%;
    flex: none;
  }


  .companyList {
    width: 92%;
    overflow: hidden;
    margin: 0 auto;
  }

  .companyList ul {
    width: 100%;
    overflow: hidden;
  }

  .companyList ul li {
    width: 100%;
    overflow: hidden;
    height: 116px;
    background: rgba(255, 255, 255, 1);
    border-radius: 8px;
    margin-bottom: 15px;
  }

  .companyList ul li a {
    display: block;
    width: 100%;
    overflow: hidden;

  }

  .companyList ul li a .listTop {
    width: 100%;
    overflow: hidden;
  }

  .companyList ul li a .listTop span {
    display: block;
    width: 26px;
    height: 24px;
    background: rgba(242, 111, 83, 1);
    border-radius: 6px 0;
    float: left;
    position: relative;

  }

  .companyList ul li a .listTop span img {
    display: block;
    width: 12px;
    height: 12px;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
  }

  .companyList ul li a .listTop b {
    float: right;
    font-size: 12px;
    color: rgba(242, 111, 83, 1);
    font-weight: normal;
    padding-top: 10px;
    margin-right: 4px;
  }

  .companyList ul li a .listMid {
    overflow: hidden;
    width: 88%;
    padding-top: 16px;
    margin: 0 auto;
    padding-bottom: 14px;
    border-bottom: 1px solid #F0F0F0;
    margin-bottom: 12px;
  }

  .companyList ul li a .listMid span {
    float: left;
    display: block;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    margin-left: 6px;
    border: 1px solid #ccc;
    position: relative;
    margin-right: 14px;
  }
  .companyList ul li a .listMid span.active{
    border: 1px solid rgba(226, 199, 143, 1);
  }
  .companyList ul li a .listMid span.active::before{
    background: rgba(226, 199, 143, 1);
  }
  .companyList ul li a .listMid span::before {
    content: '';
    width: 14px;
    height: 14px;
    border-radius: 50%;
    background-color: #ccc;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;


  }

  .companyList ul li a .listMid button {
    display: block;
    float: left;
    width: 22%;
    height: 20px;
    background: rgba(207, 207, 207, 1);
    border-radius: 3px;
    font-size: 10px;
    font-family: PingFangSC-Regular;
    color: rgba(255, 255, 255, 1);
    line-height: 18px;
    text-align: center;
    margin-right: 12px;
  }

  .companyList ul li a .listMid p {
    float: left;
    font-size: 14px;
    font-family: PingFangSC-Regular;
    color: rgba(51, 51, 51, 1);
    line-height: 20px;
  }

  .companyList ul li a .listBottom {
    width: 100%;
    overflow: hidden;
    margin: 0 auto;
  }

  .companyList ul li a .listBottom i {
    float: left;
    font-size: 10px;
    color: rgba(102, 102, 102, 1);
    font-style: normal;
    margin-right: 16px;
    padding-left: 23px;
  }

  .companyList ul li a .listBottom p {
    float: left;
    font-size: 12px;
    font-family: PingFangSC-Regular;
    color: rgba(102, 102, 102, 1);
  }

  .companyList ul li a .listBottom b {
    float: right;
    font-size: 12px;
    font-family: PingFangSC-Regular;
    color: rgba(51, 51, 51, 1);
    margin-right: 7px;
  }

  footer {
    width: 100%;
    height: 55px;
    background: #636770;
    position: fixed;
    bottom: 0;
    left: 0;
  }

  footer span {
    float: left;
    display: block;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    margin-left: 6px;
    border: 1px solid #ccc;
    position: relative;
    margin-right: 14px;
    margin-top: 19px;
    margin-left: 36px;
  }
  footer span.active{
     border: 1px solid rgba(226, 199, 143, 1);
  }
  footer span.active::before{
    background: rgba(226, 199, 143, 1);
  }
  footer span::before {
    content: '';
    width: 14px;
    height: 14px;
    border-radius: 50%;
    position: absolute;
    background: #ccc;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;


  }

  footer p {
    float: left;
    font-size: 16px;
    font-family: PingFangSC-Regular;
    color: rgba(255, 255, 255, 1);
    line-height: 55px;
  }

  footer button {
    float: right;
    display: block;
    width: 115px;
    height: 40px;
    /* background: rgba(212, 212, 212, 1); */
    border-radius: 4px;
    background: #E2C78F;
    font-size: 14px;
    font-family: PingFangSC-Regular;
    color: rgba(255, 255, 255, 1);
    line-height: 40px;
    text-align: center;
    margin-right: 24px;
    margin-top: 8px;
  }

</style>
