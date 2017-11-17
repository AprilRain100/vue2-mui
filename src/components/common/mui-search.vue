<template>
  <div>
    <div class="mui-input-row mui-search" :class="[active? 'mui-active':'']">
      <input v-model="searchStr" @input="type" type="search" class="mui-input-clear" placeholder="">
      <div v-show="searchStr.length" @tap.stop.self="clear" class="mui-icon mui-icon-close"></div>
      <span @tap="_active" class="mui-placeholder">
        <span class="mui-icon mui-icon-search"></span>
        <span v-text="searchStr||placeholder"></span>
    </span>
      <button @tap="_search" v-show="active && !isAfterSearch" type="button" class="mui-btn">搜索</button>
      <button @tap="_cancel" v-show="active && isAfterSearch" type="button" class="mui-btn">取消</button>
    </div>
    <div @tap.stop.self="_cancel" class="mui-backdrop" v-show="active && isType"></div>
  </div>
</template>
<script type="es6">
  export default {
    data: function () {
      return {
        active: false,
        isType: false,
        isAfterSearch: false
      }
    },
    props: {
      placeholder: {
        type: String,
        default: ''
      },
      searchStr: {
        type: String,
        default: ''
      }
    },
    methods: {
      _active: function ($event) {
        this.active = true
        this.isType = true
        this.$el.querySelector('input').focus()
      },
      _cancel: function ($event) {
        this.active = false
        this.isType = false
        this.isAfterSearch = false
        this.searchStr = ''
        this.$emit('muiSearch',
          {
            searchStr: this.searchStr,
            event: $event
          })
      },
      _search: function ($event) {
        this.$emit('muiSearch',
          {
            searchStr: this.searchStr,
            event: $event
          })
        this.isType = false
        this.isAfterSearch = true
      },
      type: function () {
        this.isType = true
        this.isAfterSearch = false
      },
      clear: function () {
        this.searchStr = ''
      }
    },
    // events: {
    //     'mui-backdrop-cancel': function(event) {
    //         this._cancel();
    //     }
    // }
  }
</script>
<style lang="less" scoped>
  @btn-color: #f68c25;
  .mui-input-row .mui-input-clear ~ .mui-icon-close {
    font-size: 20px;
    position: absolute;
    z-index: 1;
    top: 10px;
    right: 0;
    width: 38px;
    height: 38px;
    text-align: center;
    color: #999;
  }

  .mui-search.mui-input-row {
    padding: 8px 10px;
    .mui-icon-close {
      top: 7px;
      padding: 5px;
      right: 16%;
    }
  }

  .mui-search.mui-active {
    z-index: 10000;
    &:before {
      left: 15px;
      top: 30px;
    }
    input {
      width: 85%;
      background-color: #fff;
    }
  }

  .mui-search {
    background-color: #efefef;
    .mui-placeholder {
      background-color: #ffffff;
      margin: 8px 10px;
      height: 30px;
      line-height: 30px;
      span {
        font-size: 14px;
        color: #999;
      }
    }
  }

  .mui-input-clear {
    margin-bottom: 0px !important;
    height: 30px !important;
  }

  .mui-input-row {
    .mui-btn {
      padding: 7px 15px;
      border: none;
      background-color: transparent;
      color: @btn-color;
      &:active {
        background-color: transparent;
        color: @btn-color;
      }
    }

  }

  @media only screen and (max-width: 320px) {
    .mui-input-row .mui-btn {
      padding: 7px 13px;
    }
  }

  @media only screen and (max-width: 375px) {
    .mui-input-row .mui-btn {
      padding: 7px 15px;
    }
  }


</style>
