<template>
  <div class="nav">
    <el-row>
      <el-col :span="6" class="logo-box">
        <img src="../assets/images/logo.png" class="logo" />
        <span class="title">资金管理系统</span>
      </el-col>
      <el-col :span="6" class="user-box">
        <div class="userinfo">
          <img :src="user.avatar" class="avatar" />
          <div class="welcome-box">
            <p class="come">欢迎</p>
            <p class="name">{{user.name}}</p>
          </div>
          <div class="username">
            <el-dropdown trigger="click" @command="setDialogInfo">
              <span class="el-dropdown-link">
                <i class="el-icon-caret-bottom el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="info">个人信息</el-dropdown-item>
                <el-dropdown-item command="quit">退出</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "HeaderNav",
  computed: {
    user () {
      return this.$store.state.user;
    }
  },
  methods: {
    setDialogInfo (type) {
      switch (type) {
        case "info": 
          this.showInfoList();
          break;
        case "quit":
          this.quit();
          break;
      }
    },
    showInfoList() {
      this.$router.push('/info');
    },
    quit() {
      // 清楚本地Token
      localStorage.removeItem('eleToken');
      // 调用vuex active quitCurrentUser方法退出
      this.$store.dispatch('quitCurrentUser');
      // 跳转到登录页面
      this.$router.push('/login');
    }
  }
};
</script>


<style scoped>
.nav {
  width: 100%;
  height: 60px;
  min-width: 600px;
  padding: 5px;
  background-color: #324057;
  color: #fff;
  box-sizing: border-box;
}

.logo-box {
  height: 50px;
  line-height: 50px;
}

.logo {
  width: 50px;
  border-radius: 18px;
}

.title {
  line-height: 50px;
  vertical-align: top;
  margin-left: 5px;
  font-size: 16px;
  font-weight: bolder;
  letter-spacing: 3px;
}

.user-box {
  float: right;
}

.userinfo {
  box-sizing: border-box;
  float: right;
}

.avatar {
  width: 50px;
  border-radius: 50%;
}
.welcome-box {
  padding: 5px 10px 0 10px;
  display: inline-block;
  height: 50px;
  line-height: 20px;
  text-align: center;
  vertical-align: top;
}
.come {
  font-size: 12px;
}

.name {
  color: #409eff;
  font-weight: bolder;
}
.username {
  display: inline-block;
  vertical-align: top;
  cursor: pointer;
  margin-right: 10px;
  margin-top: 20px;
}

.el-dropdown-link {
  color: #fff;
}
</style>
