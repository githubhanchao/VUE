<template>
  <div class="customer-certification-step1">
    <el-card class="body">
      <el-form label-width="100px" label-position="left" ref="customerInfo"
               :model="customerInfo" :rules="customerInfoFormRules" class="account-permission-form margin-top-20">
        <div class="business-licence">
          <span style="font-size: 20px;">营业执照（多证合一版）</span><br>
          <div class="flex">
            <el-upload class="upload margin-top-20" :before-upload="imgBeforeUpload"
                       :disabled="editable" :show-file-list="false"
                       :on-success="businessLicenceImgUploadSuccess"
                       :action="imgUploadUrl" drag>
              <i class="el-icon-upload"></i>
              <div class="el-upload__text"><em>上传营业执照</em></div>
              <img v-if="!!businessLicenceImg" :src="businessLicenceImg" class="avatar" @click="showImg(businessLicenceImg)">
              <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过5M</div>
            </el-upload>
            <div style="flex: 1 1 160px; vertical-align: middle;">
              <el-form-item label="名称" prop="registrationName">
                <el-input v-model="customerInfo.registrationName" :disabled="editable" :maxlength="30" placeholder="企业全称 （ 请与营业执照的名称保持一致 ）"></el-input>
              </el-form-item>
              <el-form-item label="信用代码" prop="socialCreditCode">
                <el-input v-model="customerInfo.socialCreditCode" :disabled="editable" :maxlength="18" placeholder="统一社会信用代码（18位）"></el-input>
              </el-form-item>
              <el-form-item label="住所" prop="address" class="address">
                <el-select v-model="customerInfo.belongToProvince" :disabled="editable" @change="handleChange" placeholder="请选择省" class="province">
                  <el-option
                    v-for="item in province"
                    :key="item"
                    :label="item"
                    :value="item">
                  </el-option>
                </el-select>
                <el-select v-model="customerInfo.belongToCity" :disabled="editable" placeholder="请选择市" class="city">
                  <el-option
                    v-for="item in city"
                    :key="item"
                    :label="item"
                    :value="item">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="营业期限至" prop="licenseExpires">
                <el-date-picker v-model="customerInfo.licenseExpires" :disabled="editable" type="date" placeholder="选择日期"></el-date-picker>
              </el-form-item>
              <el-form-item label="经营范围" prop="businessScope">
                <el-input type="textarea" v-model="customerInfo.businessScope" :maxlength="80" :disabled="editable" placeholder="经营范围（不能填写超出经营范围的类目）"></el-input>
              </el-form-item>
            </div>
          </div>
        </div>
        <div class="artificial-person">
          <span style="font-size: 20px;">法人证件</span><br>
          <div class="flex">
            <el-upload class="artificial-upload margin-top-20" :before-upload="imgBeforeUpload"
                       :disabled="editable" :show-file-list="false"
                       :on-success="artificialPersonImgUploadSuccess" :action="imgUploadUrl" drag>
              <i class="el-icon-upload"></i>
              <div class="el-upload__text"><em>上传身份证 正面</em></div>
              <img v-if="!!artificialPersonImg" :src="artificialPersonImg" class="avatar" @click="showImg(artificialPersonImg)">
            </el-upload>
            <el-upload class="artificial-upload margin-top-20" :before-upload="imgBeforeUpload"
                       :disabled="editable" :show-file-list="false"
                       :on-success="artificialPersonBackImgUploadSuccess" :action="imgUploadUrl" drag>
              <i class="el-icon-upload"></i>
              <div class="el-upload__text"><em>上传身份证 背面</em></div>
              <img v-if="!!artificialPersonBackImg" :src="artificialPersonBackImg" class="avatar" @click="showImg(artificialPersonBackImg)">
            </el-upload>
            <div style="flex: 2 1 160px; vertical-align: middle;">
              <el-form-item label="法人姓名" prop="corporate">
                <el-input v-model="customerInfo.corporate" :disabled="editable" :maxlength="10" placeholder="法人证件姓名"></el-input>
              </el-form-item>
              <el-form-item label="法人证件号" prop="credentialNo">
                <el-input v-model="customerInfo.credentialNo" :disabled="editable" :maxlength="18" placeholder="法人身份证号码"></el-input>
              </el-form-item>
            </div>
          </div>
        </div>
        <div class="account-permission">
          <span style="font-size: 20px;">开户许可证</span><br>
          <div class="flex">
            <el-upload class="account-permission-upload margin-top-20" :before-upload="imgBeforeUpload"
                       :disabled="editable" :show-file-list="false"
                       :on-success="accountPermissionImgUploadSuccess" :action="imgUploadUrl" drag>
              <i class="el-icon-upload"></i>
              <div class="el-upload__text"><em>上传开户许可证</em></div>
              <img v-if="!!accountPermissionImg" :src="accountPermissionImg" class="avatar" @click="showImg(accountPermissionImg)">
            </el-upload>
            <el-form-item label="开户许可证" prop="openningPermitCode" style="flex: 1 1 160px;vertical-align: middle;">
              <el-input v-model="customerInfo.openningPermitCode" :disabled="editable" :maxlength="20" placeholder="开户许可证核准号"></el-input>
            </el-form-item>
          </div>
        </div>
      </el-form>
      <div class="horizontal"></div>
      <div class="operator" v-if="operatorVisible">
        <el-button type="primary" class="next" @click="next" :loading="loginBtnLoading">下一步</el-button>
        <!--<el-button class="next">返回修改</el-button>-->
        <!--<el-button type="danger" class="next">提交审核</el-button>-->
      </div>
    </el-card>
  </div>
