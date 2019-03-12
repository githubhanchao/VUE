
<template>
  <el-card id="role-edit-card" class="role-edit-card" v-loading="cardLoading">
    <!--<el-row>-->
      <!--<el-col :span="9" :offset="3">-->
    <div class="role-form">
      <el-form ref="formModel" :model="formModel"
               :rules="rules" label-width="100px" onsubmit="return false;">
        <el-form-item label="角色名称" prop="roleName">
          <el-input v-model="formModel.roleName"></el-input>
        </el-form-item>
        <el-form-item label="描述" prop="desc">
          <el-input v-model="formModel.desc" placeholder="选填..."></el-input>
        </el-form-item>
        <el-form-item label="角色状态">
          <el-tooltip :content="switchContent" placement="top">
            <el-switch v-model="formModel.roleStatus" active-color="#13ce66" inactive-color="#ddd"
                       active-value="normal" inactive-value="disabled">
            </el-switch>
          </el-tooltip>
        </el-form-item>
        <el-form-item label="角色权限">
          <el-tree
            class="role-tree"
            ref="permissionTree"
            :data="permissionData"
            :default-checked-keys="selectedPermission"
            show-checkbox
            node-key="name"
            default-expand-all
            check-strictly
            @check-change="checkChanged"
            :props="defaultProps">
          </el-tree>
        </el-form-item>
        <el-form-item>
          <el-button size="large"  style="width: 100px;" id="submitBtn" type="primary"
                     @click="submitBtnClicked" :loading="btnLoading">提 交</el-button>
          <el-button size="large"  style="width: 100px;" @click="cancel()" >取 消</el-button>
        </el-form-item>
      </el-form>
    </div>
      <!--</el-col>-->
    <!--</el-row>-->
    <el-dialog :visible.sync="authCaptchaDialogVisible" v-if="authCaptchaDialogVisible" :close-on-click-modal="false">
      <auth-captcha-comp class="authCaptchaComp" :auth_token="captchaAuthToken"
                         :accountNo="defaultEmail"
                         @authCaptchaFinishEmit="authCaptchaFinishEvent">
      </auth-captcha-comp>
    </el-dialog>
  </el-card>
</template>

