<template>
  <div id="app">
    <router-view class="main"></router-view>
  </div>
</template>

<script>

// export default {
//   name: 'app',
//   components: {
//   }
// }
</script>

<style lang="scss">
  @import "@/assets/style/index.scss";


  #app {
    
    height: 100%;
    
  }
  .main {
    background-color:#ededed;
    width: 100%;
    overflow: hidden;
  }

</style>
