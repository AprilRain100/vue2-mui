<style lang="less" scoped>
  .sb {
    display: flex;
    padding: 10px;
    li {
      float: left;
      margin: 15px 30px;
      width: 135px;
      height: 30px;
      border: 1px solid #000;
      border-radius: 10px;
      color: red;
      text-align: center;
      line-height: 30px;
      background: #fff;
      font-size: 14px;
    }
  }
</style>
<template>
  <div>
    <mui-header :title="currentHeader.title">
      <mui-header-btn v-for="(btn, index) in currentHeader.btns"
                      :position="btn.pos"
                      :icon="btn.icon"
                      :label="btn.text"
                      :show="btn.show"
                      :key="index"
      >
      </mui-header-btn>
    </mui-header>
    <div class="mui-content">
      <div class="sb">
        <ul>
          <li v-for="item in arr" v-if="arr.length>0">{{item.text}}</li>
        </ul>

      </div>
    </div>
  </div>

</template>
<script>
  import MuiHeader from '../common/mui-header.vue'
  import MuiHeaderBtn from '../common/mui-header-btn.vue'

  export default {
    components: {
      MuiHeader,
      MuiHeaderBtn
    },
    data () {
      return {
        currentHeader: {
          title: '客户标签',
          btns: [
            {
              pos: 'left',
              icon: 'mui-icon-left-nav',
              // text: '返回',
              show: false
            }
          ]
        },
        arr: [
          {
            text: '清纯'
          },
          {
            text: '动人'
          },
          {
            text: '萌妹'
          },
          {
            text: '善良'
          },
          {
            text: '美丽'
          }
        ]
      }
    },
    created () {
      this.$store.commit('HEADER_TITLE', '详情')
    },
    watch: {
      $route (to, from) {
        console.log(to, 't')
        console.log(from, 'f')
      }
    }
  }
</script>
