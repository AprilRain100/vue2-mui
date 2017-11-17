import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'
import mutations from './mutations'

Vue.use(Vuex)

const state = {
  title: '我觉得他们都很傻逼',
  footBarState: true,
  detail: {
    "status": true,
    "data": {
        "sex": 1,
        "phone": "",
        "doorNumber": null,
        "creator": "lina",
        "telCount": 0,
        "isTakeIn": 1,
        "weixinCount": 3,
        "customerId": 2429,
        "smsCount": 0,
        "products": null,
        "customerName": "Tung",
        "tags": [],
        "dynamicsCount": 1,
        "trackId": 2828,
        "isMyTrack": 1,
        "creatorId": 950,
        "personInCharge": "lina",
        "team": [
            {
                "id": 950,
                "member": 950,
                "employeeType": 0,
                "trackId": 2828,
                "name": "lina",
                "removeFlag": 0,
                "personInCharge": 950
            }
        ],
        "period": 53,
        "noTrack": 52,
        "photo": "http://wx.qlogo.cn/mmopen/kQhUW1wmDuabOV5ibgGe6OASgboyl4GVRDCiaRpYRjHue6Ehz421nv2BTjIFbvBjH8kNk9icDAk1Fd1Y4XneibRKkC3FnMHu37wh/0",
        "isSubscribing": 1,
        "matureId": 1,
        "address": "中国广东深圳",
        "mature": "已新建",
        "readonly": 0,
        "actions": [
            {
                "creatorId": 950,
                "actionName": "新建机会",
                "behaviorId": 0,
                "behaviorName": "新建机会",
                "actionId": 1,
                "createdDateParam": "2017-09-26 15:01:41",
                "createdDate": "2017-09-26 15:01",
                "creator": "lina"
            }
        ]
    }
}
}

export default new Vuex.Store({
  state,
  actions,
  mutations
})
