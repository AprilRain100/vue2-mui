<style lang="less" scoped>
  h5 {
    padding: 10px;
  }
</style>

<template>
  <div>
    <div class="mui-content">
      <h5>攻城狮正在卖命的开发中...</h5>    
    </div>
  </div>
</template>
<script type="es6">
  import { mapState, mapMutations } from 'vuex'

  export default {
    props: {},
    methods: {
      ...mapMutations([
        'HEADER_TITLE'
      ])
    },
    created () {
      this.HEADER_TITLE('消息')
    }
  }
</script>
