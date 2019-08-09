<template>
  <div class="home">
    <header-nav></header-nav>
    <template class="container">
      <sidle-menu class="left"></sidle-menu>
      <router-view class="right"></router-view>
    </template>
  </div>
</template>

<script>
import HeaderNav from '../components/Nav'
import SidleMenu from '../components/SidleMenu'
export default {
  name: 'home',
  components: {
    HeaderNav,
    SidleMenu
  }
}
</script>

<style scoped>
.home {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.container {
  display: flex;
}
.left {
  width: 180px;
}
.right {
  margin-left: 180px;
  flex: 1;
}
</style>
