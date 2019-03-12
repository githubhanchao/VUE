<template>
  <div class="batch-apply">
    <div class="batch-apply-title">
      <page-header-comp :title="pageMeta.title" :titleTip="pageMeta.desc"></page-header-comp>
    </div>
    <upload-batch-file-comp :action="agentpayFileUploadUrl" :excelTemplateUrl="templateDownloadUrl"
                            @fileUploadOnSuccessEmit="fileUploadOnSuccess"
                            @fileUploadOnErrorEmit="fileUploadOnError"
                            @uploadChangedEmit="uploadChanged"></upload-batch-file-comp>
  </div>
</template>

<script>
  import { mapState, mapActions } from 'vuex';
  import pageHeaderComp from '@components/page-header';
  import uploadBatchFileComp from '@components/upload-batch-file';
  import UrlConfig from '@/utils/UrlConfig';
  import RequestHeaderUtil from '@/utils/RequestHeaderUtil'
  import router from '@/router';
  import ResponeUtil from '@/utils/ResponeUtil';

  export default {
    name: 'batch-apply',
    components: {
      pageHeaderComp,
      uploadBatchFileComp,
    },
    data() {
      return {
        templateDownloadUrl: '',
        agentpayFileUploadUrl: '',
      };
    },
    created: function () {
      this.agentpayFileUploadUrl = `${window.appConfig.apiUrlPrefix}/v1/` + UrlConfig.AGENTPAY_BATCH_FILE_UPLOAD_PATH +
                '?access-token=' + RequestHeaderUtil.getAccessTokenHeader();
      this.templateDownloadUrl = '/assets/代付Excel模板.xlsx';
    },
    computed: {
      ...mapState({
        appMeta: state => state.meta.appMeta,
        pageMeta: state => state.meta.pageMeta,
      }),
    },
    methods: {
      fileUploadOnSuccess(response) {
        this.$router.push('/home/batch-agentpay');
      },

      fileUploadOnError(error) {
        if (error.status === 401) {
          router.push('/login');
          this.$message({
            showClose: true,
            message: '页面已过期，请重新登录',
            type: 'error',
          });
          return;
        }

        const message = error.message.substring(error.message.indexOf('{'));
        const respError = JSON.parse(message);
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

  .batch-apply-title {
    margin-bottom: 20px;
  }

  .batch-apply {
    margin-bottom: 20px;
  }

</style>
