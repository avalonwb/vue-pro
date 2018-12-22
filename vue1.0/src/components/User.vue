<template>
  <div class="user">
    <!-- 头皮屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>活动列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 搜索框 -->
    <el-input placeholder="请输入内容" v-model="query" class="input-with-select">
      <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
    </el-input>
    <!-- 渲染用户列表 -->
    <el-table :data="userlist" style="width: 100%">
      <el-table-column prop="username" label="姓名" width="180"></el-table-column>
      <el-table-column prop="email" label="邮箱" width="180"></el-table-column>
      <el-table-column prop="mobile" label="电话" width="180"></el-table-column>
      <el-table-column label="用户状态">
        <template slot-scope="scope">
          <el-switch v-model="scope.row.mg_state" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="300">
        <template slot-scope="scope">
          <el-button type="primary" icon="el-icon-edit" plain size="mini"></el-button>
          <el-button
            type="danger"
            icon="el-icon-delete"
            plain
            size="mini"
            @click="delOne(scope.row.id)"
          ></el-button>
          <el-button type="success" icon="el-icon-check" plain size="mini">分配角色</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[4, 6, 8, 10]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      userlist: [],
      currentPage: 1,
      pageSize: 4,
      query: '',
      total: 0
    }
  },
  methods: {
    getlist() {
      axios({
        method: 'get',
        url: 'http://localhost:8888/api/private/v1/users',
        params: {
          query: this.query,
          pagenum: this.currentPage,
          pagesize: this.pageSize
        },
        headers: {
          Authorization: localStorage.getItem('key')
        }
      }).then(res => {
        console.log(res.data)
        if (res.data.meta.status === 200) {
          this.userlist = res.data.data.users
          this.total = res.data.data.total
        } else {
          console.log(res.data.meta.msg)
        }
      })
    },
    handleSizeChange(val) {
      // console.log(val)
      this.pageSize = val
      this.getlist()
    },
    handleCurrentChange(val) {
      // console.log(val)
      this.currentPage = val
      this.getlist()
    },
    delOne(id) {
      // console.log(id)
      this.$confirm('要删除咩??', '警告', {
        type: 'warning'
      })
        .then(() => {
          axios({
            method: 'delete',
            url: `http://localhost:8888/api/private/v1/users/${id}`,
            headers: {
              Authorization: localStorage.getItem('key')
            }
          }).then(res => {
            // console.log(res.data)
            if (res.data.meta.status === 200) {
              this.$message.success('删除成功')
              if (this.userlist.length <= 1 && this.currentPage > 1) {
                this.currentPage--
              }
              this.getlist()
            }
          })
        })
        .catch(() => {
          this.$message.info('删除终止')
        })
    },
    search() {
      this.currentPage = 1
      this.getlist()
    }
  },
  created() {
    this.getlist()
  }
}
</script>

<style lang='less' scoped>
.user {
  .el-breadcrumb {
    height: 40px;
    line-height: 40px;
    padding: 20px 0;
    font-size: 18px;
  }
  .el-input {
    width: 400px;
  }
}
</style>
