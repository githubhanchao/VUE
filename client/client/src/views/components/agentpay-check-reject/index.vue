<template>
  <div id="agentpay-check-reject" class="agentpay-check-reject">
    <div class="auth-title">
      <span id="card-title" class="card-title">审核拒绝备注</span>
    </div>
    <el-form class="reject_form" ref="formModel" :model="formModel" :rules="rules" onsubmit="return false;">
      <el-form-item id="captcha-item" class="captcha-item" prop="remark">
        <el-input size="large" v-model="formModel.remark" placeholder="30个字以内" type="textarea"
                  :rows="4" @keydown.enter.native="confirmBtnClicked" :maxlength="30"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button class="confirm_btn" size="large" type="primary" @click="confirmBtnClicked">确 定</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>

  import Vue from 'vue';

  export default {
    name: 'agentpay-check-reject',
    props: {
      action: {
        type: String,
        required: true,
      },
      batchId: {
        type: String,
        required: true,
      },
    },
    data() {
      return {
        formModel: {
          remark: '',
        },
        rules: {
          remark: [
            { required: true, message: '不能为空', trigger: 'blur' },
            { max: 30, message: '最多输入30个字', trigger: 'blur' },
          ],
        },
      };
    },
    created() {

    },
    methods: {
      confirmBtnClicked() {
        this.$refs['formModel'].validate((valid) => {
          if (valid) {
            this.agentpayDetailReject();
          }
        });
      },

      agentpayDetailReject() {
        const condParams = {
          batch_order: this.batchId,
          batch_notes: this.formModel.remark,
        };

        Vue.axios.post(this.action, condParams)
          .then(() => {
            this.$emit('agentpayDetailRejectOnSuccessEmit', this.batchId);
          })
          .catch((error) => {
            this.$emit('agentpayDetailRejectOnFailEmit', error);
          });
      },
    },
  };
</script>
<style scoped>
  .agentpay-check-reject {
    width: 320px;
    height: 220px;
    margin: 0 auto;
    background-color: white;
  }

  .auth-title {
    position: relative;
  }

  .card-title {
    font-size: 20px;
  }

  .reject_form {
    margin-top: 20px;
  }

  .confirm_btn {
    width: 120px;
    height: 42px;
    margin-top: 20px;
    box-sizing: border-box;
  }

</style>
