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
    <el-button type="success" @click="showAddDialog">添加用户</el-button>
    <!-- 渲染用户列表 -->
    <el-table :data="userlist" style="width: 100%">
      <el-table-column prop="username" label="姓名" width="180"></el-table-column>
      <el-table-column prop="email" label="邮箱" width="180"></el-table-column>
      <el-table-column prop="mobile" label="电话" width="180"></el-table-column>
      <el-table-column label="用户状态">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.mg_state"
            active-color="#13ce66"
            inactive-color="#ff4949"
            @change="changeState(scope.row)"
          ></el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="300">
        <template slot-scope="scope">
          <el-button
            type="primary"
            icon="el-icon-edit"
            plain
            size="mini"
            @click="showEditDialog(scope.row)"
          ></el-button>
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
    <!-- 添加模态框 -->
    <el-dialog title="添加用户" :visible.sync="dialogAddVisible" width="60%">
      <el-form :model="addForm" :rules="rules" ref="addForm" label-width="80px">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="addForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="addForm.password"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="addForm.email"></el-input>
        </el-form-item>
        <el-form-item label="手机" prop="mobile">
          <el-input v-model="addForm.mobile"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogAddVisible = false">取 消</el-button>
        <el-button type="primary" @click="addUser">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 修改模态框 -->
    <el-dialog title="修改用户" :visible.sync="dialogEditVisible" width="60%">
      <el-form :model="editForm" :rules="rules" ref="editForm" label-width="80px">
        <el-form-item label="用户名">
          <el-tag type="info">{{ editForm.username }}</el-tag>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="editForm.email"></el-input>
        </el-form-item>
        <el-form-item label="手机" prop="mobile">
          <el-input v-model="editForm.mobile"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogEditVisible = false">取 消</el-button>
        <el-button type="primary" @click="updateUser">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
// import axios from 'axios'

export default {
  data() {
    return {
      userlist: [],
      currentPage: 1,
      pageSize: 4,
      query: '',
      total: 0,
      dialogAddVisible: false,
      dialogEditVisible: false,
      addForm: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      rules: {
        username: [
          { required: true, message: '用户名不能空', trigger: 'change' },
          { min: 3, max: 6, message: '长度在 3 到 6 个字符', trigger: 'change' }
        ],
        password: [
          { required: true, message: '用户名不能空', trigger: 'change' },
          {
            min: 6,
            max: 12,
            message: '长度在 6 到 12 个字符',
            trigger: 'change'
          }
        ],
        email: [
          { type: 'email', message: '来,输入一个合法的邮箱', trigger: 'change' }
        ],
        mobile: [
          {
            pattern: /^1\d{10}$/,
            message: '必须输入个合适的手机号',
            trigger: 'change'
          }
        ]
      },
      editForm: {
        id: '',
        username: '',
        email: '',
        mobile: ''
      }
    }
  },
  methods: {
    getlist() {
      this.axios({
        method: 'get',
        url: 'users',
        params: {
          query: this.query,
          pagenum: this.currentPage,
          pagesize: this.pageSize
        }
      }).then(res => {
        // console.log(res)
        let {
          meta: { status, msg },
          data: { users, total }
        } = res
        if (status === 200) {
          this.userlist = users
          this.total = total
        } else {
          console.log(msg)
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
          return this.axios({
            method: 'delete',
            url: `users/${id}`
          })
        })
        .then(res => {
          // console.log(res)
          let {
            meta: { status }
          } = res
          if (status === 200) {
            this.$message.success('删除成功')
            if (this.userlist.length <= 1 && this.currentPage > 1) {
              this.currentPage--
            }
            this.getlist()
          }
        })
        .catch(() => {
          this.$message.info('删除终止')
        })
    },
    search() {
      this.currentPage = 1
      this.getlist()
    },
    async changeState({ id, mg_state: mgState }) {
      let res = await this.axios({
        method: 'put',
        url: `users/${id}/state/${mgState}`
      })
      // console.log(res)
      let {
        meta: { status, msg }
      } = res
      if (status === 200) {
        this.$message.success('修改成功')
      } else {
        this.$message({
          type: 'error',
          msg: msg
        })
      }
    },
    showAddDialog() {
      this.dialogAddVisible = true
    },
    addUser() {
      this.$refs.addForm.validate(async valid => {
        if (!valid) return false
        let res = await this.axios({
          method: 'post',
          url: 'users',
          data: this.addForm
        })
        // console.log(res)
        let {
          meta: { status, msg }
        } = res
        if (status === 201) {
          // 提示信息
          this.$message.success('创建成功')
          // 关闭模态框
          this.dialogAddVisible = false
          // 清空模态框
          this.$refs.addForm.resetFields()
          // 渲染当前页
          this.total++
          this.currentPage = Math.ceil(this.total / this.pageSize)
          this.getlist()
        } else {
          console.log(msg)
        }
      })
    },
    showEditDialog({ username, id, email, mobile }) {
      // 打开模态框
      this.dialogEditVisible = true
      // 数据回显
      this.editForm.username = username
      this.editForm.id = id
      this.editForm.email = email
      this.editForm.mobile = mobile
    },
    updateUser() {
      this.$refs.editForm.validate(async valid => {
        if (!valid) return false
        let res = await this.axios({
          method: 'put',
          url: `users/${this.editForm.id}`,
          data: this.editForm
        })
        // console.log(res)
        let {
          meta: { status, msg }
        } = res
        if (status === 200) {
          this.dialogEditVisible = false
          this.$refs.editForm.resetFields()
          this.getlist()
        } else {
          this.$message.error(msg)
        }
      })
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
