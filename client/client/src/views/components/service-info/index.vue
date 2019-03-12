<template>
  <el-card class="role-manager-table">
    <el-table :data="dataSource">
      <el-table-column label="服务类型" prop="service_code"></el-table-column>
      <el-table-column label="生效时间" prop="start_time"></el-table-column>
      <el-table-column label="失效时间" prop="end_time"></el-table-column>
      <el-table-column label="状态">
        <template slot-scope="scope">
          <span v-if="scope.row.enable !== '过期'">{{ scope.row.enable }}</span>
          <span style="color: #b4bccc" v-else>{{ scope.row.enable }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="150">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="showDetail(dataSource[scope.$index])">查看</el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>
<script>
  export default {
    props: {
      dataSource: {
        type: Array,
        required: true,
      },
    },
    data() {
      return {
      
      };
    },
    computed: {
    
    },
    methods: {
      showDetail(item) {
        this.$emit('showDetailEmit', item);
      },
    },
  };
</script>
<style>

</style>