</template>
<script>
  import Vue from 'vue';
  import UrlConfig from '@/utils/UrlConfig';
  import { customerInfoFormRules } from '@/utils/customerInfoValidation';

  export default {
    name: 'customer-certification-step1',
    props: {
      loginBtnLoading: {
        type: Boolean,
        required: true,
      },
    },
    data() {
      const validateAddress = (rule, value, callback) => {
        if (this.customerInfo.belongToProvince === '') {
          callback(new Error('请输入住所所在省'));
          return;
        }
        if (this.customerInfo.belongToCity === '') {
          callback(new Error('请输入住所所在市'));
          return;
        }
        callback();
      };
      customerInfoFormRules.address = [
        { validator: validateAddress, trigger: 'blur' },
      ];
      return {
        customerInfoFormRules,
        province: [],
        city: [],
        imgUploadUrl: window.appConfig.apiUrlPrefix + '/v1' + UrlConfig.IMG_UPLOAD_PATH,
        operatorVisible: true,
        editable: false,
        customerInfo: {
          businessLicenceImg: '',
          artificialPersonImg: '',
          artificialPersonBackImg: '',
          accountPermissionImg: '',
          registrationName: '',
          socialCreditCode: '',
          belongToProvince: '',
          belongToCity: '',
          licenseExpires: '',
          businessScope: '',
          corporate: '',
          credentialNo: '',
          openningPermitCode: '',
        },
      };
    },
    created() {
      if (this.$route.query.pid && !this.$route.query.isModify) {
        Vue.axios.get(UrlConfig.GET_CUSTOMER_REPORT_DETAIL_PATH, { params: { pid: this.$route.query.pid } })
          .then((response) => {
            this.customerInfo = response.data.list;
            this.customerInfo.businessLicenceImg = response.data.list.socialCreditCodeImg;
            this.customerInfo.artificialPersonImg = response.data.list.legalManIdImg;
            this.customerInfo.artificialPersonBackImg = response.data.list.legalManIdBackImg;
            this.customerInfo.accountPermissionImg = response.data.list.openningPermitCodeImg;
            this.operatorVisible = false;
            this.editable = true;
          })
          .catch((error) => {
            this.$message({
              showClose: true,
              message: error.respMessage,
              type: 'error',
            });
          });
      }
      Vue.axios.get(UrlConfig.PROVINCE_LIST_PATH)
        .then((response) => {
          this.province = response.data;
        })
        .catch((error) => {
          console.log(error.respMessage);
        });
    },
    computed: {
      businessLicenceImg() {
        const imgFileName = this.customerInfo.businessLicenceImg;
        return !imgFileName ?
          '' :
          window.appConfig.apiUrlPrefix + '/v1/file/download?file_name=' + imgFileName;
      },
      artificialPersonImg() {
        const imgFileName = this.customerInfo.artificialPersonImg;
        return !imgFileName ?
          '' :
          window.appConfig.apiUrlPrefix + '/v1/file/download?file_name=' + imgFileName;
      },
      artificialPersonBackImg() {
        const imgFileName = this.customerInfo.artificialPersonBackImg;
        return !imgFileName ?
          '' :
          window.appConfig.apiUrlPrefix + '/v1/file/download?file_name=' + imgFileName;
      },
      accountPermissionImg() {
        const imgFileName = this.customerInfo.accountPermissionImg;
        return !imgFileName ?
          '' :
          window.appConfig.apiUrlPrefix + '/v1/file/download?file_name=' + imgFileName;
      },
    },
    methods: {
      next() {
        if (!this.customerInfo.businessLicenceImg) {
          this.$message({
            showClose: true,
            message: '请上传营业执照',
            type: 'error',
          });
          return;
        }
        if (!this.customerInfo.artificialPersonImg) {
          this.$message({
            showClose: true,
            message: '请上传身份证正面',
            type: 'error',
          });
          return;
        }
        if (!this.customerInfo.artificialPersonBackImg) {
          this.$message({
            showClose: true,
            message: '请上传身份证背面',
            type: 'error',
          });
          return;
        }
        if (!this.customerInfo.accountPermissionImg) {
          this.$message({
            showClose: true,
            message: '请上传开户许可证',
            type: 'error',
          });
          return;
        }
        this.$refs['customerInfo'].validate((valid) => {
          if (valid) {
            this.$confirm('请认真核对所填信息，提交后不可修改，确认提交吗？', '提示', {
              confirmButtonText: '确定提交',
              cancelButtonText: '取消',
              type: 'warning',
            }).then(() => {
              const params = this.customerInfo;
              params.defaultEmail = this.$route.query.defaultEmail;
              this.$emit('nextEmit', params);
            });
          }
        });
      },
      handleChange(value) {
        this.city = [];
        this.customerInfo.belongToCity = '';
        const params = {
          province: value,
        };
        Vue.axios.get(UrlConfig.CITY_LIST_PATH, { params })
          .then((response) => {
            this.city = response.data;
          })
          .catch((error) => {
            console.log(error.respMessage);
          });
      },
      imgBeforeUpload(file) {
        const isValidImg = file.type === 'image/jpeg' || file.type === 'image/png';
        const isLt500K = file.size / 1024 / 1024 < 5;
        if (!isValidImg) {
          this.$message({
            showClose: true,
            message: '上传图片只能是 JPG 格式或PNG 格式!',
            type: 'error',
          });
        }
        if (!isLt500K) {
          this.$message({
            showClose: true,
            message: '上传图片大小不能超过 5M!',
            type: 'error',
          });
        }
        return isValidImg && isLt500K;
      },
      businessLicenceImgUploadSuccess(res, value) {
        this.customerInfo.businessLicenceImg = res.fileName;
      },
      artificialPersonImgUploadSuccess(res, value) {
        this.customerInfo.artificialPersonImg = res.fileName;
      },
      artificialPersonBackImgUploadSuccess(res, value) {
        this.customerInfo.artificialPersonBackImg = res.fileName;
      },
      accountPermissionImgUploadSuccess(res, value) {
        this.customerInfo.accountPermissionImg = res.fileName;
      },
      showImg(imgSrc) {
        if (this.$route.query.pid) {
          window.open(imgSrc, '_blank');
        }
      },
    },
  }
