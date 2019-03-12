<template>
  <div>
    <el-card class="assist-captcha">
      <div class="assist-title">
        <span class="card-title">协助验证</span>
      </div>
      <div class="textTip">
        <span class="tip1">使用邮箱方式验证，需其他操作员协助您完成。</span>
        <span class="tip2">请输入以下订单号对应的交易金额。</span>
      </div>
      <el-form class="form" ref="assistRuleForm" :model="ruleFormModel" :rules="rules" onsubmit="return false;">
        <el-form-item style="margin-bottom: 0px; position: relative">
          <el-tooltip placement="top-start">
            <div slot="content" style="width: 320px;">
              <span>邀请其他操作员在交易管理 > 交易查询中搜索该订单，查看对应的金额</span>
            </div>
            <i class="el-icon-question" style="color: #777;">商户订单号：{{ batchOrder }}</i>
          </el-tooltip>
        </el-form-item>
        <el-form-item prop="tradeMoney" style="margin-bottom: 40px;">
          <el-input class="captCha" size="large" v-model.number="ruleFormModel.tradeMoney" placeholder="交易金额..."
                    @keydown.enter.native="authCaptchaBtnClicked"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button class="continueBtn" size="large" :disabled="nextBtnLoading"
                     type="primary" @click="authCaptchaBtnClicked" :loading="nextBtnLoading">{{ nextBtnLoading ? '验证中...':'继 续' }}</el-button>
        </el-form-item>
      </el-form>
      <div>
        <span style="font-size: 13px; color: #666;">Tips：若无商户订单号或操作员协助，请联系管理员</span>
      </div>
    </el-card>
  </div>
</template>
<script>
  import Vue from 'vue';
  import UrlConfig from '@/utils/UrlConfig';
  
  export default {
    data() {
      return {
        ruleFormModel: {
          tradeMoney: '',
        },
        batchOrder: '',
        nextBtnLoading: false,
        answerToken: '',
        rules: {
          tradeMoney: [
            { required: true, message: '交易金额不能为空' },
            { type: 'number', message: '交易金额必须为数字值' },
          ],
        },
      };
    },
    created() {
      this.getBatchOrder();
    },
    methods: {
      getBatchOrder() {
        Vue.axios.get(UrlConfig.GET_BATCH_ORDER_PATH,
          { params: {
            customerNo: this.$route.query.customerNo } })
          .then((response) => {
            this.answerToken = response.data.answerToken;
            this.batchOrder = response.data.question;
          })
          .catch((error) => {
            console.log(error);
          });
      },
      assistCheck(val) {
        this.nextBtnLoading = true;
        Vue.axios.post(UrlConfig.RETRIEVE_PWD_ASSIT_CHECK_PATH,
          {
            answer_token: this.answerToken,
            answer: val,
            auth_token: this.$route.query.auth_token,
          })
          .then((response) => {
            if (response) {
              this.$emit('authAssitSuccess', response);
            }
          })
          .catch((error) => {
            this.nextBtnLoading = false;
            this.$message({
              showClose: true,
              message: error.respMessage,
              type: 'error',
              duration: 2000,
            });
          });
      },
      authCaptchaBtnClicked() {
        this.$refs['assistRuleForm'].validate((valid) => {
          if (valid) {
            this.assistCheck(this.ruleFormModel.tradeMoney);
          }
        });
      },
    },
    computed: {
      authInfo() {
        return this.$store.state.authInfo;
      },
    },
  };
</script>
<style scoped>
  .assist-captcha {
    width: 400px;
    height: 380px;
    margin: 0 auto;
    background-color: white;
  }
  .card-title {
    font-size: 20px;
  }
  .textTip {
    text-align: left;
  }
  .tip1 {
    font-size: 14px;
    /*margin-left: 10px;*/
    margin-top: 20px;
    display: block;
    color: #666666;
  }
  .tip2 {
    font-size: 14px;
    /*margin-left: 10px;*/
    /*margin-top: 10px;*/
    display: block;
    color: #666666;
  }
  .captCha {
    box-sizing: border-box;
    width: 100%;
  }
  .continueBtn {
    width: 100%;
    height: 42px;
    margin-top: 20px;
    box-sizing: border-box;
  }
  .el-button--large {
    padding: 12px 11px;
  }
  .form {
    margin: 20px auto;
  }
  .assist-title {
    position: relative;
  }
</style>
