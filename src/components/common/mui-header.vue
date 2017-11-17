<template>
  <div>
    <header class="mui-bar mui-bar-nav">
      <slot></slot>
      <h1 class="mui-title" v-if="title" v-text="title"></h1>
    </header>
  </div>
</template>
<script type="es6">
  export default {
    props: {
      title: {
        type: String
      }
    },
    methods: {}
  }
</script>
