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
      <div class="mui-content-padded mui-clearfix ">
        <div class="listMessage">公众号当前粉丝数：<span>{{test}}</span>人</div>
        <div class="listMessage">获取电话数：<span>{{test}}</span>人</div>
        <div class="listMessage">到访数：<span>{{test}}</span>人</div>
        <div class="listMessage">本周增长粉丝数：<span>{{test}}</span>人</div>
        <div class="listMessage">本月增长粉丝数：<span>{{test}}</span>人</div>
      </div>

      <div class="mui-clearfix top-box">
        <div id="sliderSegmentedControl"
             class="mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
          <a class="mui-control-item mui-col-xs-3 mui-active" num="0" @tap="changeDate(10)">最近10天</a>
          <a class="mui-control-item mui-col-xs-3" num="1" @tap="changeDate(7)">本周</a>
          <a class="mui-control-item mui-col-xs-3" num="2" @tap="changeDate(30)">本月</a>
        </div>
        <div class="mui-pull-left pie" id="myChart" style="width: 100%;height:200px;"></div>
      </div>
    </div>
    <div v-if="!clickCenter">
      <router-link to="/home/first">前往第一个子页面</router-link>
      <router-link to="/home/second">前往第2个子页面</router-link>
    </div>

    <!-- <mui-footer id="indexPageFooter" v-if="!children">
   <mui-footer-item v-for="(item, index) in navBars"
                    :key="index"
                    :label="item.label"
                    :badge="item.badge"
                    active-class="mui-active"
                    :active="currentIndex == index"
                    :icon="item.icon"
                    :index="index"
                    @muiTabClick="muiTabClick(index, item.href)"
   >
   </mui-footer-item>
 </mui-footer> -->
  </div>
</template>

<script>
  import MuiFooter from './common/mui-footer.vue'
  import MuiFooterItem from './common/mui-footer-item.vue'
  import MuiHeader from './common/mui-header.vue'
  import MuiHeaderBtn from './common/mui-header-btn.vue'
  import { mapState, mapMutations } from 'vuex'
  // import echarts from '../public/js/echarts.min'
  let echarts = require('../public/js/echarts.min')

  export default {
    name: 'HelloWorld',
    components: {
      MuiFooter,
      MuiFooterItem,
      MuiHeader,
      MuiHeaderBtn
    },
    data () {
      return {
        clickCenter: false,
        // 底部导航切换切换
        navBars: [
          {label: '首页', icon: 'yk-icon-home', href: '/'},
          {label: '顾客', icon: 'yk-icon-customer', href: '/customer'},
          {
            label: '消息',
            icon: 'yk-icon-chatboxes',
            href: '/message',
            badge: false
          },
          {label: '分析', icon: 'yk-icon-chart-pie', href: '/analysis'},
          {label: '我的', icon: 'yk-icon-person', href: '/userinfo'}
        ],
        footerData: {
          index: 0
        },
        test: 1111,
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
        children: false,
        msg: 'Welcome to Your Vue.js App',
        test: 1111,
        charOption: {
          // 饼状图配置
          title: {
            text: '粉丝增长趋势图',
            subtext: '单位/人',
            textStyle: {
              fontSize: 14,
              right: 0,
              top: 20,
              bottom: 20
            }
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          tooltip: {
            trigger: 'axis'
          },
          legend: {
            type: 'scroll',
            data: ['新增', '获取电话', '到访'],
            textStyle: {
              fontSize: 11
            },
            // right: 0,
            top: 25,
            bottom: 20
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
            splitLine: {
              show: false
            }
          },
          yAxis: {
            type: 'value'
          },
          series: [
            {
              name: '新增',
              type: 'line',
              smooth: true,
              data: [10, 12, 21, 54, 260, 830, 710]
            },
            {
              name: '获取电话',
              type: 'line',
              smooth: true,
              data: [30, 182, 434, 791, 390, 30, 10]
            },
            {
              name: '到访',
              type: 'line',
              smooth: true,
              data: [1320, 1132, 601, 234, 120, 90, 20]
            }
          ]
        }
      }
    },
    computed: {
      ...mapState({
        title: state => state.title
      }),
      currentIndex () {
        return this.footerData.index
      }
    },
    methods: {
      ...mapMutations(['HEADER_TITLE']),
      drawLine () {
        // 统计图表
        let myChart = echarts.init(document.getElementById('myChart'))
        myChart.setOption(this.charOption)
      },
      changeDate (index) { // 不同日期
        console.log(index)
        if (index === 7) {
          this.clickCenter = true
        } else {
          this.clickCenter = false
        }
      },
      muiTabClick (index, href) {
        this.footerData.index = index
        this.$router.push(href)
      }
    },
    created () {},
    mounted () {
      this.HEADER_TITLE('首页')
      this.drawLine()
      // mui.alert('你好，这个世界');
      // mui.alert(this.tests);
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  @import "../assets/css/home.less";

  .mui-content {
    padding-top: 10px;
    .top-box {
      margin: 10px;
    }
  }

  .mui-clearfix {
    border: 1px solid #c4c4c4;
    background: #fff;
    .listMessage {
      padding: 10px;
      span {
        color: #f68c24;
        font-size: 16px;
      }
    }
  }
</style>
