
<template>
  <img :src="imgCaptChaSrc" class="captChaImg" alt="看不清换一种" @click="imgCaptchaClicked"/>
</template>

<script>
  import Vue from 'vue';

  export default {
    name: 'img-captcha',
    props: {
      action: {
        type: String,
      },
    },
    data() {
      return {
        imgCaptChaSrc: '',
      };
    },
    created() {
      this.changeImgCaptcha();
    },
    beforeRouteLeave() {
      this.changeImgCaptcha;
    },
    methods: {
      changeImgCaptcha() {
        Vue.axios.post(this.action)
          .then((response) => {
            if (!response.data.img_url) {
              this.imgCaptChaSrc = '';
            } else {
              this.imgCaptChaSrc = response.data.img_url.indexOf('http') === 0 ? response.data.img_url : window.appConfig.apiUrlPrefix + response.data.img_url;
            }
            this.$emit('imgCaptchaFinishEmit', response.data.img_captcha_token);
          })
          .catch((error) => {
            this.imgCaptchaErr = error.respMessage;
            this.$emit('imgCaptchaFailEmit', error.respMessage);
          });
      },

      imgCaptchaClicked() {
        this.changeImgCaptcha();
      },
    },
  };
</script>

<style scoped>

  .captChaImg {
    width: 90px;
    height: 34px;
    font-size: 12px;
  }

</style>
