<template>
  <el-container class="home">
    <el-header>
      <div class="quit">
        <a href="javascript:;" @click="quit">看这退出</a>
      </div>
      <div class="logo"></div>
      <h1>Vue后台项目-1.1</h1>
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
}
</style>
