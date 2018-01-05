<style lang="less" scoped>
  // @import "../assets/css/customer2.css";
    @import '../assets/css/customer.less';
  @import "../assets/css/top-tap-component";

  #customer {
    position: absolute;
  }

  .mui-table-view-cell {
    padding: 11px 15px;
    padding-right: 65px;
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

    <div class="mui-content" id="customer">
      <mui-search :placeholder="placeholder"></mui-search>
      <div class="mark" v-show="markShow" @tap="showMark(false)"></div>
      <div class="top-tab-component">
        <div class="top-content-box">
          <div id="segmentedControl" class="mui-segmented-control customer-list-tab">
            <a class="mui-control-item" @tap="chooseSearch(0)">{{ 0 || '机会成熟度'}}<i></i></a>
            <a class="mui-control-item" @tap="showMark(true)" href="#createDate">{{'创建时间'}}<i></i></a>
            <a class="mui-control-item" @tap="morSearch(true)" href="#createDate"><span class="mui-icon yk-icon-filler"></span>更多查询</a>
            <!-- <router-link tag="span" to="/customer/morSearch" @click.stop="morSearch($event)" class="mui-control-item"><span class="mui-icon yk-icon-filler"></span>更多查询</router-link> -->
          </div>
          <div class="top-tab-content" v-show="markShow">
            <div class="mui-control-content" id="createDate">
              <top-tab-time :tab-title.sync="topTabTitle"
                            :show.sync="markShow"></top-tab-time>
            </div>
          </div>
        </div>
      </div>
      <mui-scroll-refresh :bottom="bottom" :top="customerData.top">
        <ul class="customer customer-table-view">
          <li class="mui-card " v-for="(row, index) in rows" :key="index" @tap="detail(row.id)">
            <div class="title">
              <img :src="row.photo" onerror="javascript:this.src='../customer/img/man.png'"/>
              <div class="customer-info">
                <span class="name" v-text="row.name"></span>
                <span class="principal">负责人：{{row.sellerName}}</span>
                <p class="houses">
                  <span class="mui-icon yk-icon-ico-tel"></span>
                  <span class="building">电话：{{row.mobile}}</span>
                  <a @tap.stop="goLab">查看标签</a>
                </p>
              </div>

              <div class="maturity_t">
                <div class="content_t"
                     :style="{'background-color' : maturityColors[index]}"
                     v-text="row.tagName"></div>
                <div class="triangle-down"
                     :style="{'border-top-color' : maturityColors[index]}"></div>
              </div>
            </div>

            <ul class="status mui-table-view mui-table-view-chevron">
              <li class="mui-table-view-cell">
                <a class="mui-navigate-right" >
                  <p class="cycle">
                    <span>创建时间：<span><i>{{row.createTime | dates}}</i></span></span>
                    <span>未跟进：<span><i v-text="row.noFallowDay"></i>天</span></span>
                  </p>
                </a>
              </li>
            </ul>
          </li>
        </ul>

      </mui-scroll-refresh>
    </div>
    <router-link to="/customer/cusDetail">hhhhh</router-link>
    <transition name="router-fade" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>
<script type="es6">
  import MuiHeader from './common/mui-header.vue'
  import MuiHeaderBtn from './common/mui-header-btn.vue'
  import { mapState, mapMutations } from 'vuex'
  import MuiSearch from './common/mui-search.vue'
  import topTabTime from './common/top-tab-time.vue'
  import muiScrollRefresh from './common/mui-scroll-refresh.vue'
  import { getCustomerList, getLoginUser } from '../public/getData'
  import axios from 'axios'

  export default {
    components: {
      MuiHeader,
      MuiHeaderBtn,
      MuiSearch,
      topTabTime,
      muiScrollRefresh
    },
    props: {},
    data () {
      return {
        currentHeader: {
          title: '顾客',
          btns: [
            {
              pos: 'left',
              icon: 'mui-icon-left-nav',
              // text: '返回',
              show: false
            }
          ]
        },
        placeholder: '微信/QQ/手机号码',
        markShow: false,
        topTabTitle: [
          {
            id: 'createDate',
            title: '创建时间',
            slotName: 'one'
          }
        ],
        matureList: {
          data: [
            {
              id: '',
              name: '所有成熟度',
              text: '所有成熟度'
            },
            {
              id: 1,
              name: '已新建',
              text: '已新建'
            },
            {
              id: 2,
              name: '已成交',
              text: '已成交'
            },
            {
              id: 3,
              name: '已丢单',
              text: '已丢单'
            },
            {
              id: 4,
              name: '已交订金',
              text: '已交订金'
            },
            {
              id: 1450,
              name: '有意向',
              text: '有意向'
            },
            {
              id: 1451,
              name: '已确认',
              text: '已确认'
            },
            {
              id: 1452,
              name: '已签单',
              text: '已签单'
            },
            {
              id: 1457,
              name: '测试成熟度',
              text: '测试成熟度'
            }
          ]
        },
        customerData: {
          top: '100px',
          visible: false
        },
        bottom: '51px',
        rows: [],
        loginPm: {
          "account": "00001",
          "password": "123456",
          "remember": false
        }
      }
    },
    computed: {
      maturityColors () {
        var maturityColors = []
        for (var i = 0; i < this.rows.length; i++) {
          var color = '#00a1f1'
          switch (this.rows[i].matureId) {
            case 1:
              color = '#f75314'
              break
            case 2 :
            case 4 :
              color = '#7dbb00'
              break
            case 3 :
              color = '#cccccc'
              break
            default:
              color = '#00a1f1'
              break
          }
          maturityColors.push(color)
        }
        return maturityColors
      }
    },
    methods: {
      ...mapMutations(['HEADER_TITLE']),
      detail (id) {
        this.$router.push({path: '/customer/cusDetail', query: {id: id}})
      },
      // 条件筛选
      chooseSearch: function () {
        this.showMark(false)
        var self = this
        // store.listSendObjReset(1);
        var userPicker = new mui.PopPicker()
        userPicker.setData(self.matureList.data)
        userPicker.show(function (items) {
          self.matureList.activeItem = items[0]
          self.listData.sendObj.matureId = items[0].id
          store.getCustomerList()
        })
        this.showMark(false)
        // mui('#matureHref')[0].classList.remove('mui-active');
      },
      showMark (isShow) {
        this.markShow = isShow
        var a = mui('.top-content-box')[0].getElementsByClassName('mui-active')
        for (var i = 0; i < a.length; i++) {
          a[i].classList.remove('mui-active')
        }
      },
      morSearch (e) {
        console.log(e)
        this.$router.push('/customer/morSearch')
      },
      goLab () {
        this.$router.push('customer/lookLable')
      }
    },
    watch: {
      '$route' (to, from) {
        console.log(to, 't')
        console.log(from, 'f')
        this.$store.commit('HEADER_TITLE', '顾客')

      }
    },
    mounted () {
      this.$store.dispatch('cusList').then(res => {
        this.rows = res.list;
      })
    },
    created () {
      this.$store.commit('HEADER_TITLE', '顾客')
    }
  }
</script>
