<template>
  <div class="info">
    <el-row type='flex' class="row-bg" justify="center">
      <el-col :span="8">
        <div class="user-avatar">
          <img :src="user.avatar" class="avatar">
        </div>
      </el-col>
      <el-col :span="16">
        <div class="user-info">
          <div class="user-name">
            <i class="iconfont icon-user"></i>
            <span>{{user.name}}</span>
          </div>
          <div class="user-identity">
            <i class="iconfont icon-guanliyuan"></i>
            <span>{{user.identity == 'manager' ? '管理员' : '员工'}}</span>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'info',
  computed: {
    user () {
      return this.$store.state.user;
    }
  }
}
</script>


<style scoped>
.info {
  width: 100%;
  height: 100%;
}

.row-bg {
  height: inherit;
}

.user-avatar {
  padding-top: 250px;
  text-align: center;
}
.avatar {
  border-radius: 50%;
}

.user-info {
  padding-top: 300px;
  padding-left: 50px;
  height: 100%;
  line-height: 50px;
  font-size: 24px;
  background-color: #f1f2f6;
}
.user-info .iconfont {
  font-size: 24px;
  margin-right: 4px;
}
</style>

