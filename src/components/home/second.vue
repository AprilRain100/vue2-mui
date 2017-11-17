<template>
  <div>
    <mui-header :title="title">
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
      第二个子页面
      <router-link to="/home/second/thr">前往第三层子页面</router-link>

    </div>
    <router-view></router-view>
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
          title: '首页',
          btns: [
            {
              pos: 'left',
              icon: 'mui-icon-left-nav',
              // text: '返回',
              show: false
            }
          ]
        },
      }
    },
    computed: {
      title () {
        return this.$store.state.title
      }
    },
    created () {
      this.$store.commit('HEADER_TITLE', '详细')
    }
  }
</script>
