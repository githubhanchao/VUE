<template>
  <div id="ip-manager" class="ip-manager">
    <div class="ip-manager-title">
      <page-header-comp :title="pageMeta.title" :titleTip="pageMeta.desc"></page-header-comp>
      <el-button size="large" class="edit_role_btn" type="primary"
                 icon="el-icon-my-add"
                 style="width: 112px;"
                 v-permission="'ip-white-list-edit'"
                 @click="addIpListBtnClicked">配置IP</el-button>
    </div>
    <ip-manager-table-comp :action="ipInfoUrl" @showAuthCapychaDialog="showAuthCapychaDialog" :showIpList="showIpList"> <i class="iconfont el-icon-my-ip-peizhi"></i></ip-manager-table-comp>
    <el-dialog :visible.sync="authCaptchaDialogVisible" v-if="authCaptchaDialogVisible" :close-on-click-modal="false">
      <auth-captcha-comp :auth_token="captchaAuthToken"
                         :accountNo="defaultEmail"
                         @authCaptchaFinishEmit="authCaptchaFinishEvent">
      </auth-captcha-comp>
    </el-dialog>
  </div>
</template>

<script>
  import Vue from 'vue';
  import { mapState } from 'vuex';
  import ipManagerTableComp from '@components/ip-white-list';
  import authCaptchaComp from '@components/auth-captcha';
  import pageHeaderComp from '@components/page-header';
  import FlowControlConst from '@/utils/FlowControlConst';
  import UrlConfig from '@/utils/UrlConfig';
  import router from '@/router';

  export default {
    name: 'ip-manager',
    components: {
      pageHeaderComp,
      ipManagerTableComp,
      authCaptchaComp,
    },
    data() {
      return {
        ipInfoUrl: '',
        authCaptchaDialogVisible: false,
        captchaAuthToken: '',
        showIpList: false,
        editIp: false,
      };
    },
    created: function () {
      this.ipInfoUrl = UrlConfig.IP_LIST_PATH;
    },
    computed: {
      ...mapState({
        appMeta: state => state.meta.appMeta,
        pageMeta: state => state.meta.pageMeta,
        userInfo: state => state.user.userInfo,
      }),
      defaultEmail() {
        return this.userInfo.defaultEmail;
      },
    },
    methods: {

      addIpListBtnClicked() {
        this.editIp = true;
        Vue.axios.post(UrlConfig.IP_AUTH_ADD).then((response) => {
          this.captchaAuthToken = response.data.auth_token;
          if (response.data.auth_next_step === FlowControlConst.CAPTCHA) {
            this.authCaptchaDialogVisible = true;
          }
        });
      },
      authCaptchaFinishEvent(token) {
        const params = {
          auth_token: token.auth_token,
        };
        if (this.editIp) {
          this.$router.push({ path: '/home/ip-add', query: { auth_token: token.auth_token } });
          return;
        }
        Vue.axios.post(UrlConfig.IP_LIST_VIEW, params)
          .then((res) => {
            this.authCaptchaDialogVisible = false;
            this.showIpList = true;
          })
          .catch((err) => {
            this.$message({
              showClose: true,
              message: err.respMessage,
              type: 'error',
            });
          });
      },
      showAuthCapychaDialog() {
        Vue.axios.post(UrlConfig.IP_AUTH_LIST)
          .then((res) => {
            this.captchaAuthToken = res.data.auth_token;
            if (res.data.auth_next_step === FlowControlConst.CAPTCHA) {
              this.authCaptchaDialogVisible = true;
            }
          })
          .catch((err) => {
            this.$message({
              showClose: true,
              message: err.respMessage,
              type: 'error',
            });
          });
      },
    },
  };
</script>

<style>

  .ip-manager-title {
    /*margin-bottom: 20px;*/
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

</style>
