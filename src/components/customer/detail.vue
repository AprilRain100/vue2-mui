<style lang="less" scoped>
  @import '../../assets/css/chance-detail-page';
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
    <div class="mui-content chance-detail-page-content">

      <div class="customerDetail">
        <div class="cusList">
          <div class="cusItem cusInfo">
            <img class="photo" :src="detail.photo"
                 onerror="javascript:this.src='../customer/img/man.png'">
            <div class="content" :class="isOther == 'other' ? 'noArrow' : '' " @tap="goCustomerDetail">
              <div class="cttList">
                <span class="name" v-text="detail.customerName"></span>
                <!--<span class="phone" v-text="detail.detail.phone"></span>-->
                <span class="phone">负责人:{{detail.personInCharge}}</span>
              </div>
              <div class="cttList ceatPeople mui-ellipsis">
                <span>楼盘：</span>
                <!--<span>{{detail.detail.creator}}</span>-->
                <span class="mui-ellipsis"
                      v-text="adrress"></span>
              </div>
            </div>
          </div>
        </div>
        <div class="cusList">
          <div class="cusItem itemBottom" @tap="setFollowTeam">
            <div class="itemList" :class="isOther == 'other' ? 'noArrow' : '' ">
              <span class="itemTitle">联合跟客人：</span>
              <span class="itemContent" v-for="person in detail.team" v-text="person.name + ' '"></span>
            </div>
          </div>
        </div>
      </div>
      <div class="tab" v-if="isOther != 'other' ">
        <div :class="[detail.isMyTrack === 1? '':'disable']" @tap="goChatPage">
          <span class="yk-icon mui-icon-weixin chance-icon-weixin" :class="detail.isSubscribing? '' : 'gray'"></span>
          <span>聊天{{detail.weixinCount}}</span>
        </div>
        <div @tap="toTel(detail.customerId, detail.detail.phone)">
          <span class="yk-icon mui-icon-phone-filled chance-icon-phone" :class="detail.phone? '' : 'gray'"></span>
          <span>电话 {{detail.telCount}}</span>
        </div>
        <div :class="[detail.isMyTrack === 1 ? '':'disable']" @tap="toMsg(detail.customerId, detail.phone)">
          <span class="yk-icon mui-icon-chat chance-icon-message" :class="detail.phone? '' : 'gray'"></span>
          <span>短信 {{detail.smsCount}}</span>
        </div>
        <div @tap="goDynamicPage">
          <span class="yk-icon yk-icon-smile chance-icon-dynamic"></span>
          <span>动态 {{detail.dynamicsCount}}</span>
        </div>
      </div>

      <!-- <div class="time-line" :style="isOther != 'other' ? {bottom : isNotEnd? '50px' : '0' }  : {bottom : 0, top: '172px' }">
          <div class="left_line"></div>
          <div id="chance-detail-page-scroll-wrapper" class="mui-scroll-wrapper">
              <div class="chance-detail-page-scroll" class="mui-scroll">
                  <div class="time-line-item" v-for="item in timeLine">
                      <p class="date" v-text="$key"></p>
                      <div>
                          <div v-for="action in item"
                               @tap="goActionDetail(action.behaviorId,action.actionId,action.createdDateParam)"
                               class="mui-navigate-right">
                              <span v-text="action.createdDate.substr(10, 16)"></span>
                              <span>
                                  <span v-text="action.creator"></span>
                                  <span v-text="action.behaviorName"></span>
                                  ---
                                  <span v-text="action.actionName"></span>
                              </span>
                              <a>查看</a>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </div> -->
      <router-link to="/customer/lookLable">哈哈哈哈😁</router-link>

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
          title: '客户跟进详情',
          btns: [
            {
              pos: 'left',
              icon: 'mui-icon-left-nav',
              // text: '返回',
              show: false
            }
          ]
        },
        isOther: false
      }
    },
    computed: {
      detail () {
        return this.$store.state.detail.data
      },
      adrress () {
        return '联想大厦'
      }
    },
    methods: {
      goCustomerDetail () {

      },
      setFollowTeam () {

      },
      goChatPage () {

      },
      toTel () {

      },
      toMsg () {

      },
      goDynamicPage () {

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
