<template>
  <div>
    <div class="mui-content">
      <slot></slot>
    </div>
  </div>
</template>
<script type="es6">
  export default {
    props: {
      scroll: {
        type: Boolean,
        default: false,
        coerce: function (val) {
          if (val === true || val == 'true') {
            return true
          } else {
            return false
          }
        }
      }
    },
    methods: {}
  }
</script>
