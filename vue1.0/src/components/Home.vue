<template>
  <el-container class="home">
    <el-header>
      <div class="logo"></div>
      <h1>Vue后台项目</h1>
      <div class="quit">
        <a href="javascript:;" @click="quit">点这退出</a>
      </div>
    </el-header>

    <el-container class="main">
      <el-aside width="200px">
        <el-menu
          default-active=""
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
              <i class="el-icon-setting"></i>
              <span slot="title">用户列表</span>
            </el-menu-item>

          </el-submenu>

          <el-submenu index="2">

            <template slot="title">
              <i class="el-icon-location"></i>
              <span>权限管理</span>
            </template>

            <el-menu-item index="2">
              <i class="el-icon-setting"></i>
              <span slot="title">角色列表</span>
            </el-menu-item>

            <el-menu-item index="3">
              <i class="el-icon-setting"></i>
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
    quit() {
      this.$confirm('确定要退出哈?', '提示', {
        type: 'warning'
      })
        .then(() => {
          this.$message.success('退出成功')
          localStorage.removeItem('key')
          this.$router.push('/login')
        })
        .catch(() => {
          this.$message.info('取消退出')
        })
    }
  }
}
</script>

<style lang="less" scoped>
.home {
  width: 100%;
  height: 100%;

  .el-header {
    background-color: #2f4050;
    display: flex;

    .logo {
      width: 180px;
      background-image: url("~@/assets/logo.png");
      background-size: contain;
      background-repeat: no-repeat;
      background-position: center;
    }
    h1 {
      flex: 1;
      line-height: 60px;
      text-align: center;
      color: aliceblue;
    }
    .quit {
      width: 180px;
      line-height: 60px;
      text-align: center;

      a {
        color: darkgray;
        font-size: 20px;
        text-decoration: none;
      }
    }
  }

  .main {
    width: 100%;
    height: 100%;

    .el-aside {
      height: 100%;

      .el-menu {
        height: 100%;
      }
    }
  }
}
</style>
