
<template>
  <el-card id="upload-batch-file-card" class="upload-batch-file-card">
    <div class="upload-batch-file-head">
      <h3>上传批次文件</h3>
      <a style="color: #409EFF; cursor: pointer; font-weight: 700;" class="el-icon-download"
         download="excel模板.excel" @click="downloadExcelTemplate">EXCEL模板</a>
    </div>
    <div class="upload-batch-file-content">
      <el-upload
        drag
        :action="action"
        :limit="1"
        :accept="acceptFileType"
        :on-success="fileUploadOnSuccess"
        :on-error="fileUploadOnError"
        :on-change="uploadChanged"
        :before-upload="beforeUpload"
        multiple>
        <i class="el-icon-upload"></i>
        <div class="el-upload__text"><em>点击上传</em></div>
        <div class="el-upload__tip" slot="tip">只能上传 excel 文件，批次文件的账户数不超过500条</div>
      </el-upload>
    </div>
  </el-card>
</template>

<script>

  import RequestHeaderUtil from '@/utils/RequestHeaderUtil';
  import UrlConfig from '@/utils/UrlConfig';

  export default {
    name: 'upload-batch-file-card',
    props: {
      action: {
        type: String,
        required: true,
      },
      excelTemplateUrl: {
        type: String,
        required: true,
      },
    },
    data() {
      return {
        acceptFileType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      };
    },
    created: function () {

    },
    methods: {

      downloadExcelTemplate() {
        window.open(this.excelTemplateUrl);
      },

      fileUploadOnSuccess(response) {
        this.$emit('fileUploadOnSuccessEmit', response);
      },

      fileUploadOnError(err) {
        this.$emit('fileUploadOnErrorEmit', err);
      },

      uploadChanged(file) {
        this.$emit('uploadChangedEmit', file);
      },

      beforeUpload(file) {
        if (file.name.indexOf('.xlsx') === -1) {
          this.$message({
            showClose: true,
            message: '上传只支持后缀名为xlsx的excel格式的文件',
            type: 'error',
          });
          return false;
        }
        return true;
      },
    },
  };
</script>

<style>

  .upload-batch-file-card div.el-card__body {
    padding: 0px 20px;
  }

  .upload-batch-file-content {
    display: flex;
    justify-content: center;
    align-items: center;
    padding-top: 100px;
    padding-bottom: 100px;
  }

  .upload-batch-file-head {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

</style>