</script>
<style scoped>
  .margin-top-20 {
    margin-top: 20px;
  }
  .customer-certification-step1 {
    width: 90%;
    margin: -80px auto;
    background-color: #fff;
    max-width: 1120px;
  }
  .artificial-person, .account-permission {
    margin-top: 60px;
  }
  .upload {
    flex: 1;
  }
  .business-licence-form, .artificial-person-form, .account-permission-form {
    vertical-align: top;
    flex: 1;
  }
  .artificial-upload {
    vertical-align: top;
    flex: 1;
  }
  .artificial-person-form {
    flex: 2;
  }
  .account-permission-upload, .account-permission-form {
    vertical-align: middle;
    flex: 1;
  }
  .horizontal {
    margin-top: 60px;
    margin-bottom: 60px;
    border-bottom: 1px dashed #d9d9d9;
  }
  .operator {
    text-align: center;
  }
  .next {
    width: 300px;
  }
  .province, .city {
    flex: 1;
  }
  .flex {
    display: flex;
  }
  .avatar {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 10;
    opacity: 1;
  }
</style>
<style>
  .customer-certification-step1 .el-card__body {
    padding: 60px;
  }
  .business-licence .el-upload--text, .business-licence .el-upload-dragger, .business-licence .el-upload-dragger {
    width: 80%;
  }
  .artificial-person .el-upload--text, .artificial-person .el-upload-dragger, .account-permission .el-upload-dragger {
    width: 99%;
  }
  .account-permission .el-upload--text, .account-permission-person .el-upload-dragger, .account-permission .el-upload-dragger {
    width: 80%;
  }
  .address .el-form-item__content {
    display: flex;
  }
  .customer-certification-step1 .el-date-editor.el-input {
    width: 100%;
  }
  .business-licence .el-upload-dragger {
    width: 320px;
    height: 400px;
  }
  .business-licence .el-upload-dragger .el-icon-upload {
    margin: 160px 0 16px;
  }
</style>
