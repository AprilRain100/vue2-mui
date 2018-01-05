<style lang="less" scoepd>
#demo {
    padding-top: 44px;
    margin: 100px auto;
}
</style>

<template>
  <div>
          <header class="mui-bar mui-bar-nav">
    <h1 class="mui-title">继续跟进</h1>
    <a class="mui-icon mui-icon-left-nav mui-pull-left mui-icon-back" @tap="$router.go(-1)"></a>
</header>
<div id="demo">
  <button v-on:click="show = !show">
    Toggle
  </button>
  <transition name="fade" mode="out-in">
    <p v-if="show">hello</p>
  </transition>
</div>
  </div>
</template>
<script>
    export default {
        data () {
            return {
                show: false
            }
        }
    }
</script>
