<template>
  <div id="operator-manager" class="operator-manager">
    <div class="operator-manager-title">
      <page-header-comp :title="pageMeta.title" :titleTip="pageMeta.desc"></page-header-comp>
      <el-button size="large" class="edit_operator_btn" type="primary" icon="el-icon-my-add"
                 v-permission="'operator-info-create'"
                 style="width: 112px;"
                 @click="editOperator">添加操作员</el-button>
    </div>
    <operator-manager-table-comp :loading="loading" :roles="roles"
                                 @deleteEmit="deleteEmitHandle"
                                 @changeEmit="changeEmitHandle"
                                 :tableData="tableData" @changeTableEmit="changeTableEmitHandle"></operator-manager-table-comp>
    <el-dialog :visible.sync="authCaptchaDialogVisible" :close-on-click-modal="false" v-if="authCaptchaDialogVisible">
      <auth-captcha-comp class="authCaptchaComp" :auth_token="captchaAuthToken" ref="authCaptchaComp"
                         :verifyModeProp="verifyModeProp"
                         :accountNo="defaultEmail" @authCaptchaFinishEmit="authCaptchaFinishEvent">
      </auth-captcha-comp>
    </el-dialog>
  </div>
</template>

<script>
  import Vue from 'vue';
  import { mapState } from 'vuex';
  import authCaptchaComp from '@components/auth-captcha';
  import operatorManagerTableComp from '@components/operator-manager-table';
  import pageHeaderComp from '@components/page-header';
  import UrlConfig from '@/utils/UrlConfig';
  import router from "@/router/index";
  import SecurityOptConst from '@/utils/SecurityOptConst';
  import FlowControlConst from '@/utils/FlowControlConst';

  export default {
    name: 'operator-manager',
    components: {
      authCaptchaComp,
      pageHeaderComp,
      operatorManagerTableComp,
    },
    data() {
      return {
        loading: false,
        tableData: [],
        roles: [],
        authCaptchaDialogVisible: false,
        captchaAuthToken: '',
        deleteParams: '',
      };
    },
    created: function () {
      this.verifyModeProp = this.servAuthSmsVisibleBtn;
      this.search();
      Vue.axios.post(UrlConfig.OFFLINE_RECHARGE_CREATE)
        .then((response) => {
          if (response) {
            this.roles = response.data;
          }
        })
        .catch((error) => {
          console.log(error.respMessage);
        });
    },
    computed: {
      ...mapState({
        appMeta: state => state.meta.appMeta,
        pageMeta: state => state.meta.pageMeta,
        authInfo: state => state.user.authInfo,
        userInfo: state => state.user.userInfo,
      }),
      defaultEmail() {
        return this.userInfo.defaultEmail;
      },
      securityList() {
        return this.$store.state.user.securityList;
      },
      servAuthSmsVisibleBtn() {
        return this.securityList.find(function(item) {
          if (item.name === SecurityOptConst.BIND_MOBILE) {
            return item;
          }
        }).status;
      },
    },
    methods: {
      editOperator() {
        router.push('/home/operator-add');
      },
      changeTableEmitHandle(val) {
        this.search(val);
      },
      changeEmitHandle(val) {
        const params = {
          role_id: val,
        };
        this.search(params);
      },
      deleteEmitHandle(val) {
        this.deleteParams = {
          id: val.defaultEmail,
          operator_id: val.id,
          email: val.defaultEmail,
        };
        const authCaptchaParams = { auth_token: this.authInfo.auth_token };
        Vue.axios.post(UrlConfig.AUTH_OPERATOR_DELETE_PATH, authCaptchaParams)
          .then((response) => {
            this.captchaAuthToken = response.data.auth_token;
            this.$store.commit('SET_AUTH_INFO', response.data);
            if (response.data.auth_next_step === '') {
              this.deleteOperator();
            }
            if (response.data.auth_next_step === FlowControlConst.CAPTCHA) {
              this.authCaptchaDialogVisible = true;
            }
          });
      },
      search(val) {
        this.loading = true;
        Vue.axios.get(UrlConfig.OPERATOR_LIST_PATH, { params: val })
          .then((response) => {
            if (response) {
              this.loading = false;
              this.tableData = response.data;
              this.transferCount = response.data.count;
            }
          })
          .catch((error) => {
            this.loading = false;
          });
      },
      authCaptchaFinishEvent() {
        this.deleteParams.auth_token = this.authInfo.auth_token;
        this.deleteOperator();
        this.authCaptchaDialogVisible = false;
      },
      deleteOperator() {
        const params = Object.assign({}, this.deleteParams);
        params.auth_token = this.authInfo.auth_token;
        Vue.axios.delete(UrlConfig.OPERATOR_LIST_PATH, { data: params })
          .then((response) => {
            if (response) {
              this.$message({
                type: 'success',
                message: '删除成功!',
              });
              this.search();
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
    },
  };
</script>

<style>

  .operator-manager-title {
    /*margin-bottom: 20px;*/
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

</style>
