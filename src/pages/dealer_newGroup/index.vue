<template>
  <!-- 新建小组 -->
  <div class="newGroup">
    <div class="memberGroup">
      <ul>
        <li>
          <a href="javascript:;">
            <span>选择组员</span>
          </a>
        </li>
        <li v-for="(item,index) in list" :key="index">
          <p>01 {{item.Name}}</p>
          <button type="button">设置为组长</button>
          <img src="./del_03.png" alt="">
        </li>
       
      </ul>
    </div>
    <button type="button" class="addMember" @click="addMember">＋添加组员</button>
    <div class="bottom">
      <div class="title">申请说明</div>
      <textarea name="" id="" cols="30" rows="10" placeholder="请输入小组申请说明"></textarea>
    </div>
    <button type="button" class="submit">提交审核</button>
  </div>
</template>

<script>
  export default {
    name: 'newGroup',
    created(){
      this.list =JSON.parse( localStorage.getItem("select"))
    },
    methods:{
      addMember(){
        this.$router.push({
          path:"/selectMember"
        })
      }
    }
  }

</script>

<style scoped>
  .newGroup {
    width: 100%;
    overflow: hidden;
  }

  .memberGroup {
    width: 100%;
    margin-top: 12px;
    background: white;

  }

  .memberGroup ul {
    width: 96%;
    margin: 0 auto;
  }

  .memberGroup ul li {
    border-top: 1px solid #B1B1B1;
    height: 46px;

  }

  .memberGroup ul li button {
    float: left;
    display: block;
    border-radius: 4px;
    padding: 0 12px;
    font-size: 12px;
    font-family: PingFangSC-Regular;
    color: rgba(255, 255, 255, 1);
    line-height: 26px;
    margin-right: 14px;
    margin-top: 8px;
  }

  .memberGroup ul li img {
    float: left;
    display: block;
    width: 30px;
    height: 30px;
    margin-top: 8px;
  }

  .memberGroup ul li:nth-child(1) {
    border: none;

  }
  .memberGroup ul li:nth-child(1) a{
      display: block;
  }
  .memberGroup ul li:nth-child(1) a span{
    font-size: 14px;
    font-family: PingFangSC-Medium;
    color: rgba(128, 128, 128, 1);
    line-height: 46px;
  }

  .memberGroup ul li:nth-child(2) {
    font-size: 14px;
    font-family: PingFangSC-Regular;
    color: rgba(77, 77, 77, 1);
    line-height: 46px;
  }

  .memberGroup ul li:nth-child(2) p {
    float: left;
    margin-right: 163px;
  }

  .memberGroup ul li:nth-child(2) button {
    background: #E2C78F;
  }

  .memberGroup ul li:nth-child(3) {
    font-size: 14px;
    font-family: PingFangSC-Regular;
    color: rgba(77, 77, 77, 1);
    line-height: 40px;

  }

  .memberGroup ul li:nth-child(3) p span {
    font-size: 14px;
    font-family: PingFangSC-Regular;
    color: #CCCCCC;
    line-height: 46px;

  }

  .memberGroup ul li:nth-child(3) p {
    float: left;
    margin-right: 163px;
  }

  .newGroup .addMember {
    display: block;
    width: 100%;
    height: 46px;
    line-height: 46px;
    text-align: center;
    font-size: 14px;
    font-family: PingFangSC-Regular;
    color: rgba(128, 128, 128, 1);


  }

  .bottom {
    padding: 0 16px;
    height: 320px;
    margin: 0 auto;
    background: white;
    margin-bottom: 30px
  }

  .bottom .title {
    width: 98%;
    height: 46px;
    border-bottom: 1px solid #B1B1B1;
    line-height: 46px;
    margin: 0 auto;

  }

  .bottom textarea {
    padding-top: 14px;
    padding-left: 4px;
  }

  .bottom textarea::placeholder {
    font-size: 14px;
    font-family: PingFangSC-Regular;
    color: rgba(204, 204, 204, 1);

  }

  .submit {
    display: block;
    width: 80%;
    height: 40px;
    margin: 0 auto;
    border-radius: 20px;
    box-shadow: 6px 10px 15px rgba(223, 174, 72, 0.2);
    background: linear-gradient(left, #E2C78F, #D5AE61);
    font-size: 14px;
    font-family: PingFangSC-Regular;
    color: rgba(255, 255, 255, 1);
    line-height: 40px;
  }

</style>
