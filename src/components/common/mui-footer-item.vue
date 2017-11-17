<template>
  <!-- <div> -->
  <a @tap="_active($event)" class="mui-tab-item" :class="active ? activeClass : ''">
    <span class="mui-icon" :class="active ? icon+'-solid': icon" v-if="icon">
        <span class="mui-badge" v-show="badge"></span>
    </span>
    <span class="mui-tab-label" v-text="label"></span>
  </a>
  <!-- </div> -->
</template>

<script type="es6">
  export default {
    props: {
      badge: {
        type: Boolean,
        default: false,
        coerce: function (val) {
          if (val === true || val === 'true') {
            return true
          }
          return false
        }
      },
      label: {
        type: String
      },
      icon: {
        type: String
      },
      activeClass: {
        type: String,
        default: 'mui-active'
      },
      active: {
        type: Boolean,
        default: false,
        coerce: function (val) {
          if (val === true || val === 'true') {
            return true
          }
          return false
        }
      },
      href: {
        type: String
      },
      index: {
        type: Number,
        required: true
      }
    },
    methods: {
      _active: function ($event) {
        this.$emit('muiTabClick')
      }
    }
  }
</script>
