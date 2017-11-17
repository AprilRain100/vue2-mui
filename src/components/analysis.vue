<template>
  <div>
      <div class="mui-content">
分析
      </div>
  </div>
</template>
<script type="es6">
    import {mapState, mapMutations} from 'vuex'
    export default {
        props: {

        },
        methods: {
            ...mapMutations([
                'HEADER_TITLE'
            ])
            
        },
        created () {
            this.HEADER_TITLE('分析')
        }
    }
</script>