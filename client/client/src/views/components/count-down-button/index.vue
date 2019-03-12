<template>
  <el-button id="sendCaptcha" :type="buttonType" :disabled="buttonDisabled" size="large" ref="sendCaptchaBtn">{{ time | change }}</el-button>
</template>

<script>
  let flag = false;
  export default {
    name: 'countDown',
    data() {
      return {
        time: '获取验证码',
      };
    },
    props: {
      start: {
        type: Boolean,
      },
      buttonDisabled: {
        type: Boolean,
        default: false,
      },
      countDownDuration: {
        type: Number,
        default: 60,
      },
      buttonType: {
        type: String,
      },
    },
    watch: {
      start(value, oldvalue) {
        if (value === true) {
          this.countDown();
        }

        if (value === false && oldvalue === false) {
          clearInterval(flag);
          this.time = '获取验证码';
        }
      },
    },
    methods: {
      countDown() {
        this.time = this.countDownDuration;
        flag = setInterval(() => {
          this.time--;
          if (this.time === 0) {
            this.$emit('countDown');
            this.time = '重新获取';
            clearInterval(flag);
          }
        }, 1000);
      },
    },
    filters: {
      change(value) {
        if (!value) return "";
        if (!isNaN(value)) {
          return value + 'S';
        } else {
          return value;
        }
      },
    },
    beforeDestroy() {
      clearInterval(flag);
    },
  };
</script>
<style scoped>

</style>
