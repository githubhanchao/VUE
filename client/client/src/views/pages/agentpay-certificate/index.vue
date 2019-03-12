<template>
  <div class="agentpay-certificate">
    <div class="page-header-title">
      <page-header-comp :title="pageMeta.title" :titleTip="pageMeta.desc"></page-header-comp>
      <div>
        <el-button size="large">代付证书下载</el-button>
        <el-button size="large" type="primary" @click="uploadCertificate">添加/更新证书</el-button>
      </div>
    </div>
    <agentpay-certificate-comp :certificateUploadTime="certificateUploadTime"></agentpay-certificate-comp>
    <el-dialog :visible.sync="uploadAgentpayCertificateVisible"  v-if="uploadAgentpayCertificateVisible">
      <upload-agentpay-certificate-comp :action="agentpayFileUploadUrl"
                                        @fileUploadOnSuccessEmit="fileUploadOnSuccess"
                                        @fileUploadOnErrorEmit="fileUploadOnError"
                                        @uploadChangedEmit="uploadChanged"></upload-agentpay-certificate-comp>
    </el-dialog>
  </div>
</template>

<script>
  import { mapState, mapActions } from 'vuex';
  import pageHeaderComp from '@components/page-header';
  import agentpayCertificateComp from '@components/agentpay-certificate';
  import uploadAgentpayCertificateComp from '@components/upload-agentpay-certificate';
  import UrlConfig from '@/utils/UrlConfig';
  import queryString from 'query-string';
  import RequestHeaderUtil from '@/utils/RequestHeaderUtil';

  export default {
    name: 'account-detail',
    components: {
      pageHeaderComp,
      agentpayCertificateComp,
      uploadAgentpayCertificateComp,
    },
    data() {
      return {
        certificateUploadTime: '2017.9.13 20:08:20',
        agentpayFileUploadUrl: '',
        uploadAgentpayCertificateVisible: false,
      };
    },
    created: function () {
      this.agentpayFileUploadUrl = `${window.appConfig.apiUrlPrefix}/v1/` + UrlConfig.AGENTPAY_BATCH_FILE_UPLOAD_PATH +
        '?access-token=' + RequestHeaderUtil.getAccessTokenHeader();
    },
    computed: {
      ...mapState({
        appMeta: state => state.meta.appMeta,
        pageMeta: state => state.meta.pageMeta,
      }),
    },
    methods: {
      uploadCertificate() {
        this.uploadAgentpayCertificateVisible = true;
      },
      fileUploadOnSuccess(response) {
        this.$router.back();
      },
      fileUploadOnError(error) {
        const message = error.message.substring(error.message.indexOf('{'))
        const respError = JSON.parse(message)
        this.$message({
          showClose: true,
          message: respError.respMessage,
          type: 'error',
        });
      },

      uploadChanged(file) {
//        if (file.name.indexOf('.xlsx') === -1) {
//          this.$message({
//            showClose: true,
//            message: '上传只支持后缀名为xlsx的excel格式的文件',
//            type: 'error',
//          });
//        }
      },
    },
  };
</script>

<style>
  .page-header-title {
    margin-bottom: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .agentpay-certificate .el-dialog {
    padding-top: 0;
    width: 500px;
  }
</style>
