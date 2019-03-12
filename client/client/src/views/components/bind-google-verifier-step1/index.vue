<template>
  <div id="bind-google-verifier-step1" class="bind-google-verifier-step1">
    <div class="dialog-div-title">
      <span class="dialog-span-title">绑定口令码APP</span>
    </div>
    <div class="textTip">
      <span id="tip1"  class="tip1">请在 身份宝APP 中，点击页面底部的扫描二维码按钮</span>
      <span id="tip2"  class="tip2">若已绑定过，请点击 +加号，选择 扫描二维码 菜单</span>
    </div>
    <div style="text-align: center; margin-top: 10px; height: 162px;">
      <div class="qrcode-expired-div">
        <img :src="qrcodeImg" class="qrcode" :style="opacityStyle"/>
        <div class="qrcode-expired-text" v-if="qrcodeExpired">
          <span>二维码已过期</span>
          <br>
          <span>请刷新</span>
        </div>
      </div>
      <el-button size="medium" type="text" v-if="qrcodeExpired"
                 @click="refreshQrcodeBtnClicked" icon="el-icon-refresh">刷新二维码</el-button>
      <span v-else>请使用 身份宝APP 进行扫码</span>
    </div>
    <el-button class="nextStepBtn" size="large" type="primary" @click="nextStepBtnClicked">我已看到验证码，下一步</el-button>
    <div style="margin-top: 10px;">
      <span class="back" @click="back">返回上一步</span>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue';
  import UrlConfig from '@/utils/UrlConfig';

  let flag = false;
  export default {
    name: 'bind-google-verifier-step1',
    data() {
      return {
        qrcodeImg: '',
        qrcodeExpired: false,
        qrcodeExpiredDuration: 600,
        time: 0,
      };
    },
    created() {
      this.generateQrCode();
    },
    computed: {
      opacityStyle() {
        return this.qrcodeExpired ? 'opacity: 0.2;' : '';
      },
    },
    methods: {
      nextStepBtnClicked() {
        this.$emit('bindGoogleAuthNextStepBtnClickedEmit');
      },
      back() {
        this.$emit('back');
      },
      generateQrCode() {
        this.qrcodeExpired = false;
        Vue.axios.post(UrlConfig.GENERATE_VERIFIER_QRCODE_PATH)
          .then((response) => {
            console.log(response);
            this.qrcodeImg = response.data.qrcode_img;
            this.$emit('wordTokenEmit', response.data);
            this.startCountDown();
          })
          .catch((error) => {
            this.$message({
              showClose: true,
              message: error.respMessage,
              type: 'error',
            });
          });
      },

      refreshQrcodeBtnClicked() {
        this.generateQrCode();
      },

      startCountDown() {
        this.time = this.qrcodeExpiredDuration;
        flag = setInterval(() => {
          this.time--;
          if (this.time === 0) {
            this.qrcodeExpired = true;
            clearInterval(flag);
          }
        }, 1000);
      },
    },
    components: {

    },
    beforeDestroy() {
      clearInterval(flag);
    },
  };
</script>
<style scoped>
  .bind-google-verifier-step1 {
    width: 320px;
    height: 340px;
    margin: 0 auto;
    background-color: white;
  }

  .dialog-span-title {
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

  .nextStepBtn {
    width: 100%;
    height: 42px;
    box-sizing: border-box;
  }

  .dialog-div-title {
    position: relative;
  }

  .qrcode {
    width: 120px;
    height: 120px;
  }
  .back {
    font-size: 14px;
    cursor: pointer;
  }

  .qrcode-expired-div {
    position: relative;
  }

  .qrcode-expired-text {
    width: 120px;
    height: 90px;
    padding-top: 30px;
    background: rgba(255,255,255,0.5);
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%)
  }
</style>
<style>
  .el-radio__input.is-checked+.el-radio__label {
    font-weight: 700;
  }
</style>
