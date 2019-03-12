
<template>
  <el-card id="role-manager-table" class="role-manager-table" v-loading="tableLoading">
    <el-table :data="roleInfo" style="width: 100%">
      <el-table-column min-width="100" label="角色名称" prop="displayName"></el-table-column>
      <el-table-column min-width="100" label="描述" prop="description"></el-table-column>
      <el-table-column label="创建时间" prop="createDate"></el-table-column>
      <el-table-column label="状态">
        <template slot-scope="scope">
          <span style="color: #b4bccc" v-if="scope.row.status !== 'normal'">{{ scope.row.statusLabel }}</span>
          <span v-if="scope.row.status === 'normal'">{{ scope.row.statusLabel }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="150">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" v-if="roleInfo[scope.$index].editAble" @click="editRole(roleInfo[scope.$index].id)">编辑</el-button>
          <el-button size="mini" v-if="roleInfo[scope.$index].editAble" @click="deleteRole(roleInfo[scope.$index].id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script>

  import Vue from 'vue';
  import router from '@/router';

  export default {
    name: 'role-manager-table',
    props: {
      action: {
        type: String,
        required: true,
      },
    },
    data() {
      return {
        tableLoading: false,
        roleInfo: [],
        curPageIndex: 1,
        pageSize: 20,
        pageSizes: [10, 20, 30, 40],
      };
    },
    created: function () {
      this.loadRoleInfo();
    },
    methods: {
      loadRoleInfo() {
        this.tableLoading = true;
        Vue.axios.get(this.action)
          .then((response) => {
            this.tableLoading = false;
            this.roleInfo = response.data;
          })
          .catch((error) => {
            this.tableLoading = false;
            console.log(error);
          });
      },

      deleteRoleInfo(roleId) {
        const param = {
          role_id: roleId,
        };

        Vue.axios.delete(this.action, { data: param })
          .then((response) => {
            this.loadRoleInfo();
            this.$message({
              type: 'success',
              message: '删除成功!',
            });
          })
          .catch((error) => {
            this.$message({
              showClose: true,
              message: error.respMessage,
              type: 'error',
            });
          });
      },

      editRole(roleId) {
        const role = this.roleInfo.filter((item) => {
          if (item.id === roleId) {
            return item;
          }
        });

        router.push({ path: '/home/role-edit',
          query: { roleId,
            desc: role[0].description,
            status: role[0].status,
            displayName: role[0].displayName }
        });
      },

      deleteRole(roleId) {
        this.$confirm('确定要删除该角色吗?', '删除确认', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }).then(() => {
          this.deleteRoleInfo(roleId);
        });
      },
    },
  };
</script>

<style>

  .role-manager-table {
    width: 100%;
    height: auto;
    margin: 0 auto;
    background-color: white;
  }

</style>
