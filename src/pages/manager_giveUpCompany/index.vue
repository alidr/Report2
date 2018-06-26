<template>
  <div class="giveUpCompany">
    <div class="top">
      <img src="./images/222_03.png" alt="">
      <p>很遗憾，xxx公司已签约</p>
    </div>
    <div class="content">
      <ul>
        <li>
          <p>经销商：张小包</p>
        </li>
        <li>
          <p>业务员：刘小白</p>
        </li>
      </ul>
    </div>
    <button type="button" class="sure">返回首页</button>
  </div>
</template>

<script>
  export default {
    name: 'giveUpCompany'
  }

</script>

<style scoped>
  .giveUpCompany {
    width: 100%;
    overflow: hidden;
  }

  .top {
    width: 100%;
    background: #fff5e7;
    padding: 12px 22px;
    margin-bottom: 16px;
    box-shadow: 0px 6px 10px #f2eee7;
    
    

  }

  .top img {
    float: left;
    display: block;
    width: 22px;
    height: 22px;
    margin-right: 14px;
  }

  .top p {
    font-size: 14px;
    color: #f07058;
    line-height: 22px;
  }

  .content {
    width: 92%;
    margin: 0 auto;
    background: white;
    border-radius: 4px;

  }
.content ul li{
    width: 92%;
    margin: 0 auto;
    border-top: 1px solid #f0f0f0;
}
.content ul li p{
    font-size: 14px;
    color: #666666;
    line-height: 44px;
}
.content ul li:nth-child(1){
    border:none;
}
  .sure {
    width: 80%;
    height: 40px;
    border-radius: 20px;
    position: fixed;
    bottom: 38px;
    left: 0;
    right: 0;
    margin: auto;
    background: #d4d4d4;
    font-size: 14px;
    color: white;
    text-align: center;
    line-height: 40px;
    background: linear-gradient(left, #E2C78F, #D5AE61);
    box-shadow: 0px 6px 10px rgba(223, 174, 72, 0.2);
  }

</style>
