<template>
  <div class="page-header-title">
    <div>
      <div>
        <h2 class="title">添加/更新证书</h2>
        <div class="title-txt-tip">
          <span>添加/更新证书将会使原有证书被覆盖，请谨慎操作！</span>
        </div>
      </div>
    
      <div>
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
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          <div class="el-upload__tip" slot="tip">只能上传 cer 文件</div>
        </el-upload>
      </div>
    </div>
  </div>
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
