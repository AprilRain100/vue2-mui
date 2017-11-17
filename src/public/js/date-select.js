var now = new Date() // 当前日期
var nowDayOfWeek = now.getDay() // 今天本周的第几天
var nowDay = now.getDate() // 当前日
var nowMonth = now.getMonth() // 当前月
var nowYear = now.getYear() // 当前年
nowYear += (nowYear < 2000) ? 1900 : 0
export default {
  // 格局化日期：yyyy-MM-dd
  formatDate (date) {
    var myyear = date.getFullYear()
    var mymonth = date.getMonth() + 1
    var myweekday = date.getDate()
    if (mymonth < 10) {
      mymonth = '0' + mymonth
    }
    if (myweekday < 10) {
      myweekday = '0' + myweekday
    }
    return (
      myyear + '-' + mymonth + '-' + myweekday)
  },
  // 获得某月的天数
  getMonthDays (myMonth) {
    var monthStartDate = new Date(nowYear, myMonth, 1)
    var monthEndDate = new Date(nowYear, myMonth + 1, 1)
    var days = (
      monthEndDate - monthStartDate) / (
      1000 * 60 * 60 * 24)
    return days
  },
  // 获得本季度的开端月份
  getQuarterStartMonth () {
    var quarterStartMonth = 0
    if (nowMonth < 3) {
      quarterStartMonth = 0
    }
    if (2 < nowMonth && nowMonth < 6) {
      quarterStartMonth = 3
    }
    if (5 < nowMonth && nowMonth < 9) {
      quarterStartMonth = 6
    }
    if (nowMonth > 8) {
      quarterStartMonth = 9
    }
    return quarterStartMonth
  },
  // 获得今天开始/结束时间
  today () {
    return this.formatDate(now)
  },
  // 获得本周的开端日期
  getWeekStartDate () {
    var weekStartDate = new Date(nowYear, nowMonth, nowDay - nowDayOfWeek)
    return this.formatDate(weekStartDate)
  },
  // 获得本周的停止日期
  getWeekEndDate () {
    var weekEndDate = new Date(nowYear, nowMonth, nowDay + (
      6 - nowDayOfWeek))
    return this.formatDate(weekEndDate)
  },
  // 获得本月的开端日期
  getMonthStartDate () {
    var monthStartDate = new Date(nowYear, nowMonth, 1)
    return this.formatDate(monthStartDate)
  },
  // 获得本月的停止日期
  getMonthEndDate () {
    var monthEndDate = new Date(nowYear, nowMonth, this.getMonthDays(nowMonth))
    return this.formatDate(monthEndDate)
  },
  // 获得本季度的开端日期
  getQuarterStartDate () {
    var quarterStartDate = new Date(nowYear, this.getQuarterStartMonth(), 1)
    return this.formatDate(quarterStartDate)
  },
  // 获得本季度的停止日期
  getQuarterEndDate () {
    var quarterEndMonth = this.getQuarterStartMonth() + 2
    var quarterStartDate = new Date(nowYear, quarterEndMonth, this.getMonthDays(quarterEndMonth))
    return this.formatDate(quarterStartDate)
  },
  //  获得半年开始
  getQuarterHalfYearStart () {
    var str = ''
    if (nowMonth <= 6) { //
      str = nowYear + '-01-01'
    } else {
      str = nowYear + '-07-30'
    }
    return str
  },
  //  获得半年结束
  getQuarterHalfYearEnd () {
    var str = ''
    if (nowMonth <= 6) { //
      str = nowYear + '-06-30'
    } else {
      str = nowYear + '-12-31'
    }
    return str
  },
  //  获得一年的开始时间
  getQuarterYearStart () {
    return nowYear + '-01-01'
  },
  //  获得一年的结束时间
  getQuarterYearEnd () {
    return nowYear + '-12-31'
  }
}
