
<template>
  <el-card id="secret-manager-table" class="secret-manager-table" v-loading="loading">
    <div class="head-buttons">
      <!--<el-button size="large" class="edit_role_btn" type="primary"-->
                 <!--@click="downloadSecretBtnClicked">下载服务器密钥</el-button>-->
      <el-button size="large" class="edit_role_btn"
                 @click="secretHelpDocBtnClicked">密钥帮助文档</el-button>
    </div>
    <el-table :data="tableData" class="operate">

      <el-table-column min-width="120" label="创建时间" prop="updateDate"></el-table-column>
      <el-table-column min-width="150" label="密钥类别" prop="serviceType"></el-table-column>
      <el-table-column min-width="100" label="密钥类型" prop="keyType"></el-table-column>
      <el-table-column label="密钥格式" prop="keyFormat" min-width="100"></el-table-column>
      <el-table-column min-width="120" label="生效时间" prop="effectiveStartDate"></el-table-column>
      <el-table-column min-width="120" label="失效时间" >
        <template slot-scope = "scope">
          <span>{{ scope.row.effectiveEndDate }}</span>
          <div v-if="scope.row.imminentExpiry == true">
            <div class="imminentExpiry" prop="imminentExpiry">即将失效</div>
          </div>
          <div v-if="scope.row.isExpiry == true">
            <div class="isExpiry" prop="isExpiry">已失效</div>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="120">
        <template slot-scope="scope">
          <el-button size="mini" @click="viewSecret(scope.row)">查看</el-button>
          <!--<el-button size="mini" @click="editSecret(scope.row)">编辑</el-button>-->
          <el-button size="mini" @click="deleteSecret(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
      <!--</tr>-->
    </el-table>

  </el-card>
</template>

<script>

  import ElInput from "../../../../node_modules/element-ui/packages/input/src/input.vue";

  export default {
    components: {ElInput},
    name: 'secret-manager-table',
    props: {
      tableData: {
        type: Array,
        required: true,
        default: [],
      },
      loading: {
        type: Boolean,
        required: true,
        default: false,
      },
//      isShow: false,
    },
    data() {
      return {
        expandItemLabelWidth: '120px',
        secretDownloadUrl: '/assets/cert/public-key.pem',
        secretHelpUrl: '/assets/key-help/index.html',
      };
    },
    created() {

    },
    methods: {

      downloadSecretBtnClicked() {
        window.open(this.secretDownloadUrl);
      },

      secretHelpDocBtnClicked() {
        window.open(this.secretHelpUrl);
      },

      viewSecret(value) {
        this.$emit('viewSecretEmit', value);
      },

      editSecret(value) {
        this.$emit('editSecretEmit', value);
      },

      deleteSecret(keyId) {
        this.$emit('deleteSecretEmit', keyId);
      },
    },
  };
</script>

<style scoped>
  .secret-manager-table {
    width: 100%;
    height: auto;
    margin: 0 auto;
    background-color: white;
  }
  .head-buttons {
    margin-bottom: 20px;
  }
  .imminentExpiry{
    font-size: 12px;
    margin-left: 80px;
    color: #FFF;
    background: #f55;
    padding: 0 2px;
    border-radius: 3px;
    display: inline-block;
    line-height: normal;
    position: absolute;
    top: 35%;
  }
  .isExpiry{
    font-size: 12px;
    margin-left: 80px;
    color: #FFF;
    background: #777777;
    padding: 0 2px;
    border-radius: 3px;
    display: inline-block;
    line-height: normal;
    position: absolute;
    top: 35%;
  }
</style>
