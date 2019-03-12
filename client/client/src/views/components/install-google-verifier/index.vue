<template>
  <div id="install-google-verifier" class="install-google-verifier">
    <div class="dialog-div-title">
      <span class="dialog-span-title">安装口令码APP</span>
    </div>
    <div class="textTip">
      <span id="tip1"  class="tip1">扫描二维码下载并安装阿里云【身份宝】手机应用</span>
      <span id="tip2"  class="tip2">若无法扫码，可通过 http://otp.aliyun.com/m 下载</span>
    </div>
    <div style="text-align: center; margin-top: 20px;">
      <img :src="imgCaptChaSrc" class="captChaImg" />
    </div>
    <el-button class="nextStepBtn" size="large" type="primary" @click="nextStepBtnClicked">我安装好了，下一步</el-button>
  </div>
</template>

<script>

  export default {
    name: 'install-google-verifier',
    data() {
      return {
        imgCaptChaSrc: '',
      };
    },
    created() {
      this.imgCaptChaSrc = window.location.href.indexOf('localhost') > -1 ?
        window.appConfig.apiUrlPrefix + this.$store.state.meta.pageMeta.ui.word_download_qrcode
        : this.$store.state.meta.pageMeta.ui.word_download_qrcode;
    },
    computed: {
    },
    methods: {
      nextStepBtnClicked() {
        this.$emit('installNextStepBtnClickedEmit');
      },
    },
    components: {

    },
  };
</script>
<style scoped>
  .install-google-verifier {
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
    margin-top: 20px;
    box-sizing: border-box;
  }

  .dialog-div-title {
    position: relative;
  }
  .captChaImg {
    width: 120px;
    height: 120px;
  }
</style>
<style>
  .el-radio__input.is-checked+.el-radio__label {
    font-weight: 700;
  }
</style>
