<template>
  <div>
    <div class="security-center-header-title">
      <page-header-comp :title="pageMeta.title" :titleTip="pageMeta.desc"></page-header-comp>
    </div>
    <el-card class="security-center-container">
      <security-center-comp :securityList="securityListDesc"
                            :securityListStatus="securityList"
                            :pageInfo="pageMeta"
                            :securityLevel="securityLevel"
                            :bindPhoneNum="PhoneNum"
                            @securityOperateEmit="securityOperateEvent"></security-center-comp>
      <el-dialog class="twoFactorStatus" ref="twoFactorStatus" :visible.sync="twoFactorStatus" @close="closeSetGuide">
        <div class="guide" :style="'margin-top:'+guideWordOffsetHeight">亲爱的商户，更加高效安全的口令码验证方式已上线，（弥补了手机验证码发送存在延迟的不足），我们建议您尽快绑定口令码，并且将其作为默认的身份验证方式。</div>
        <img class="guideImg" src="/assets/image/guide-arr.png" />
      </el-dialog>
      <el-dialog :visible.sync="authCaptchaDialogVisible"
                 @close="closeAuthCaptchaComp"
                 :close-on-click-modal="false"
                 v-if="authCaptchaDialogVisible">
        <auth-captcha-comp class="authCaptchaComp" :auth_token="captchaAuthToken" ref="authCaptchaComp"
                           :verifyModeProp="verifyModeProp"
                           :accountNo="defaultEmail" @authCaptchaFinishEmit="authCaptchaFinishEvent">
        </auth-captcha-comp>
      </el-dialog>
      <el-dialog :visible.sync="loginPasswordDialogVisible" @close="closeRetrievePwdResetComp">
        <retrieve-pwd-reset-comp @confirmBtnClickedEmit="confirm"
                                 ref="retrievePwdResetComp"
                                 @modifyBtnClickedEmit="modify"
                                 :loginPwdOperate="true"
                                 :confirmBtnLoading="confirmBtnLoading"></retrieve-pwd-reset-comp>
      </el-dialog>
      <el-dialog :visible.sync="setTradePwdDialogVisible" @close="closeSetTradePwdComp">
        <set-trade-pwd-comp :confirmBtnLoading="confirmSetTradePwdBtnLoading"
                            ref="setTradePwdComp"
                            @setTradePwdFinishEmit="setTradePwdFinishEvent"></set-trade-pwd-comp>
      </el-dialog>
      <el-dialog :visible.sync="bindPhoneNoDialogVisible" v-if="bindPhoneNoDialogVisible">
        <bind-phone-no-comp @bindPhoneNoEmit="bind"></bind-phone-no-comp>
      </el-dialog>
      <el-dialog :visible.sync="installWordAuthenDialogVisible" v-if="installWordAuthenDialogVisible">
        <install-google-verifier-comp
          @installNextStepBtnClickedEmit="installNextStepHandle"></install-google-verifier-comp>
      </el-dialog>
      <el-dialog :visible.sync="bindWordAuthenStep1DialogVisible" v-if="bindWordAuthenStep1DialogVisible">
        <bind-google-verifier-step1-comp @back="step1Back" @wordTokenEmit="saveWordToken"
          @bindGoogleAuthNextStepBtnClickedEmit="bindGoogleAuthNextStepHandle"></bind-google-verifier-step1-comp>
      </el-dialog>
      <el-dialog :visible.sync="bindWordAuthenStep2DialogVisible" v-if="bindWordAuthenStep2DialogVisible">
        <bind-google-verifier-step2-comp :wordToken="captchaWordToken"  @back="step2Back"
          @googleAuthenBindSuccEmit="googleAuthenBindSuccHandle"></bind-google-verifier-step2-comp>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
  import Vue from 'vue';
  import UrlConfig from '@/utils/UrlConfig';
  import securityCenterComp from '@components/security-center';
  import authCaptchaComp from '@components/auth-captcha';
  import retrievePwdResetComp from '@components/retrieve-pwd-reset';
  import bindPhoneNoComp from '@components/bind-phone-no';
  import pageHeaderComp from '@components/page-header';
  import installGoogleVerifierComp from '@components/install-google-verifier';
  import bindGoogleVerifierStep1Comp from '@components/bind-google-verifier-step1';
  import bindGoogleVerifierStep2Comp from '@components/bind-google-verifier-step2';
  import { mapState, mapActions } from 'vuex';
  import store from '@/vuex/store';
  import setTradePwdComp from '@components/set-trade-pwd';
  import ActionTypeName from '@/utils/ActionTypeName';
  import SecurityLevelUtil from '@/utils/SecurityLevelUtil';
  import PhoneNumUtil from '@/utils/PhoneNumUtil';
  import SecurityOptConst from '@/utils/SecurityOptConst';
  import FlowControlConst from '@/utils/FlowControlConst';
  import GuideStatusUtil from '@/utils/GuideStatusUtil';

  export default {
    name: 'security-center',
    components: {
      authCaptchaComp,
      securityCenterComp,
      setTradePwdComp,
      retrievePwdResetComp,
      bindPhoneNoComp,
      pageHeaderComp,
      installGoogleVerifierComp,
      bindGoogleVerifierStep1Comp,
      bindGoogleVerifierStep2Comp,
    },
    data() {
      return {
        authCaptchaDialogVisible: false,
        setTradePwdDialogVisible: false,
        loginPasswordDialogVisible: false,
        confirmBtnLoading: false,
        bindPhoneNoDialogVisible: false,
        installWordAuthenDialogVisible: false,
        bindWordAuthenStep1DialogVisible: false,
        bindWordAuthenStep2DialogVisible: false,

        authCaptchaReqLoading: false,       // 身份验证请求是否正在请求
        authCaptchaErrStr: '',
        confirmSetTradePwdBtnLoading: false,
        captchaAuthToken: '',
        securityOptValue: '',
        verifyModeProp: false,
        servAuthWordVisibleBtn: true,
        captchaWordToken: '',
        twoFactorStatus: false,
        guideWordOffsetHeight: '',
      };
    },
    created() {
      this.$store.dispatch(ActionTypeName.LOAD_SECURITY_LIST)
        .then((res) => {
          if (!res.data[3].status) {
            if (!GuideStatusUtil.getGuideStatus()) {
              this.twoFactorStatus = true;
              const toTopLength = document.querySelector('.twoFactor').offsetTop;
              const clientHeight = document.documentElement.clientHeight;
              const twoFactorHeight = document.querySelector('.twoFactor').offsetHeight;
              // 40:按钮局底部的距离 20:箭头距按钮 140:图片 40:dialog容器padding 72:引导文字高度 20 文字距图片的距离
              this.guideWordOffsetHeight = clientHeight - twoFactorHeight - 40 - 20 - 140 - 40 - 72 - 20 + 'px';
              document.querySelector('.twoFactor').style.top = clientHeight - toTopLength - twoFactorHeight - 40 + 'px';
              document.querySelector('.twoFactor').style.zIndex = 2500;
              GuideStatusUtil.setGuideStatus('true');
            }
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    computed: {
      ...mapState({
        authInfo: state => state.user.authInfo,
        userInfo: state => state.user.userInfo,
        appMeta: state => state.meta.appMeta,
        pageMeta: state => state.meta.pageMeta,
      }),

      captchaDuration() {
        return this.appMeta.ui.captchaDuration;
      },

      defaultEmail() {
        return this.userInfo.defaultEmail;
      },

      PhoneNum() {
        const phoneNum = this.$store.state.user.userInfo.defaultMobile;
        return PhoneNumUtil.stringfyPhoneNum(phoneNum);
      },
      securityList() {
        return this.$store.state.user.securityList;
      },
      securityLevel() {
        return SecurityLevelUtil.computeSecurityLevel(this.securityList);
      },
      securityListDesc() {
        const list = [];
        this.securityList.forEach((item) => {
          if (this.pageMeta.ui && this.pageMeta.ui.securityList) {
            this.pageMeta.ui.securityList.forEach((val) => {
              if (val.name === item.name) {
                list.push(val);
              }
            });
          }
        });
        return list;
      },
      servAuthSmsVisibleBtn() {
        return this.securityList.find(function(item) {  if (item.name === SecurityOptConst.BIND_MOBILE) { return item; } }).status;
      },
    },
    methods: {
      ...mapActions([
        ActionTypeName.RETRIEVE_PWD_RESET,
        ActionTypeName.AUTH_TRADE_PWD,
        ActionTypeName.AUTH_LOGIN_PWD,
        ActionTypeName.MODIFY_LOGIN_PWD,
        ActionTypeName.AUTH_PHONE_NO,
        ActionTypeName.BIND_PHONE_NO,
      ]),
      closeSetGuide() {
        this.twoFactorStatus = false;
        document.querySelector('.twoFactor').style.top = 0;
        document.querySelector('.twoFactor').style.zIndex = 1;
      },
      securityOperateEvent(val) {
        this.securityOptValue = val;
        if (SecurityOptConst.MODIFY_LOGIN_PWD === val) {
          this.eidtLoginPwd();
        }

        if (SecurityOptConst.MODIFY_TRADE_PWD === val) {
          this.modifyTradePwd();
        }

        if (SecurityOptConst.BIND_MOBILE === val) {
          this.bindMobile();
        }

        if (SecurityOptConst.IDENTITY_WORD === val) {
          this.twoFactorStatus = false;
          document.querySelector('.twoFactor').style.zIndex = 1;
          document.querySelector('.twoFactor').style.top = 0 + 'px';
          this.servAuthWordVisibleBtn = false;
          this.bindGoogleAuthen();
        }
      },

      eidtLoginPwd() {
        this.authLoginPwd({
          auth_token: this.authInfo.auth_token,
        })
        .then((response) => {
          this.$store.commit('SET_AUTH_INFO', response.data);
          if (response.data.auth_next_step === '') {
            this.loginPasswordDialogVisible = true;
          }
          if (response.data.auth_next_step === FlowControlConst.CAPTCHA) {
            this.authCaptchaDialogVisible = true;
          }
        })
        .catch((error) => {
          this.confirmBtnLoading = false;
          this.$message({
            showClose: true,
            message: error.respMessage,
            type: 'error',
          });
        });
      },

      modifyTradePwd() {
        store.dispatch(ActionTypeName.AUTH_TRADE_PWD)
          .then((response) => {
            this.verifyModeProp = this.servAuthSmsVisibleBtn;
            this.captchaAuthToken = response.data.auth_token;
            this.$store.commit('SET_AUTH_INFO', response.data);
            if (response.data.auth_next_step === '') {
              this.setTradePwdDialogVisible = true;
            }
            if (response.data.auth_next_step === FlowControlConst.CAPTCHA) {
              this.authCaptchaDialogVisible = true;
            }
          })
          .catch((error) => {
            this.$message({
              showClose: true,
              message: error.respMessage,
              type: 'error',
            });
          });
      },

      bindMobile() {
        this.authPhoneNo({
          auth_token: this.authInfo.auth_token,
        })
          .then((response) => {
            this.verifyModeProp = this.servAuthSmsVisibleBtn;
            this.captchaAuthToken = response.data.auth_token;
            this.$store.commit('SET_AUTH_INFO', response.data);
            if (response.data.auth_next_step === '') {
              this.bindPhoneNoDialogVisible = true;
            }
            if (response.data.auth_next_step === FlowControlConst.CAPTCHA) {
              this.authCaptchaDialogVisible = true;
            }
          })
          .catch((error) => {
            this.confirmBtnLoading = false;
            this.$message({
              showClose: true,
              message: error.respMessage,
              type: 'error',
            });
          });
      },

      bindGoogleAuthen() {
        Vue.axios.post(UrlConfig.AUTH_BIND_WORD_PATH)
          .then((response) => {
            this.captchaAuthToken = response.data.auth_token;
            this.$store.commit('SET_AUTH_INFO', response.data);
            if (response.data.auth_next_step === '') {
              this.installWordAuthenDialogVisible = true;
            }
            if (response.data.auth_next_step === FlowControlConst.CAPTCHA) {
              this.authCaptchaDialogVisible = true;
            }
          })
          .catch((error) => {
            this.$message({
              showClose: true,
              message: error.respMessage,
              type: 'error',
            });
          });
      },

      // 身份验证完成
      authCaptchaFinishEvent() {
        if (SecurityOptConst.MODIFY_LOGIN_PWD === this.securityOptValue) {
          this.authCaptchaDialogVisible = false;
          this.loginPasswordDialogVisible = true;
        }

        if (SecurityOptConst.MODIFY_TRADE_PWD === this.securityOptValue) {
          this.authCaptchaDialogVisible = false;
          this.setTradePwdDialogVisible = true;
        }

        if (SecurityOptConst.BIND_MOBILE === this.securityOptValue) {
          this.authCaptchaDialogVisible = false;
          this.bindPhoneNoDialogVisible = true;
        }

        if (SecurityOptConst.IDENTITY_WORD === this.securityOptValue) {
          this.authCaptchaDialogVisible = false;
          this.installWordAuthenDialogVisible = true;
          const params = {
            auth_token: this.authInfo.auth_token,
          };
          Vue.axios.post(UrlConfig.BIND_WORD_AUTH_FINISH_PATH, params)
            .then((response) => {
              console.log(response);
            })
            .catch((error) => {
              console.log(error);
            });
        }
      },

      closeAuthCaptchaComp() {
        this.servAuthWordVisibleBtn = true;
        this.$refs["authCaptchaComp"].resetComp();
      },
      closeRetrievePwdResetComp() {
        this.$refs["retrievePwdResetComp"].resetComp();
        console.log('close');
      },
      closeSetTradePwdComp() {
        this.$refs["setTradePwdComp"].resetComp();
        console.log('close');
      },
      // 完成设置支付密码
      setTradePwdFinishEvent() {
        this.setTradePwdDialogVisible = false;
        this.$refs["setTradePwdComp"].resetComp();
      },

      confirm(val) {
        this.confirmBtnLoading = true;
        this.retrievePwdReset({
          auth_token: this.authInfo.auth_token,
          password: val.newPwd,
        })
        .then((response) => {
          this.confirmBtnLoading = false;
          this.$message({
            showClose: true,
            message: '设置成功！',
            type: 'success',
          });
          this.$store.dispatch(ActionTypeName.LOAD_SECURITY_LIST);
        })
        .catch((error) => {
          this.confirmBtnLoading = false;
          this.$message({
            showClose: true,
            message: error.respMessage,
            type: 'error',
          });
        });
      },
      modify(value) {
        this.modifyLoginPwd({
          auth_token: this.authInfo.auth_token,
          old_password: value.oldPwd,
          password: value.newPwd,
        })
        .then((response) => {
          this.confirmBtnLoading = false;
          this.$message({
            showClose: true,
            message: '修改成功!',
            type: 'success',
          });
          this.loginPasswordDialogVisible = false;
          this.$store.dispatch(ActionTypeName.LOAD_SECURITY_LIST);
        })
        .catch((error) => {
          this.confirmBtnLoading = false;
          this.$message({
            showClose: true,
            message: error.respMessage,
            type: 'error',
          });
        });
      },
      bind(value) {
        this.bindPhoneNo({
            auth_token: this.authInfo.auth_token,
            service_captcha: value.service_captcha,
            phone_no: value.phone_no,
          })
          .then((response) => {
            this.confirmBtnLoading = false;
            this.$message({
              showClose: true,
              message: '手机绑定成功!',
              type: 'success',

            });
            this.bindPhoneNoDialogVisible = false;
            this.$store.dispatch(ActionTypeName.LOAD_USER_SUMMARY);
            this.$store.dispatch(ActionTypeName.LOAD_SECURITY_LIST);
          })
          .catch((error) => {
            this.confirmBtnLoading = false;
            this.$message({
              showClose: true,
              message: error.respMessage,
              type: 'error',
            });
          });
      },
      step1Back() {
        this.installWordAuthenDialogVisible = true;
        this.bindWordAuthenStep1DialogVisible = false;
      },
      installNextStepHandle() {
        this.installWordAuthenDialogVisible = false;
        this.bindWordAuthenStep1DialogVisible = true;
      },
      step2Back() {
        this.bindWordAuthenStep1DialogVisible = true;
        this.bindWordAuthenStep2DialogVisible = false;
      },
      bindGoogleAuthNextStepHandle() {
        this.bindWordAuthenStep1DialogVisible = false;
        this.bindWordAuthenStep2DialogVisible = true;
      },
      saveWordToken(data) {
        this.captchaWordToken = data.word_token;
      },
      googleAuthenBindSuccHandle() {
        this.servAuthWordVisibleBtn = true;
        this.bindWordAuthenStep2DialogVisible = false;
        this.$message({
          type: 'success',
          message: '动态口令码绑定成功',
        });
        this.$store.dispatch(ActionTypeName.LOAD_SECURITY_LIST);
      },
    },
  };
</script>

<style>
  .security-center-header-title {
    margin-bottom: 20px;
  }
  .security-center-container {
    padding-bottom: 100px;
    /*height: 100%;*/
    overflow-y: auto;
    background-color: #fff;
    border-radius: 4px;
  }

  .el-dialog {
    width: 400px;
    /*height: 380px;*/
  }

  el-card el-dialog:nth-last-child(2) {
    width: 420px;
    background-color: #67c23a;
  }

  .el-dialog__body {
    padding: 15px 40px 40px 40px;
  }
  .twoFactorStatus .el-dialog {
    width: 100%;
    height: 100%;
    margin-top: 0!important;
    background-color: rgba(0,0,0,.7);
    margin-bottom: 0;
  }
  .guide {
    color: #fff;
    max-width: 350px;
    margin: 100px 20% 20px auto;
  }
  .guideImg {
    margin: 0 15% 0 auto;
    display: block;
    width: 140px;
    height: 140px;
  }
</style>
