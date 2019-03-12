<template>
  <div id="operator-edit" class="operator-edit">
    <div class="operator-edit-title">
      <page-header-comp :title="title" :titleTip="pageMeta.desc"></page-header-comp>
    </div>
    <operator-edit-card-comp @confirmBtnClickEmit="confirmBtnClickEmitHandle" :roles="roles"></operator-edit-card-comp>
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
  import operatorEditCardComp from '@components/operator-edit-card';
  import authCaptchaComp from '@components/auth-captcha';
  import pageHeaderComp from '@components/page-header';
  import UrlConfig from '@/utils/UrlConfig';
  import FlowControlConst from '@/utils/FlowControlConst';

  export default {
    name: 'operator-edit',
    components: {
      pageHeaderComp,
      operatorEditCardComp,
      authCaptchaComp,
    },
    data() {
      return {
        roles: [],
        authCaptchaDialogVisible: false,
        captchaAuthToken: '',
        operatorCreatField: {},
        title: '',
      };
    },
    created() {
      this.title = this.pageMeta.title;
      if (this.$route.query.role_id) {
        this.title = '编辑操作员';
      }
      this.getRolesEmitHandle();
    },
    computed: {
      ...mapState({
        appMeta: state => state.meta.appMeta,
        userInfo: state => state.user.userInfo,
        pageMeta: state => state.meta.pageMeta,
        authInfo: state => state.user.authInfo,
      }),
      defaultEmail() {
        return this.userInfo.defaultEmail;
      },
    },
    methods: {
      getRolesEmitHandle() {
        Vue.axios.get(UrlConfig.ROLE_LIST_PATH)
          .then((response) => {
            if (response) {
              const roleList = [];
              response.data.forEach((item) => {
                if (item.id !== this.userInfo.roleId) {
                  roleList.push(item);
                }
              });
              this.roles = roleList;
            }
          });
      },
      authCaptchaFinishEvent() {
        this.operatorCreatField.auth_token = this.authInfo.auth_token;
        this.operatorCreat(this.operatorCreatField);
      },
      confirmBtnClickEmitHandle(val) {
        this.operatorCreatField = val;
        const authCaptchaParams = { auth_token: this.authInfo.auth_token };
        Vue.axios.post(UrlConfig.AUTH_OPERATOR_CREAT_PATH, authCaptchaParams)
          .then((response) => {
            this.captchaAuthToken = response.data.auth_token;
            this.$store.commit('SET_AUTH_INFO', response.data);
            if (response.data.auth_next_step === '') {
              this.operatorCreat(val);
            }
            if (response.data.auth_next_step === FlowControlConst.CAPTCHA) {
              this.authCaptchaDialogVisible = true;
            }
          });
      },
      operatorCreat(val) {
        const params = Object.assign({}, val);
        params.auth_token = this.authInfo.auth_token;
        if (this.$route.query && this.$route.query.email) {
          Vue.axios.put(UrlConfig.OPERATOR_LIST_PATH, params)
            .then((response) => {
              if (response) {
                this.$message({
                  showClose: true,
                  message: '操作员修改成功',
                  type: 'success',
                });
                this.$router.push('/home/operator-manager');
              }
            })
            .catch((error) => {
              this.authCaptchaDialogVisible = false;
              this.$message({
                showClose: true,
                message: error.respMessage,
                type: 'error',
              });
            });
          return;
        }
        Vue.axios.post(UrlConfig.OPERATOR_LIST_PATH, params)
          .then((response) => {
            if (response) {
              this.$message({
                showClose: true,
                message: '操作员添加成功',
                type: 'success',
              });
              this.$router.push('/home/operator-manager');
            }
          })
          .catch((error) => {
            this.authCaptchaDialogVisible = false;
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

  .operator-edit-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

</style>
