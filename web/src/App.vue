<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import jwtDecode from 'jwt-decode';
export default {
  name: "login",
  methods: {
    // 判断value 是否为空
    isEmpty(value) {
      return (
        value === undefined ||
        value === null ||
        (typeof value === 'object' &&  Object.keys(value).length === 0) ||
        (typeof value === 'string' &&  Object.trim().length === 0)
      );
    }
  },
  created() {
    if(localStorage.eleToken){
      const decoded = jwtDecode(localStorage.eleToken);

      this.$store.dispatch('setAuthenticated', !this.isEmpty(decoded));
      this.$store.dispatch('setUser', decoded);
    }
  }
};
</script>

<style>
html,
body,
#app {
  width: 100%;
  height: 100%;
}
</style>
