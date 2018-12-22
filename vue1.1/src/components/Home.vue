<template>
  <el-container class="home">
    <el-header>
      <div class="quit">
        <a href="javascript:;" @click="quit">看这退出</a>
      </div>
      <div class="logo"></div>
      <h1>Vue后台项目-1.1</h1>
    </el-header>
    <el-container class="main">
      <el-aside width="200px">
        <el-menu
          default-active="2"
          class="el-menu-vertical-demo"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
          unique-opened
          router
        >
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>用户管理</span>
            </template>
            <el-menu-item index="/user">
              <i class="el-icon-menu"></i>
              <span slot="title">用户列表</span>
            </el-menu-item>
          </el-submenu>

          <el-submenu index>
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>权限管理</span>
            </template>
            <el-menu-item index>
              <i class="el-icon-menu"></i>
              <span slot="title">角色列表</span>
            </el-menu-item>
            <el-menu-item index>
              <i class="el-icon-menu"></i>
              <span slot="title">权限列表</span>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data() {
    return {}
  },
  methods: {
    quit() {}
  }
}
</script>

<style lang="less" scoped>
.home {
  width: 100%;
  height: 100%;

  .el-header {
    background-color: #2f4050;
    line-height: 60px;

    .logo {
      float: left;
      width: 180px;
      height: 60px;

      background: url('~@/assets/logo.png') no-repeat center;
      background-size: contain;
    }
    h1 {
      color: aliceblue;
      height: 60px;
      text-align: center;
      overflow: hidden;
      margin: 0;
    }
    .quit {
      float: right;
      width: 180px;
      height: 60px;

      a {
        color: snow;
        font-size: 20px;
        text-decoration: none;
      }
    }
  }
  .main {
    .el-menu {
      height: 100%;
    }
  }
}
</style>
