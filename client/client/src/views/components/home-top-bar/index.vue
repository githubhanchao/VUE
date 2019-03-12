<template>
  <div>
    <div class="unFinishReport" v-if="unFinishReport">
      <span><i class="el-icon-warning"></i>您的企业信息尚未完成实名认证，暂时无法使用更多服务，<span class="report" @click="report">立即实名认证 ></span></span>
    </div>
    <header class="header fixed theme-home-header">
      <el-col :xs="9" :sm="7" :md="6" :lg="5" class="type-page">
        <i class="el-icon-menu top-menu" @click="menuClick"></i>
        <img :src="`${apiUrlPrefix}` + `${appMeta.ui.logoUrl}`" alt="" class="logImg" style="cursor: pointer;" @click="backToHome">
        <span class="logo-line"></span>
        <span class="title">{{ appMeta.ui.displayName }}</span>
      </el-col>
      <el-col :xs="14" :sm="11" :md="10" :lg="9" class="operate">
        <span class="operator-name">欢迎，{{ customerName }} ({{ operatorName }})</span>
        <span>/</span>
        <span class="quit" @click="showNotice">公告信息</span>
        <span>/</span>
        <span class="quit" @click="logout">退出</span>
      </el-col>
    </header>
  </div>
</template>

<script>
  import Vue from 'vue';
  import UrlConfig from '@/utils/UrlConfig';
  import GuideStatusUtil from '@/utils/GuideStatusUtil';
  
  export default {
    name: 'top-bar',
    data() {
      return {
        apiUrlPrefix: window.appConfig.apiUrlPrefix,
        fixed: false,
        unFinishReport: false,
      };
    },
    created() {
      Vue.axios.get(UrlConfig.GET_CUSTOMER_REPORT_STATUS_PATH, { params: { defaultEmail: this.$store.state.user.userInfo.defaultEmail } })
        .then((response) => {
          if (response.data.isMock === '1' && !response.data.pid) {
            document.querySelector('.navMenu').style.paddingTop = '117px';
            document.querySelector('.content').style.marginTop = '90px';
            this.unFinishReport = true;
            GuideStatusUtil.setGuideStatus('true');
            return;
          }
          document.querySelector('.navMenu').style.paddingTop = '70px';
          document.querySelector('.content').style.marginTop = '40px';
        })
        .catch((error) => {
          console.log(error);
        });
    },
    computed: {
      appMeta() {
        return this.$store.state.meta.appMeta;
      },
      userInfo() {
        return this.$store.state.user.userInfo;
      },
      customerName() {
        if (this.userInfo && this.userInfo.cmCustomer && this.userInfo.cmCustomer.name) {
          return this.userInfo.cmCustomer.name;
        }
        return '';
      },
      operatorName() {
        if (this.userInfo && this.userInfo.name) {
          return this.userInfo.name;
        }
        return '';
      },
    },
    methods: {
      logout() {
        this.$confirm('确定要退出系统吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
        }).then(() => {
          this.$emit('logoutEmit');
        }).catch(() => {
        });
      },
      menuClick() {
        this.$emit('menuClickEmit');
      },
      backToHome() {
        this.$router.push('/home');
      },
      showNotice() {
        this.$router.push('/home/notice');
      },
      report() {
        this.$router.push({ path: '/customer-report', query: { defaultEmail: this.$store.state.user.userInfo.defaultEmail } });
      },
    },
  };
</script>

<style scoped>
  .header {
    height: 60px;
    border-bottom: 1px solid #E2E9EB;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding-left: 20px;
  }
  .topBar {
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 999;
  }
  .header img {
    vertical-align: middle;
    height: 40px;
    max-width: 200px ;
  }
  .title {
    font-size: 16px;
    /*color: #333333;*/
    vertical-align: middle;
  }
  .logo-line {
    display: inline-block;
    height: 16px;
    vertical-align: middle;
    border-left: 1px solid #ccc;
    margin-left: 10px;
    margin-right: 10px;
  }
  .type-page {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    text-overflow: ellipsis;
    overflow: hidden;
  }
  .operate {
    margin-right: 60px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
  .top-menu {
    width: 30px;
    height: 30px;
    font-size: 30px;
    display: none;
  }
  @media screen and (max-width: 768px) {
    .top-menu {
      display: inline-block;
      cursor: pointer;
    }
    .logo-line, .title, .logImg {
      display: none;
    }
  }
  .operator-name {
    margin-right: 10px;
  }
  .quit {
    display: inline-block;
    cursor: pointer;
    margin-left: 10px;
    margin-right: 10px;
  }
  .quit:hover {
    color: #20a0ff;
  }
  .unFinishReport {
    width: 100%;
    height: 50px;
    line-height: 50px;
    text-align: center;
    background-color: rgba(254, 249, 200, 1);
  }
  .unFinishReport .el-icon-warning {
    color: #f66;
    font-size: 16px;
    margin-right: 10px;
  }
  .report {
    color: #f66;
    font-size: 18px;
    cursor: pointer;
  }
</style>
