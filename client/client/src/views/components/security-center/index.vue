<template>
  <el-col>
    <div class="security-level" id="security-level">
      <div class="title">{{ pageInfo.ui && pageInfo.ui.securityLevel ?
        pageInfo.ui.securityLevel.title : '' }} {{ securityLevel.level }}</div>
      <el-progress class="progress" status="success" :percentage="securityLevel.percent" :stroke-width="10" :show-text="false"></el-progress>
      <div class="suggest" v-if="securityLevel.level === securityLevelHigh">{{ pageInfo.ui && pageInfo.ui.securityLevel ?
        pageInfo.ui.securityLevel.desc : '' }}</div>
      <div class="suggest" v-else>{{ securityLevelUnsafe }}</div>
    </div>
    <div :class="{ 'trade': key.name === 'pay_pass', 'twoFactor': key.name === 'google_authen' }" v-for="key in securityList">
      <div class="login-password">
        <div class="security-list">
          <i class="el-icon-success check"  v-if="listVisible(key)"></i>
          <i class="el-icon-warning warning" v-else></i>
          <div class="security-list-content">
            <div class="title" v-if="listVisible(key)">
              <span>{{ key.title }}</span> <span class="phoneNum">{{ key.name === securityListType ? bindPhoneNum : '' }}</span>
            </div>
            <div class="title" v-else>{{ key.titleUnsafe }}</div>
            <div class="notice">
              <span>{{ key.desc }}</span>
              <br>
              <span class="use" v-if="key.name === 'google_authen'" @click="learnToUse">了解使用方法 ></span>
            </div>
          </div>
        </div>
        <div class="operate">
          <el-button type="primary" class="operate-btn" @click="securityOperate(key)"
                     v-if="listVisible(key)">{{ key.operate }}</el-button>
          <el-button type="danger" class="operate-btn" @click="securityOperate(key)" v-else>{{ key.operateUnsafe }}</el-button>
        </div>
      </div>
      <div :class="{ 'trade_pass': key.name === 'pay_pass' }" v-if="key.name === 'pay_pass'">
        <span style="font-size: 16px;">两步验证方式</span><br>
        <span style="margin-bottom: 10px;">非常重要！涉及到权限及资金的敏感操作，当您输入密码后，系统会进行身份验证步骤，请在下方设置两步验证方式</span>
      </div>
    </div>
  </el-col>
</template>

<script>
  import PhoneNumUtil from '@/utils/PhoneNumUtil';
  import SecurityLevelUtil from '@/utils/SecurityLevelUtil';

  export default {
    name: 'security-center',
    props: {
      pageInfo: {
        type: Object,
        required: true,
      },
      securityList: {
        type: Array,
        required: true,
      },
      securityListStatus: {
        type: Array,
        required: true,
      },
      securityLevel: {
        type: Object,
        required: true,
      },
      bindPhoneNum: {
        type: String,
        required: true,
      },
    },
    data() {
      return {
        securityListType: PhoneNumUtil.type,
        securityLevelHigh: SecurityLevelUtil.high,
        helpUrl: '/assets/dynamic-word-help.html',
      };
    },
    computed: {
      securityLevelUnsafe() {
        let descUnsafe = this.pageInfo.ui ? this.pageInfo.ui.securityLevel.descUnsafe : '';
        this.securityListStatus.forEach((value) => {
          if (!value.status && this.securityList.length > 0) {
            descUnsafe = descUnsafe + this.securityList.find(function(item) {  if (item.name === value.name) { return item; } }).descUnsafe + '、';
          }
        });
        return descUnsafe.substr(0, descUnsafe.length - 1) + '。';
      },
    },
    methods: {
      securityOperate(item) {
        this.$emit('securityOperateEmit', item.name);
      },
      learnToUse() {
        window.open(this.helpUrl);
      },
      listVisible(value) {
        return this.securityListStatus.find(function(item) { if (item.name === value.name) { return item; } }).status;
//        ?
//        this.securityListStatus.find(function(item) { if (item.name === value.name) { return item; } }).status : false;
      },
    },
  };
</script>

<style src="./index.css" scoped></style>
