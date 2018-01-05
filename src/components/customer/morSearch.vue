<style lang="less" scoped>
 .btn-wrapper {
    padding: 10px;
    text-align: center;
    position: fixed;
    bottom: 0;
    width: 100%;
    button {
    background-color: #9F2D2B;
    color: #fff;
    border: none;
    width: 80%;
    line-height: 32px;
    font-size: 16px;
}
}
.mui-content {
  padding-top: 16px;
  font-size: 14px;
  span {
    font-size: 14px;
    float: right;
    margin-right: 20px;
    color: #ccc;
}
}
</style>
<template>
  <div>
    <header class="mui-bar mui-bar-nav">
    <h1 class="mui-title">查询条件</h1>
    <a class="mui-icon mui-icon-left-nav mui-pull-left mui-icon-back" @tap="$router.go(-1)"></a>
</header>
<div class="mui-content">
            <ul class="mui-table-view">
                <li class="mui-table-view-cell" @tap="select(0)">
                    <a class="mui-navigate-right">
                        机会范围
                        <!-- <span v-show="rangeItem.text" v-text="rangeItem.text" class="black"></span> -->
                        <span>选择机会范围</span>
                    </a>
                </li>
                <li class="mui-table-view-cell" @tap="select(1)">
                    <a class="mui-navigate-right">
                        客户来源
                        <!-- <span v-show="sourceItem.text" v-text="sourceItem.text" class="black"></span> -->
                        <span>选择客户来源</span>
                    </a>
                </li>
            </ul>
  </div>
    <div class="btn-wrapper">
        <button @tap="search">确定</button>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {

      }
    },
    methods: {
      select () {

      },
      search () {
        
      }
    }
  }
</script>

