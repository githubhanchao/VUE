
<template>
  <el-card id="operator-manager-table" class="operator-manager-table" v-loading="loading">
    <el-select v-model="queryCond.role" placeholder="按角色筛选" :clearable="true" @change="change" class="role-select">
      <el-option
        v-for="item in roles"
        :key="item.displayName"
        :label="item.displayName"
        :value="item.id">
      </el-option>
    </el-select>
    <el-table :data="tableData" class="operate">
      <el-table-column min-width="80" label="姓名" prop="name"></el-table-column>
      <el-table-column min-width="80" label="角色" prop="roleName"></el-table-column>
      <el-table-column :show-overflow-tooltip="true" label="账号" prop="defaultEmail"></el-table-column>
      <el-table-column label="绑定手机" :show-overflow-tooltip="true" prop="defaultMobile">
        <template slot-scope="scope">
          {{ scope.row.defaultMobile || '--' }}
        </template>
      </el-table-column>
      <el-table-column :show-overflow-tooltip="true" label="创建时间" prop="dateCreated"></el-table-column>
      <el-table-column label="状态" prop="statusLabel" width="60">
        <template slot-scope="scope">
          <span style="color: #b4bccc" v-if="scope.row.status !== 'normal'">{{ scope.row.statusLabel }}</span>
          <span v-if="scope.row.status === 'normal'">{{ scope.row.statusLabel }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="150">
        <template slot-scope="scope">
          <el-button size="mini" v-if="scope.row.editAble" type="primary" @click="editOperator(scope.$index)">编辑</el-button>
          <el-button size="mini" v-if="scope.row.editAble" @click="deleteOperator(scope.$index)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script>
  import moment from 'moment';

  export default {
    name: 'operator-manager-table',
    props: {
      loading: {
        type: Boolean,
        required: true,
      },
      tableData: {
        type: Array,
        required: true,
      },
      roles: {
        type: Array,
        required: true,
      },
    },
    data() {
      return {
        queryCond: {
          role: '',
        },
      };
    },
    methods: {
      responseData() {
        this.$emit('changeTableEmit', this.queryCond);
      },
      change(val) {
        this.$emit('changeEmit', val);
      },
      deleteOperator(index) {
        this.$confirm('确定要删除该操作员吗？', '删除确认', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }).then(() => {
          this.$emit('deleteEmit', this.tableData[index]);
        }).catch((error) => {
          console.log(error);
        });
      },
      editOperator(index) {
        this.$router.push({ path: '/home/operator-add',
          query: {
            role_id: this.tableData[index].roleId,
            name: this.tableData[index].name,
            email: this.tableData[index].defaultEmail,
            status: this.tableData[index].status,
            displayName: this.tableData[index].roleName,
            operator_id: this.tableData[index].id,
          } });
      },
      itemFormatTimestamp(timestamp, formatStr) {
        if (moment(timestamp).isValid()) {
          return moment(timestamp).format(formatStr);
        }
        return timestamp;
      },
    },
  };
</script>

<style scoped>
  .operator-manager-table {
    width: 100%;
    height: auto;
    margin: 0 auto;
    background-color: white;
  }
  .role-select {
    margin-bottom: 20px;
  }
</style>
