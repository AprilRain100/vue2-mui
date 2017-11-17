<style lang="less">
  @import "../../assets/css/top-tap-component";
</style>

<template>
  <div class="tiemr-box">
    <div class="recnet-time">
      <span class="mui-btn" v-for="(item, index) in defaultTime" v-text="item" @tap="select(index)" :key="index"></span>
    </div>
    <div class="select-time">
      <div class="select-time-title mui-navigate-right">自定义</div>
      <div class="select-time-box">
        <span class="mui-btn" v-text="startText" @tap="customTime(0)"></span>
        <span class="mui-btn" v-text="endText" @tap="customTime(1)"></span>
      </div>
    </div>
  </div>
</template>

<script>
  // const choiceData = require('../../public/js/date-select');
  import choiceData from '../../public/js/date-select'

  export default {
    props: {
      tabTitle: Array
      // show: Boolean
    },
    data: function () {
      return {
        defaultTime: ['今天', '本周', '本月', '三个月', '半年', '一年'],
        startText: '开始日期',
        endText: '结束日期',
        setTime: [],
        options: {
          type: 'date',
          beginYear: 2000,
          endYear: 2030
        }
      }
    },
    methods: {
      time: function (num) {
        var arr = []
        switch (num) {
          case 0:
            arr[0] = choiceData.today()
            arr[1] = choiceData.today()
            break
          case 1:
            arr[0] = choiceData.getWeekStartDate()
            arr[1] = choiceData.getWeekEndDate()
            break
          case 2:
            arr[0] = choiceData.getMonthStartDate()
            arr[1] = choiceData.getMonthEndDate()
            break
          case 3:
            arr[0] = choiceData.getQuarterStartDate()
            arr[1] = choiceData.getQuarterEndDate()
            break
          case 4:
            arr[0] = choiceData.getQuarterHalfYearStart()
            arr[1] = choiceData.getQuarterHalfYearEnd()
            break
          case 5:
            arr[0] = choiceData.getQuarterYearStart()
            arr[1] = choiceData.getQuarterYearEnd()
            break
          default:
            arr[0] = choiceData.today()
            arr[1] = choiceData.today()
            break
        }
        return arr
      },
      select: function (value) {
        this.show = false
        // 标题的改变
        var index = this.toIndex(this.tabTitle, this.defaultTime)
        this.tabTitle[index].title = this.defaultTime[value]
        // 派发事件
        var timeArr = this.time(value)
        this.$emit('timeClick', timeArr)
        // 移除mui-active 这个class
        this.toRemoveClass()
      },
      // 自定义时间
      customTime: function (index) {
        var This = this
        var picker = new mui.DtPicker(This.options)
        picker.show(function (rs) {
          This.setTime[index] = rs.y.text + rs.m.text + rs.d.text
          if (index) {
            This.endText = rs.text
          } else {
            This.startText = rs.text
          }
          if (This.setTime[0] && This.setTime[1]) {
            if (This.setTime[0] <= This.setTime[1]) {
              // 标题的改变
              This.tabTitle[0].title = This.startText + ',' + This.endText
              //
              This.$emit('customTime', [This.startText, This.endText])
              This.show = false
              This.toRemoveClass()
            } else {
              mui.toast('开始时间不能大于结束时间')
            }
          }
          picker.dispose()
        })
      },
      toIndex: function (arr1, arr2) {
        var index = 0
        for (var i = 0; i < arr1.length; i++) {
          for (var j = 0; j < arr2.length; j++) {
            if (arr2[j] == arr1[i].title) {
              index = i
              break
            }
          }
        }
        return index
      },
      // 移除mui-class
      toRemoveClass: function () {
        var a = mui('.top-content-box')[0].getElementsByClassName('mui-active')
        for (var i = 0; i < a.length; i++) {
          a[i].classList.remove('mui-active')
        }
      }
    },
    computed: {
      cTime: function () {
        return this.setTime
      }
    },
    mounted () {

    }
  }
</script>
