<template>
    <!-- 待审批小组 -->
  <div class="waitGroup">
    <div class="title">
      当前一共有
      <span>xx</span>个小组待审批
    </div>
    <div class="waitGroupList">
      <ul>
        <li>
          <span>01</span>
          <div class="listTop">
            <p>组长 小黑 16780093876</p>
            <div class="upBtn">
              <button type="button" class="no">不通过</button>
              <button type="button" class="yes">审批通过</button>
            </div>
          </div>
          <div class="listBottom">
            <i>申请人 xxxx</i>
            <i>说明 xxxxxxxxxxxxxxx...</i>
            <router-link to="/">
              <span>查看申诉详情>></span>
            </router-link>
          </div>
        </li>
        <li>
                <span>01</span>
                <div class="listTop">
                  <p>组长 小黑 16780093876</p>
                  <div class="upBtn">
                    <button type="button" class="no">不通过</button>
                    <button type="button" class="yes">审批通过</button>
                  </div>
                </div>
                <div class="listBottom">
                  <i>申请人 xxxx</i>
                  <i>说明 xxxxxxxxxxxxxxx...</i>
                  <router-link to="/">
                    <span>查看申诉详情>></span>
                  </router-link>
                </div>
              </li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'waitGroup',
    data() {
      return {

      }
    },

  }

</script>

<style scoped>
  .title {
    background: rgba(255, 245, 231, 1);
    font-size: 12px;
    font-family: PingFangSC-Light;
    color: rgba(211, 180, 136, 1);
    line-height: 34px;
    padding-left: 16px;
    margin-bottom: 10px;
  }

  .waitGroupList {
    width: 96%;
    overflow: hidden;
    margin: 0 auto;
  }

  .waitGroupList ul {
    width: 100%;
    overflow: hidden;
  }

  .waitGroupList ul li {
    width: 100%;
    overflow: hidden;
    background: rgba(255, 255, 255, 1);
    border-radius: 4px;
    margin-bottom: 15px;
    padding-bottom: 18px;
    position: relative;
  }



  .waitGroupList ul li .listTop {
    width: 92%;
    overflow: hidden;
    margin: 0 auto;
    border-bottom: 1px solid #B1B1B1;
    padding-bottom: 10px;
    padding-top: 20px;
    display: flex;
    justify-content: space-between;
  }

  .waitGroupList ul li .listTop p {
    font-size: 14px;
    font-family: PingFangSC-Regular;
    color: rgba(51, 51, 51, 1);
    line-height: 28px;
  }

  .waitGroupList ul li>span {
    display: block;
    width: 26px;
    height: 24px;
    background: #D4A667;
    border-radius: 6px 0;
    float: left;
    line-height: 24px;
    text-align: center;
    color: #FBF7EE;
    position: absolute;
    top:0;left: 0;

  }

  .upBtn {
    display: flex;
    width: 40%;
    justify-content: space-between;
   
  }

  .upBtn button {
    display: block;
    border-radius: 3px;
    padding: 0 10px;
    line-height: 28px;
    text-align: center;
    font-size: 12px;
  }

  .upBtn .no {
    background: rgba(228, 228, 228, 1);
    color: rgba(178, 178, 178, 1);
  }

  .upBtn .yes {
    background: rgba(226, 199, 143, 1);
    color: rgba(255, 255, 255, 1);
  }


  .waitGroupList ul li .listTop span img {
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




  .waitGroupList ul li .listBottom {
    display: flex;
    width: 92%;
    overflow: hidden;
    margin: 0 auto;
    padding-top: 10px;
    justify-content: space-between;
  }


  .waitGroupList ul li .listBottom a {
    font-size: 12px;
    color: rgba(128, 128, 128, 1);
  }

  .waitGroupList ul li .listBottom i {
    font-style: normal;
    font-size: 12px;
    color: rgba(102, 102, 102, 1);
  }

</style>
