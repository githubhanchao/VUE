<template>
  <div id="secret-manager" class="secret-manager">
    <div class="secret-manager-title">
      <page-header-comp :title="pageMeta.title" :titleTip="pageMeta.desc"></page-header-comp>
      <div>
        <el-button size="large" class="edit_role_btn"
                   @click="verifySecretBtnClicked">验证密钥</el-button>
        <el-button size="large" class="edit_role_btn" type="primary"
                   icon="el-icon-my-add"
                   style="width: 112px;"
                   @click="addSecretBtnClicked">添加密钥</el-button>
      </div>
    </div>
    <secret-manager-table-comp :tableData="secretList"
                               :loading="tableLoading"
                               @viewSecretEmit="viewSecretHandle"
                               @editSecretEmit="editSecretHandle"
                               @deleteSecretEmit="deleteSecretHandle"></secret-manager-table-comp>
    <el-dialog :visible.sync="verifySecretDialogVisible" v-if="verifySecretDialogVisible" class="secret-dialog">
      <verify-secret-comp></verify-secret-comp>
    </el-dialog>
    <el-dialog :visible.sync="editSecretDialogVisible" v-if="editSecretDialogVisible" class="secret-dialog">
      <edit-secret-comp :mode="editSecretCompMode" :secretData="secretInfo"
                        @confirmEmit="confirmHandle" :btnLoading="editBtnLoading"></edit-secret-comp>
    </el-dialog>
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
  import secretManagerTableComp from '@components/secret-manager-table';
  import verifySecretComp from '@components/verify-secret';
  import editSecretComp from '@components/edit-secret';
  import authCaptchaComp from '@components/auth-captcha';
  import pageHeaderComp from '@components/page-header';
  import UrlConfig from '@/utils/UrlConfig';
  import FlowControlConst from '@/utils/FlowControlConst';
  import SessionNameConst from '@/utils/SessionNameConst';
  import router from '@/router';

  export default {
    name: 'secret-manager',
    components: {
      pageHeaderComp,
      secretManagerTableComp,
      verifySecretComp,
      editSecretComp,
      authCaptchaComp,
    },
    data() {
      return {
        verifySecretDialogVisible: false,
        editSecretDialogVisible: false,
        authCaptchaDialogVisible: false,
        editSecretCompMode: 1,
        captchaAuthToken: '',
        secretKeyId: 0,
        secretInfo: {},
        newSecretInfo: {},
        secretList: [],
        tableLoading: false,
        updateSecretInfo: {},
        editBtnLoading: false,
      };
    },
    created: function () {
      this.querySecretList();
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
      // 查询密钥列表
      querySecretList() {
        this.tableLoading = true;
        Vue.axios.get(UrlConfig.SECRET_LIST_PATH)
          .then((response) => {
            this.tableLoading = false;
            this.secretList = response.data;
          })
          .catch((error) => {
            this.tableLoading = false;
            this.secretList = [];
            this.$message({
              showClose: true,
              message: error.respMessage,
              type: 'error',
            });
          });
//        console.log(`1111111: ${this.secretList}`);
      },


      verifySecretBtnClicked() {
        this.verifySecretDialogVisible = true;
      },

      addSecretBtnClicked(secretPramas) {
        this.editSecretCompMode = 1;
        this.editSecretDialogVisible = true;
        this.newSecretInfo = secretPramas;
      },

      authSecretCheck() {
        Vue.axios.post(UrlConfig.AUTH_SECRET_CHECK_PATH)
          .then((response) => {
            this.captchaAuthToken = response.data.auth_token;
            this.$store.commit('SET_AUTH_INFO', response.data);

            if (response.data.auth_next_step === '') {
              this.editSecretDialogVisible = true;
            }

            if (response.data.auth_next_step === FlowControlConst.CAPTCHA) {
              this.editSecretDialogVisible = false;
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

      // 密钥新增会话申请
      authSecretCreate() {
        Vue.axios.post(UrlConfig.AUTH_SECRET_CREATE_PATH)
          .then((response) => {
            this.captchaAuthToken = response.data.auth_token;
            this.$store.commit('SET_AUTH_INFO', response.data);

            if (response.data.auth_next_step === '') {
              this.secretCreate();
            }

            if (response.data.auth_next_step === FlowControlConst.CAPTCHA) {
              this.editSecretDialogVisible = false;
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

      secretCreate() {
        this.editBtnLoading = true;
        this.newSecretInfo.auth_token = this.authInfo.auth_token;
        Vue.axios.post(UrlConfig.SECRET_CREATE_PATH, this.newSecretInfo)
          .then((response) => {
            this.querySecretList();
            this.$message({
              type: 'success',
              message: '新增成功!',
            });
            this.editBtnLoading = false;
            this.editSecretDialogVisible = false;
          })
          .catch((error) => {
            this.editBtnLoading = false;
            this.$message({
              showClose: true,
              message: error.respMessage,
              type: 'error',
            });
          });
      },

      viewSecretHandle(value) {
        this.editSecretCompMode = 3;
        this.secretInfo = value;
        this.authSecretCheck();
      },

      editSecretHandle(value) {
        this.editSecretCompMode = 2;
        this.editSecretDialogVisible = true;
        this.secretInfo = value;
      },

      // 密钥新增会话申请
      authSecretUpdate() {
        Vue.axios.post(UrlConfig.AUTH_SECRET_UPDATE_PATH)
          .then((response) => {
            this.captchaAuthToken = response.data.auth_token;
            this.$store.commit('SET_AUTH_INFO', response.data);

            if (response.data.auth_next_step === '') {
              this.secretUpdate();
            }

            if (response.data.auth_next_step === FlowControlConst.CAPTCHA) {
              this.editSecretDialogVisible = false;
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

      secretUpdate() {
        this.editBtnLoading = true;
        this.updateSecretInfo.auth_token = this.authInfo.auth_token;
        Vue.axios.put(UrlConfig.SECRET_UPDATE_PATH, {
          auth_token: this.authInfo.auth_token,
          key_id: this.updateSecretInfo.id,
          effective_startdate: this.updateSecretInfo.effective_startdate,
          effective_enddate: this.updateSecretInfo.effective_enddate,
        })
        .then((response) => {
          this.querySecretList();
          this.$message({
            type: 'success',
            message: '修改成功!',
          });
          this.editBtnLoading = false;
          this.editSecretDialogVisible = false;
        })
        .catch((error) => {
          this.editBtnLoading = false;
          this.$message({
            showClose: true,
            message: error.respMessage,
            type: 'error',
          });
        });
      },

      deleteSecretHandle(keyId) {
        this.secretKeyId = keyId;
        this.$confirm('确定要删除该密钥吗?', '删除确认', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
        }).then(() => {
          this.authSecretDelete();
        }).catch(() => {
        });
      },

      // 密钥删除会话申请
      authSecretDelete() {
        Vue.axios.post(UrlConfig.AUTH_SECRET_DELETE_PATH)
          .then((response) => {
            this.captchaAuthToken = response.data.auth_token;
            this.$store.commit('SET_AUTH_INFO', response.data);

            if (response.data.auth_next_step === '') {
              this.secretDelete();
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

      // 密钥删除
      secretDelete() {
        Vue.axios.delete(UrlConfig.SECRET_DELETE_PATH, {
          data: {
            auth_token: this.authInfo.auth_token,
            key_id: this.secretKeyId,
          },
        })
        .then((response) => {
          this.querySecretList();
          this.$message({
            type: 'success',
            message: '删除成功!',
          });
        })
        .catch((error) => {
          this.$message({
            showClose: true,
            message: error.respMessage,
            type: 'error',
          });
        });
      },

      authCaptchaFinishEvent(response) {
        this.authCaptchaDialogVisible = false;

        if (response.session_name === SessionNameConst.CHECK_SECURITY_KEY) {
          this.editSecretDialogVisible = true;
        }

        if (response.session_name === SessionNameConst.CREATE_SECURITY_KEY) {
          this.secretCreate();
        }

        if (response.session_name === SessionNameConst.UPDATE_SECURITY_KEY) {
          this.secretUpdate();
        }

        if (response.session_name === SessionNameConst.DELETE_SECURITY_KEY) {
          this.secretDelete();
        }
      },

      // 确定密钥编辑/查看/新增
      confirmHandle(params) {
        // 新增
        if (this.editSecretCompMode === 1) {
          this.newSecretInfo = params;
          this.authSecretCreate();
        }

        // 修改
        if (this.editSecretCompMode === 2) {
          this.updateSecretInfo = params;
          this.authSecretUpdate();
        }

        // 查看
        if (this.editSecretCompMode === 3) {
          this.editSecretDialogVisible = false;
        }

      },

    },
  };
</script>

<style>

  .secret-manager-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  div .secret-dialog .el-dialog{
    width: 550px;
  }

</style>