<script>

  import Vue from 'vue';
  import router from '@/router';
  import { mapState } from 'vuex';
  import UrlConfig from '@/utils/UrlConfig';
  import authCaptchaComp from '@components/auth-captcha';
  import FlowControlConst from '@/utils/FlowControlConst';

  export default {
    name: 'role-edit-card',
    components: {
      authCaptchaComp,
    },
    props: {
      roleId: {
        type: Number,
      },
      description: {
        type: String,
      },
      status: {
        type: String,
      },
      displayName: {
        type: String,
      },
      permissionData: {
        type: Array,
        required: true,
      },
    },
    data() {
      const validateRoleName = (rule, value, callback) => {
        if (!value) {
          callback(new Error('角色名称不能为空'));
          return;
        }

        callback();
      };

      return {
        cardLoading: false,
        selectedPermission: [],
        roleUrl: '',
        rolePermissionUrl: '',
        authModifyRoleUrl: '',
        authCaptchaDialogVisible: false,
        captchaAuthToken: '',
        btnLoading: false,

        formModel: {
          roleName: '',
          desc: '',
          roleStatus: '',
          rolePermissions: [],
        },
        rules: {
          roleName: [
            { required: true, message: '角色名称不能为空', trigger: 'blur' },
            { min: 2, max: 16, message: '长度在 2 到 16 个字符', trigger: 'blur' },
            { validator: validateRoleName, trigger: 'blur' },
          ],
          desc: [
            { min: 4, max: 40, message: '长度在 4 到 40 个字符', trigger: 'blur' },
          ],
        },
        defaultProps: {
          children: 'children',
          label: 'displayName',
        },
      };
    },
    created: function () {
      this.roleUrl = UrlConfig.ROLE_LIST_PATH;
      this.rolePermissionUrl = UrlConfig.ROLE_PERMISSION_LIST_PATH;
      this.authModifyRoleUrl = UrlConfig.AUTH_EDIT_ROLE_PATH;

      this.formModel.roleName = this.displayName;
      this.formModel.desc = this.description;
      this.formModel.roleStatus = this.status;
      if (this.roleId) {
        this.selectedPermission = [];
        this.loadRolePermissions(this.roleId);
      } else {
        this.selectedPermission = this.defaultRolePerms;
      }
    },
    computed: {
      ...mapState({
        appMeta: state => state.meta.appMeta,
        userInfo: state => state.user.userInfo,
        authInfo: state => state.user.authInfo,
      }),

      switchContent() {
        const content = [
          {
            name: '启用',
            code: 'normal',
          },
          {
            name: '禁用',
            code: 'disabled',
          },
        ];
        return content.find((item) => {
          if (item.code === this.formModel.roleStatus) {
            return item;
          }
        }).name;
      },

      defaultRolePerms() {
        return this.appMeta.ui.defaultRolePerms;
      },

      permSpecialRule() {
        return this.appMeta.ui.permSpecialRule;
      },

      defaultEmail() {
        return this.userInfo.defaultEmail;
      },
    },
    methods: {
      submitBtnClicked() {
        this.$refs['formModel'].validate((valid) => {
          if (valid) {
            if (this.roleId) {
              this.authModifyRole();
            } else {
              this.addRole();
            }
          }
        });
      },
      cancel() {
        this.$router.push('/home/role-manager');
      },
      loadRolePermissions(val) {

        const condParams = {
          role_id: val,
        };

        Vue.axios.get(this.rolePermissionUrl, { params: condParams })
          .then((response) => {
            this.selectedPermission = response.data;
            if (this.permissionData) {
//              this.clearParentName(this.permissionData, this.selectedPermission);
            }
//            debugger;
            this.$refs["permissionTree"].setCheckedKeys(this.selectedPermission);
          })
          .catch((error) => {
            this.$message({
              showClose: true,
              message: error.respMessage,
              type: 'error',
            });
          });
      },

      addRole() {
        const roleInfo = {
          name: this.formModel.roleName,
          description: this.formModel.desc,
          status: this.formModel.roleStatus,
          permissions: this.$refs["permissionTree"].getCheckedKeys(),
        };

        this.cardLoading = true;
        Vue.axios.post(this.roleUrl, roleInfo)
          .then((response) => {
            this.cardLoading = false;
            console.log(response);
            router.push('/home/role-manager');
          })
          .catch((error) => {
            this.cardLoading = false;
            this.$message({
              showClose: true,
              message: error.respMessage,
              type: 'error',
            });
          });
      },

      authModifyRole() {
        this.btnLoading = true;
        Vue.axios.post(this.authModifyRoleUrl)
          .then((response) => {
            this.btnLoading = false;
            this.$store.commit('SET_AUTH_INFO', response.data);
            this.captchaAuthToken = response.data.auth_token;
            const authNextStep = response.data.auth_next_step;

            if (authNextStep === '') {
              this.modifyRole();
            }

            if (authNextStep === FlowControlConst.CAPTCHA) {
              this.authCaptchaDialogVisible = true;
            }
          })
          .catch((error) => {
            this.btnLoading = false;
            this.$message({
              showClose: true,
              message: error.respMessage,
              type: 'error',
            });
          });
      },

      modifyRole() {
        const roleInfo = {
          role_id: this.roleId,
          name: this.formModel.roleName,
          description: this.formModel.desc,
          status: this.formModel.roleStatus,
          permissions: this.$refs["permissionTree"].getCheckedKeys(),
          auth_token: this.authInfo.auth_token,
        };

        this.cardLoading = true;
        Vue.axios.put(this.roleUrl, roleInfo)
          .then((response) => {
            this.cardLoading = false;
            console.log(response);
            router.push('/home/role-manager');
          })
          .catch((error) => {
            this.cardLoading = false;
            this.$message({
              showClose: true,
              message: error.respMessage,
              type: 'error',
            });
          });
      },

      clearParentName(treeData, permissions) {
        let count = 0;
        let nodeCount = treeData.length;
        for (let i = 0; i < nodeCount; i++) {
          const item = treeData[i];
          if (permissions.indexOf(item.name) >= 0) {
            count++;
          }

          if (i === nodeCount - 1 && count < nodeCount) {
            const index = permissions.indexOf(item.parent);
            if (index >= 0) {
              permissions.splice(index, 1);
            }
          }

          if (item.children && item.children.length > 0) {
            this.clearParentName(item.children, permissions);
          }
        }
      },

      // 节点审核变化
      checkChanged(data, checked, indeterminate) {
//        debugger;
        if (this.permSpecialRule.indexOf(data.name) !== -1) {
          // 特殊处理的导出功能权限
          if (checked) {
            if (this.selectedPermission.indexOf(data.name) === -1) {
              this.selectedPermission.push(data.name);
            }

            if (this.selectedPermission.indexOf(data.parent) === -1) {
              this.selectedPermission.push(data.parent);
            }
          } else {
            if (this.selectedPermission.indexOf(data.name) !== -1) {
              const index = this.selectedPermission.indexOf(data.name);
              this.selectedPermission.splice(index, 1);
            }
          }

          this.$refs["permissionTree"].setCheckedKeys(this.selectedPermission);
        } else {
//          debugger;
          if (checked) {
            if (this.selectedPermission.indexOf(data.name) === -1) {
              this.selectedPermission.push(data.name);
            }

            if (this.selectedPermission.indexOf(data.parent) === -1) {
              this.selectedPermission.push(data.parent);
            }
            this.$refs["permissionTree"].setCheckedKeys(this.selectedPermission);
          } else {
            const index = this.selectedPermission.indexOf(data.name);
            this.selectedPermission.splice(index, 1);

            // 如果子权限是需要特殊处理的
            const perms = data.children.filter((item) => {
              return this.permSpecialRule.indexOf(item.name) !== -1;
            });

            perms.forEach((item) => {
              const itemIndex = this.selectedPermission.indexOf(item.name);
              if (itemIndex !== -1) {
                this.selectedPermission.splice(itemIndex, 1);
              }
            });

            this.$refs["permissionTree"].setCheckedKeys(this.selectedPermission);
          }
        }
      },

      authCaptchaFinishEvent() {
        this.authCaptchaDialogVisible = false;
        this.modifyRole();
      },
    },
  };
</script>

<style>

  .role-edit-card {
    width: 100%;
    height: auto;
    margin: 0 auto;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .role-edit-card .el-form-item {
    margin-bottom: 20px;
  }
  .role-edit-card .el-tree {
    border: 1px solid #d8dce5;
    padding: 20px;
    border-radius: 4px;
  }
  .role-edit-card .el-card__body {
    padding-top: 70px;
  }
  .role-tree {
    min-width: 220px;
  }
  .role-form {
    max-width: 360px;
  }
</style>
