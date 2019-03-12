<template>
  <div id="ip-add" class="ip-add">
    <div class="role-edit-title">
      <page-header-comp :title="title" :titleTip="pageMeta.desc"></page-header-comp>
    </div>
  <el-card id="ip-manager-table" class="ip-manager-table"  :data="dynamicValidateForm">

      <el-form :model="dynamicValidateForm" ref="dynamicValidateForm" label-width="100px" class="demo-dynamic" >

        <el-form-item v-for="(item, index) in dynamicValidateForm.ipInfo" :key="index" class="ip" :label="'IP '+ (index+1)"
          :prop="'ipInfo.' + index "
          :rules="{validator: validateAmount, trigger: 'blur' }">
          <el-input type="ip" placeholder="0.0.0.0" v-model="dynamicValidateForm.ipInfo[index]" ></el-input>
          <el-button v-if="index >0" @click.prevent="removeDomain(dynamicValidateForm.ipInfo,index)" class="deleteBtn">删除</el-button>
        </el-form-item>

        <el-form-item>
          <el-button @click="addDomain" type="success" v-show="isShow" plain>添加IP</el-button>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitForm">保存</el-button>

            <el-button @click="resetForm">取消</el-button>
          </el-form-item>
        </el-form>
    </el-card>
    <el-dialog :visible.sync="authCaptchaDialogVisible" v-if="authCaptchaDialogVisible" class="authCapth" :close-on-click-modal="false">
      <auth-captcha-comp class="authCaptchaComp" :auth_token="captchaAuthToken"
                         :accountNo="defaultEmail"
                         @authCaptchaFinishEmit="authCaptchaFinishEvent">
      </auth-captcha-comp>
    </el-dialog>
  </div>
</template>

