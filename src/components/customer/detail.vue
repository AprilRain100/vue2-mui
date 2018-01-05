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
                  <img class="photo" :src="detail.imageUrl">
                  <div class="content" :class="isOther == 'other' ? 'noArrow' : '' " @tap="goCustomerDetail">
                      <div class="cttList">
                          <span class="name" v-text="detail.name"></span>
                          <!--<span class="phone" v-text="detail.detail.phone"></span>-->
                          <span class="phone">负责人:{{detail.sellerName}}</span>
                      </div>
                      <div class="cttList ceatPeople mui-ellipsis">
                          <span>电话：</span>
                          <span class="mui-ellipsis"
                                v-text="detail.mobile"></span>
                      </div>
                  </div>
              </div>
          </div>
          <div class="cusList" v-if="!pmShow">
              <div class="cusItem itemBottom" @tap="setFollowTeam">
                  <div class="itemList"  :class="isOther == 'other' ? 'noArrow' : '' ">
                      <span class="itemTitle">更换负责人：</span>
                      <span class="itemContent" v-text="detail.sellerName"></span>
                  </div>
              </div>
          </div>
      </div>
        <div class="tab" v-if="isOther != 'other' ">
        <div :class="[detail.isMyTrack === 1? '':'disable']" @tap="goChatPage">
            <span class="yk-icon mui-icon-weixin chance-icon-weixin" :class="detail.weChat? '' : 'gray'"></span>
            <span>聊天{{detail.weixinCount}}</span>
        </div>
        <div @tap="toTel(detail.id, detail.mobile)">
            <span class="yk-icon mui-icon-phone-filled chance-icon-phone" :class="detail.mobile? '' : 'gray'"></span>
            <span>电话 {{detail.telCount}}</span>
        </div>
        <div :class="[detail.mobile ? '':'disable']" @tap="toMsg(detail.customerId, detail.mobile)">
            <span class="yk-icon mui-icon-chat chance-icon-message" :class="detail.mobile? '' : 'gray'"></span>
            <span>短信 {{detail.smsCount}}</span>
        </div>
        <div @tap="goDynamicPage">
            <span class="yk-icon yk-icon-smile chance-icon-dynamic"></span>
            <span>动态 {{detail.dynamicsCount}}</span>
        </div>
    </div>

        <div class="time-line" style="top: 182px;height: 100%;">
        <div class="left_line"></div>
        <div class="mui-scroll-wrapper">
            <div class="mui-scroll">
                <div class="time-line-item" v-for="action in detail.fallowList">
                    <p class="date">{{action.cteateTime | dateStr}}</p>
                        <div @tap="goActionDetail(action.sellerId,action.actionId,action.createdDateParam)">
                        <div class="mui-navigate-right">
                            <span v-text="">{{action.cteateTime | hourStr}}</span>
                            <span>
                                <span v-text="action.sellerName"></span>
                                ---
                                <span v-text="action.fallowName"></span>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="foot-button-group" style="position: fixed">
        <div class="toFollow" @tap="goFollowUpPage">点击跟进</div>
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
          title: '客户跟进详情',
          btns: [
            {
              pos: 'left',
              icon: 'mui-icon-left-nav',
              show: false
            }
          ]
        },
        isOther: false,
        pmShow: false, // 是否是项目经理
      }
    },
    computed: {
      detail () {
        return this.$store.state.customerInfo
      },
      adrress () {
        return '联想大厦'
      }
    },
    methods: {
      goCustomerDetail () {
        this.$router.push('/customer/cusInfo')
      },
      setFollowTeam () {
        this.$router.push('/customer/addPeople')        
      },
      goChatPage () {

      },
      toTel () {

      },
      toMsg () {

      },
      goDynamicPage () {
        this.$router.push('/customer/dynamic')        
      },
      goFollowUpPage () {
        this.$router.push('/customer/follow')        
      }
    },
    mounted () {
      mui('.mui-scroll-wrapper').scroll({
        deceleration: 0.0005
      });
    },
    created () {
      // mui('#chance-detail-page-scroll-wrapper').scroll();
      console.log(this.$route.query.id)
      this.$store.commit('HEADER_TITLE', '详情');
      this.$store.dispatch('cusDetail', this.$route.query.id)
    },
    filters: {
      dateStr (inputTime) {
        var date = new Date(inputTime);
        var y = date.getFullYear();
        var m = date.getMonth() + 1;
        m = m < 10 ? ('0' + m) : m;
        var d = date.getDate();
        d = d < 10 ? ('0' + d) : d;
        var h = date.getHours();
        h = h < 10 ? ('0' + h) : h;
        var minute = date.getMinutes();
        var second = date.getSeconds();
        minute = minute < 10 ? ('0' + minute) : minute;
        second = second < 10 ? ('0' + second) : second;
        return y + '-' + m + '-' + d+' '+h+':'+minute+':'+second;
        // return y + '-' + m + '-' + d;
      },
      hourStr (inputTime) {
        var date = new Date(inputTime);
        var h = date.getHours();
        h = h < 10 ? ('0' + h) : h;
        var minute = date.getMinutes();
        var second = date.getSeconds();
        minute = minute < 10 ? ('0' + minute) : minute;
        second = second < 10 ? ('0' + second) : second;
        return h+':'+minute;
      }
    },
    watch: {
      $route (to, from) {
        console.log(to, 't')
        console.log(from, 'f')
      }
    }
  }
</script>