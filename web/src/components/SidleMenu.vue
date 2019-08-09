<template>
  <el-row class="sidle-box">
    <el-col :span="12">
      <el-menu
        class="el-menu-vertical-demo"
        background-color="#324057"
        text-color="#fff"
        active-text-color="#ffd04b"
      >
        <router-link to="/home">
          <el-menu-item index="0">
            <i></i>
            <span slot="title">首页</span>
          </el-menu-item>
        </router-link>
        <template v-for="item in items">
          <el-submenu v-if="item.children" :index="item.path" :key="item.path">
            <template slot="title">
              <i></i>
              <span slot="title">{{item.name}}</span>
            </template>
            <router-link
              v-for="(childItem, index) in item.children"
              :to="childItem.path"
              :key="index"
            >
              <el-menu-item :index="childItem.path">
                <span slot="title">{{childItem.name}}</span>
              </el-menu-item>
            </router-link>
          </el-submenu>
        </template>
      </el-menu>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: "SidleMenu",
  data() {
    return {
      items: [
        {
          icon: "",
          name: "资金管理",
          path: "fundsmanage",
          children: [
            {
              path: "fundlist",
              name: "资金流水"
            }
          ]
        },
        {
          icon: "",
          name: "信息管理",
          path: "infomanage",
          children: [
            {
              path: "info",
              name: "个人信息"
            }
          ]
        }
      ]
    };
  }
};
</script>

<style>
.sidle-box {
  position: fixed !important;
  top: 60px;
  left: 0;
  min-height: 100%;
  background-color: #324057;
  z-index: 99;
}
.el-menu {
  border: none !important;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 180px;
  min-height: 400px;
}
.el-menu-vertical-demo {
  width: 35px;
}
.el-submenu .el-menu-item {
  min-width: 180px !important;
}

.hiddenDropdown,
.hiddenDropname {
  display: none;
}
a {
  text-decoration: none;
}
</style>
