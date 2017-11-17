<template>
  <div>
    <button class=" mui-btn mui-btn-blue mui-btn-link mui-btn-nav mui-pull-left" :class="'mui-pull-' + position"
            @tap="headerClick()">
      <template v-if="position=='right'">{{label}}</template>
      <span class="mui-icon" :class="icon"></span>
      <template v-if="position=='left'">{{label}}</template>
    </button>
    <!-- <a v-else v-show="show" class="mui-action-back mui-icon {{icon}} mui-pull-{{position}}" @tap="backTo()"></a> -->

  </div>
</template>
<script type="es6">
  export default {
    props: {
      position: {
        type: String,
        required: true
      },
      icon: {},
      label: {},
      // key: {},
      show: {
        type: Boolean,
        default: true,
        coerce: function (val) {
          if (val === true || val == 'true' || val === undefined || val === null) {
            return true
          } else {
            return false
          }
        }
      }
    },
    methods: {
      _active: function ($event) {
        // this.active = true;
        this.$emit('mui-tab-item-click', {index: this.index, event: $event})
      },
      headerClick: function (mark) {
        mui.back();
        this.$emit('headerClick', mark)
      },
      backTo: function () {
        this.$emit('backTo')
      }
    }
  }
</script>
