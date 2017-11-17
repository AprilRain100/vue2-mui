<template>
  <div>
    <div class="mui-content">
      个人资料
    </div>
  </div>
</template>
<script type="es6">
  import { mapState, mapMutations } from 'vuex'

  export default {
    props: {},
    data () {
      return {
        currentHeader: {
          title: '资料'
        }
      }
    },
    methods: {
      ...mapMutations([
        'HEADER_TITLE'
      ])
    },
    created () {
      this.HEADER_TITLE('我的')
    }
  }
</script>
