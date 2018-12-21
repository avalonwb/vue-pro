<template>
  <el-container class="home">
    <el-header>
      <div class="logo"></div>
      <h1>Vue后台项目</h1>
      <div class="quit">
        <a href="javascript:;" @click="quit">点这退出</a>
      </div>
    </el-header>
    <el-container>
      <el-aside width="200px">Aside</el-aside>
      <el-main>Main</el-main>
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
      localStorage.removeItem('key')
      this.$router.push('/login')
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
      background-image: url('~@/assets/logo.png');
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
}
</style>
