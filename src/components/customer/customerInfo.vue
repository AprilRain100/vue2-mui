<style lang="less" scoped>
    @import '../../assets/css/customer.less';
.mui-content {
    padding-top: 0;
    .mui-table-view-cell {
        padding: 11px 15px;
    }
}
</style>

<template>
  <div>
          <header class="mui-bar mui-bar-nav">
    <h1 class="mui-title">客户信息</h1>
    <a class="mui-icon mui-icon-left-nav mui-pull-left mui-icon-back" @tap="$router.go(-1)"></a>
</header>

<div class="mui-content" id="customer-detail">
            <div class="photo cMargin">
                <img :src="listData.imageUrl" alt=""/>
                <div class="employee">
                    <p style="font-size: 16px;" v-text="listData.name"></p>
                    <p style="font-size: 12px;" class="creactPerson">关注日期:<span>{{listData.createTime | dates}}</span></p>
                </div>
            </div>
            <ul class="mui-table-view details_list">
                <li class="mui-table-view-cell">
                    <span>性别</span>
                    <b class="mui-pull-right" v-text="sexChange(listData.sex)"></b>
                </li>
                <li class="mui-table-view-cell">
                    <span>手机号</span>
                    <b class="mui-pull-right" v-text="listData.mobile ? listData.mobile : '待添加'"></b>
                </li>
                <li class="mui-table-view-cell">
                    <span>客户来源</span>
                    <b class="mui-pull-right" v-text="listData.customerSourceName"></b>
                </li>
            </ul>
            <ul class="mui-table-view details_list cMargin">
                <li class="mui-table-view-cell">
                    <span>所在区域</span>
                    <b class="mui-pull-right"
                       v-text="listData.erea ? listData.erea : '待添加'"
                       :style="{color: listData.region ? '#666' : '#ccc'}"></b>
                </li>
                <li class="mui-table-view-cell">
                    <span>详细地址</span>
                    <b class="mui-pull-right" v-text="listData.address ? listData.address : '待添加'"
                       :style="{color: listData.address ? '#666' : '#ccc'}"></b>
                </li>
                <li class="mui-table-view-cell">
                    <span>意向产品</span>
                    <b class="mui-pull-right" v-text="listData.purposeProduct ? listData.purposeProduct : '待添加'"
                       :style="{color: listData.doorNumber ? '#666' : '#666'}"></b>
                </li>
                <li class="mui-table-view-cell" @tap="goLable(listData.id)">
                    <span>客户标签</span>
                        <b class="mui-pull-right" v-text="listData.tagName ? listData.tagName : '待添加'"
                           :style="{color: listData.doorNumber ? '#666' : '#666'}"></b>
                    </li>
            </ul>
            <ul class="mui-table-view details_list cMargin">
                <li class="mui-table-view-cell" @tap="historical">
                    <span class="mui-navigate-right">查看到访与成交信息</span>
                </li>
                <li class="mui-table-view-cell" @tap="makeHouse(listData.id)">
                    <span class="mui-navigate-right">查看预约看房</span>
                </li>
            </ul>
            <ul class="mui-table-view details_list cMargin otherChanceList">
                <li class="mui-table-view-cell" v-for="list in listData.tracks"  @tap="toOtherChance(list.trackId)">
                    <a class="mui-navigate-right">
                        <div class="creatDate">
                            <span>{{list.mature}}</span>
                            <span>关注日期: {{list.createdDate}}</span>
                        </div>
                        <div class="wantProject mui-ellipsis">
                            <span v-for = "item in list.tags">{{item.name + ','}}</span>
                        </div>
                    </a>
                </li>
            </ul>
</div>

  </div>
</template>
<script>
    export default {
        data () {
            return {

            }
        },
        computed: {
            listData () {
                return this.$store.state.customerInfo
            }
        },
        methods: {
            historical() {

            },
            makeHouse () {

            },
            sexChange (value) {
                switch(value) {
                    case 0:
                        return '女';
                    case 1:
                        return '男';
                    default: 
                        return '未知';
                }
            }
        },
        created () {
            mui('.mui-scroll-wrapper').scroll();
        }
    }
</script>