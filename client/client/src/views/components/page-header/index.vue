<template>
  <div class="page-header-title">
    <div>
      <h2 class="title">{{ title }}</h2>
      <div class="description">
        <el-collapse-transition>
          <div class="title-txt-tip" v-if="noticeVisible">
            <span>{{ titleTip }}</span>
          </div>
          <div class="notice-tip" v-else>
            <span class="notice-color">[</span>
            <span class="notice-title">公告消息</span>
            <span class="notice-color">]</span>
            <span class="notice-color">{{ notice }}</span>
            <el-button size="medium" type="text" @click="showNoticeBtnClicked" class="notice-button">查看</el-button>
          </div>
        </el-collapse-transition>
      </div>
    </div>
    <el-button size="large" type="primary" icon="el-icon-my-add" @click="transferApply" style="margin-top: 20px; padding-left: 15px; padding-right: 20px;" v-if="btnShow" v-permission="'single-transfer'">转账申请</el-button>
    <el-button size="large" type="primary" icon="el-icon-my-add" @click="offlineApply" style="margin-top: 20px; padding-left: 15px; padding-right: 20px;" v-if="btnOffShow" v-permission="'offline-recharge-create'">充值申请</el-button>
  </div>
</template>

<script>
  let flag = false;

  export default {
    name: 'account-detail',
    props: {
      title: {
        type: String,
        required: true,
      },
      titleTip: {
        type: String,
      },
      btnShow: {
        type: Boolean,
      },
      btnOffShow: {
        type: Boolean,
      },
      notice: {
        type: String,
        default: '',
      },
    },
    watch: {
      notice(value) {
        if (value === '') {
          this.noticeVisible = true;
          clearInterval(flag);
        } else {
          this.countDown();
        }
      },
    },
    data() {
      return {
        duration: 10,
        time: 0,
        noticeVisible: true,
      };
    },
    methods: {
      transferApply() {
        this.$router.push('/home/single-transfer');
      },
      offlineApply() {
        this.$router.push('/home/offline-recharge-create');
      },

      showNoticeBtnClicked() {
        this.$emit("showNoticeEmit");
      },

      countDown() {
        this.time = this.duration;
        flag = setInterval(() => {
          this.time--;
          if (this.time === 0) {
            this.time = this.duration;
            this.noticeVisible = !this.noticeVisible;
          }
        }, 1000);
      },

      beforeDestroy() {
        clearInterval(flag);
      },
    },
  };
</script>

<style scoped>
  .title {
    font-size: 20px;
    color: #2d2f33;
  }
  .page-header-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
  }
  .title-txt-tip {
    margin-top: -15px;
    color: #878d99;
  }
  .notice-tip {
    margin-top: -15px;
    margin-bottom: -8px;
    display: inline-flex;
  }
  .notice-title {
    color: #fb6d9c;
    display: table-cell;
    vertical-align: middle;
  }
  .notice-color {
    color: #878d99;
    display: table-cell;
    vertical-align: middle;
  }
  .notice-button {
    margin-top: -7px;
    margin-left: 10px;
  }
  .description {
    display: flex;
    justify-content: flex-start;
  }
</style>
