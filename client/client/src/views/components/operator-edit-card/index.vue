
<template>
  <el-card id="operator-edit-card" class="operator-edit-card">
    <el-row>
      <el-col :span="12" :offset="6">
        <el-form ref="operatorEditFormModel" :model="formModel" :rules="rules" label-width="100px" onsubmit="return false;">
          <el-form-item label="指定角色" prop="role_id" class="role">
            <el-select v-model="formModel.role_id" placeholder="请选择" :clearable="true">
              <el-option
                v-for="item in roles"
                :key="item.displayName"
                :label="item.displayName"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="真实姓名" prop="name">
            <el-input v-model="formModel.name"></el-input>
          </el-form-item>
          <el-form-item label="邮箱账号" prop="email">
            <el-input v-model="formModel.email" placeholder="用作账号的邮箱…"></el-input>
          </el-form-item>
          <el-form-item label="账号状态">
            <el-tooltip :content="switchContent" placement="top">
              <el-switch v-model="formModel.status"
                         active-value="normal" inactive-value="disabled"
                         active-color="#13ce66" inactive-color="#ddd">
              </el-switch>
            </el-tooltip>
          </el-form-item>
          <el-form-item>
            <el-button size="large" class="confirm_btn" type="primary"
                       style="width: 100px;"
                       @click="confirmBtnClicked">确 定</el-button>
            <el-button size="large" class="confirm_btn"
                       style="width: 100px;"
                       @click="cancel">取 消</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </el-card>
</template>

<script>
  import Vue from 'vue';
  import UrlConfig from '@/utils/UrlConfig';

  export default {
    name: 'operator-edit-card',
    props: {
      roles: {
        type: Array,
        required: true,
      },
    },
    data() {
      const validateRealName = (rule, value, callback) => {
        if (value.length > 14 || value.length < 2) {
          callback(new Error('请输入正确的姓名'));
          return;
        }
        callback();
      };
      const validateEmail = (rule, value, callback) => {
        if (!/^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/.test(value)) {
          callback(new Error('请输入正确的邮箱账号'));
          return;
        }
        callback();
      };
      const validateRole = (rule, value, callback) => {
        if (!value) {
          callback(new Error('请选择角色'));
          return;
        }
        callback();
      };
      return {
        formModel: {
          role_id: '',
          name: '',
          email: '',
          status: 'normal',
        },
        rules: {
          role_id: [
            { validator: validateRole, trigger: 'blur' },
          ],
          name: [
            { required: true, message: '请输入真实姓名', trigger: 'blur' },
            { validator: validateRealName, trigger: 'blur' },
          ],
          email: [
            { required: true, message: '请输入邮箱账号', trigger: 'blur' },
            { validator: validateEmail, trigger: 'blur' },
          ],
        },
      };
    },
    computed: {
      loginName() {
        return this.$store.state.user.userInfo.defaultEmail;
      },
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
          if (item.code === this.formModel.status) {
            return item;
          }
        }).name;
      },
    },
    created() {
      if (this.$route.query && this.$route.query.email) {
        this.formModel.role_id = this.$route.query.displayName;
        this.formModel.name = this.$route.query.name;
        this.formModel.email = this.$route.query.email;
        this.formModel.status = this.$route.query.status;
        this.formModel.operator_id = this.$route.query.operator_id;
        this.formModel.loginname = this.loginName;
      }
    },
    methods: {
      confirmBtnClicked() {
        this.$refs['operatorEditFormModel'].validate((result) => {
          if (result) {
            if (this.$route.query && this.$route.query.email) {
              const role_id =  this.roles.find((item) => {
                if (item.displayName === this.formModel.role_id) {
                  return item;
                }
              });
              this.formModel.role_id = role_id ? role_id.id : this.formModel.role_id;
            }
            this.formModel.operator_id = this.$route.query.operator_id;
            this.formModel.loginname = this.loginName;
            this.$emit('confirmBtnClickEmit', this.formModel);
          }
        });
      },
      cancel() {
        this.$router.push('/home/operator-manager');
      },
    },
  };
</script>

<style>

  .operator-edit-card {
    width: 100%;
    height: auto;
    margin: 0 auto;
    background-color: white;
  }
  .operator-edit-card .el-form-item {
    margin-bottom: 20px;
  }
  .operator-edit-card .el-select {
    width: 100%;
  }
  .role .el-form-item__label:before {
    content: '*';
    color: #fa5555;
    margin-right: 4px;
  }
  .operator-edit-card .el-card__body {
    padding-top: 70px;
  }
</style>
