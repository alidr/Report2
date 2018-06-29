<template>
<!-- 公告栏 -->
  <div id="AnnounceList">
    <div class="announceTop" v-if="announ">
      <span :class="{active:MyAnnounce==1}" @click="announce(1)">全部公告</span>
      <span :class="{active:MyAnnounce==2}" @click="announce(2)">我发布的</span>
    </div>
    <div class="announce">
      <div class="announceDetail"  v-if="MyAnnounce==1"
      v-for="(item,index) in list" :key="index"
      >
      <!-- <div class="announceDetail" @click="extend(index)" v-if="MyAnnounce==1"
      v-for="(item,index) in list" :key="index"
      > -->
        <p class="announceInfo">
          <span >{{item.Type}}</span>
          <span v-if="MyAnnounce==1">发布人：{{item.CreateUser}}</span>
          <span>{{item.CreateDate}}</span>
        </p>
        <div class="announceContent" :class="{active:true}">
          {{item.Content}}
        </div>
        <!-- <span class="line" :class="{active:isExtend}"></span> -->
         <!-- <span class="line" :class="{active:true}"></span> -->
      </div>

        <!-- 我发布的 -->
       <div class="announceDetail" v-if="MyAnnounce==2" v-for="(list,index) in MyList" :key="index">
        <p class="announceInfo" >
          <span >{{list.Type}}</span>
          <span>发布人：{{list.CreateUser}}</span>
          <span>{{list.CreateDate}}</span>
        </p>
        <div class="MyContent" :class="{active:true}">
           {{list.Content}}
        </div>
        <i @click="deleteAn(list.ID)"><img src="./delete.png" alt="" ></i>
      </div>

    </div>
    <router-link to="/announce" id="button" v-if="announ">发布公告</router-link>
  </div>
</template>

<script>
import qs from 'qs'
import axios from "axios";
import { mapGetters, mapMutations } from 'vuex'

export default {
  name: 'AnnounceList',
  data(){
    return{
      isExtend:false,
      MyAnnounce:1,
      list:[],
      MyList:[],
      announ:false
    }
  },
   computed: {
    ...mapGetters([
      'AccessId'
    ])
  },
  created(){
    this.getAllList()
    // console.log(this.AccessId);
    
    if (this.AccessId==1||this.AccessId==2||this.AccessId==-1) {
      this.announ = true
      // console.log(this.announ);
      
      this.getMyList()
    }
  },
  methods:{
    extend(){
      this.isExtend = !this.isExtend
    },
    announce(num){
      this.MyAnnounce = num
    },
    getAllList(){
      axios({
        url:this.getHost()+'/Notice/NoticeList', 
        method:'post',
        data:qs.stringify({
          UserId:getCookie('UserId'),
          token:getCookie('token')
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
    },
     getMyList(){
      axios({
        url:this.getHost()+'/Notice/MyNoticeList', 
        method:'post',
        data:qs.stringify({
          UserId:getCookie('UserId'),
          token:getCookie('token')
        })
      })
      .then(res=>{
        console.log(res)
        if (res.data.Status===1) {
          this.MyList = res.data.Data.list
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
    deleteAn(ID){
      axios({
        url:this.getHost()+'/Notice/DeleteNotice', 
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
          this.getMyList()
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
    ...mapMutations({
      setAccessId: 'SET_ACCESSID'
    }),
  }
}
</script>

<style scoped>
#AnnounceList{
  padding: 15px;
  box-sizing: border-box;
}
.announceTop{
  display: flex;
  justify-content: center;
  align-items: center;
}
.announceTop span{
  width: 105px;
  height: 30px;
  border-radius: 4px;
  margin-right: 18px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #ccc;
  border: 1px solid #ccc;
}
.announceTop span.active{
  background-color: #E2C78F;
  color: #fff;
  border: none;
}


.announceDetail{
  background-color: #fff;
  margin-top: 15px;
  border-radius: 4px;
  padding: 0 10px 10px;
  box-sizing: border-box;
  position: relative;
}
 .announceDetail i{
   display: block;
   text-align: right;
}
 .announceDetail i img{
  width: 40px;
}
.announceInfo{
  height: 52px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid #f0f0f0;
  padding: 0 10px;
  box-sizing: border-box;
  font-size: 12px;
}
.announceInfo span:first-child{
  width: 70px;
  background-color: #ccc;
  color: #fff;
  border-radius: 4px;
  padding: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.announceInfo span:nth-child(2){
  width: 0;
  flex-grow: 1;
  padding-right: 10px;
  box-sizing: border-box;
  text-align: right;
}
.announceContent{
  height: 70px;
  padding:10px;
  box-sizing: border-box;
  text-overflow: ellipsis;
    display: -webkit-box;
    overflow: hidden;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
  color: #4D4D4D;
  line-height: 20px;
  /* margin-bottom: 10px; */
}
.MyContent{
  height: auto !important;
  position: relative;
  padding-top: 10px;
}

.announceContent.active{
  display: block;
  height: auto;
}

.line{
  display: flex;
  width: 30px;
  height: 4px;
  border-radius: 2px;
  background: #ccc;
  margin: 0 auto;
}
.line.active{
  width: 260px;
  height: 1px;
}
#button{
  width: calc(100% - 80px);
  position: fixed;
  bottom: 40px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 99;
}

</style>