<script>
  import Vue from 'vue';
  import { mapState } from 'vuex';
  import base64 from 'js-base64';
  import pageHeaderComp from '@components/page-header';
  import authCaptchaComp from '@components/auth-captcha';
  import ActionTypeName from '@/utils/ActionTypeName';
  import UrlConfig from '@/utils/UrlConfig';
  import FlowControlConst from '@/utils/FlowControlConst';
  import router from '@/router';
  import ElInput from "../../../../node_modules/element-ui/packages/input/src/input.vue";

  export default {
    name: 'ip-add',
    components: {
      ElInput,
      pageHeaderComp,
      authCaptchaComp,
    },
    data() {
//      //添加校验
      const validateAmount = (rule, value, callback) => {
        if (!value) {
          callback(new Error('IP不能为空'));
          return;
        }
        if (!/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/.test(value)) {
          callback(new Error('IP格式错误'));
          return;
        }
        callback();
      };
      return {
        title: '编辑IP白名单',
        dynamicValidateForm: {
          ipInfo: [{
            value :''
          }],
        },
        authCaptchaDialogVisible: false,
        captchaAuthToken: '',
        isShow: true,
        validateAmount,
        rules: {
          ipInfo: [
            { required: true, message: 'IP格式错误', trigger: 'blur' },
            { validator: validateAmount, trigger: 'blur' },
            { required: true, message: 'IP不能为空', trigger: 'blur' },
          ],
        },
      };
    },
    created: function () {
      this.getCustomerIp();
    },
//    监控input对象
    watch: {
      dynamicValidateForm: {
        handler(newValue, oldValue) {
          for (let i = 0; i < newValue.ipInfo.length; i++) {
            if (!newValue.ipInfo[i]) { //input不为空
             this.isShow = false;
             return;
            }
          }
          //条数小于20条
          this.isShow = newValue.ipInfo.length < 20;
        },
        deep: true,
      },
    },
    computed: {
      ...mapState({
        appMeta: state => state.meta.appMeta,
        pageMeta: state => state.meta.pageMeta,
      }),
      defaultRolePerms() {
        return this.pageMeta.defaultRolePerms;
      },
      defaultEmail() {
        return this.$store.state.user.userInfo.defaultEmail;
      },

      allPermissions() {
        if (this.permissions && this.permissions.children) {

          this.recursionPermission(this.permissions.children);
          return this.permissions.children;
        }

        return [];
      },

    },
    methods: {
      submitForm() {
        this.$refs['dynamicValidateForm'].validate((valid) => {
          if (valid) {
            this.authCaptchaFinishEvent();
          }
        });
      },

      authCaptchaFinishEvent(response) {
//        this.captchaAuthToken = response.auth_token;
//        debugger;
            Vue.axios.post(UrlConfig.IP_ADD,
              {
                ips: this.dynamicValidateForm.ipInfo.join('#'),
                auth_token: this.$route.query.auth_token,
              })
              .then((res) => {
                this.$message({
                  showClose: true,
                  message: '修改成功',
                  type: 'success',
                });
              })
              .catch((error) => {
                Vue.prototype.$message({
                  showClose: true,
                  message: error.respMessage,
                  type: 'error',
                });
              });
            this.$router.push('/home/ip-white-list');
      },

      resetForm() {
        this.$router.push('/home/ip-white-list');
      },

      removeDomain(item, zero) {
        if (item[zero] !== '') {
          this.$confirm('确定要删除该IP吗?', '删除确认', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
          }).then(() => {
            this.dynamicValidateForm.ipInfo.splice(zero, 1);
            this.$refs['dynamicValidateForm'].validate((valid) => {
              if (valid) {
              }
            });
          });
        } else {
          this.dynamicValidateForm.ipInfo.splice(zero, 1);
          this.$refs['dynamicValidateForm'].validate((valid) => {
            if (valid) {
            }
          });
        }
      },

      addDomain() {
        const index = this.dynamicValidateForm.ipInfo;
        if (index.length < 20) {
          this.isShow = true;
          this.dynamicValidateForm.ipInfo.push('');
        } else {
          this.isShow = false;
        }
      },
      getCustomerIp() {
        this.$store.dispatch(ActionTypeName.GETCUSTOMERIP).then((response) => {
          if (response.data.length === 0) {
            this.dynamicValidateForm.ipInfo[0] = '0.0.0.0';
          } else{
            const ipInfo = response.data.map((value) => {
              return base64.Base64.decode(value);
            });
            this.dynamicValidateForm.ipInfo = ipInfo;
          }
          const index = this.dynamicValidateForm.ipInfo;
          if (index.length < 20) {
            this.isShow = true;
          } else {
            this.isShow = false;
          }
        })
        .catch((error) => {
            Vue.prototype.$message({
              showClose: true,
              message: error.respMessage,
              type: 'error',
            });
          });
        this.dynamicValidateForm.ipInfo[0] = '0.0.0.0';
      },
      // 身份校验
      authCaptchaEvent(captcha) {
        this.authCaptchaErrStr = '';
        this.authCaptchaReqLoading = true;
        this.authCaptcha({
          auth_token: this.auth_token,
          service_captcha: captcha,
          service_captcha_type: this.verifyMode,
          is_new_customer: this.isNewCustomer,
        })
          .then((response) => {
            this.countStart = false;
            this.$emit('authCaptchaFinishEmit', response);
          })
          .catch((error) => {
            this.countStart = false;
            this.authCaptchaReqLoading = false;
            this.$emit('authCaptchaFailEmit');
            if (error.respCode === ResponeUtil.RESP_CODES.TOKEN_EXPIRED) {
              this.$message({
                showClose: true,
                message: '页面长时间未进行操作，请重新发起',
                type: 'error',
              });
              this.countStart = false;
            } else {
              this.authCaptchaErrStr = error.respMessage;
            }
          });
      },
    },
  };
</script>
<style>

  .role-edit-title {
    margin-bottom: 20px;
  }
  .ip{
    width: 35%;
  }
  .deleteBtn{
    position: absolute;
    margin-left: 105%;
    margin-top: -40px;
  }
  .demo-dynamic{
    width: 100%;
    margin-left: 25%;
  }

</style>
