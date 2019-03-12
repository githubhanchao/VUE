/**
 * Created by huangjason on 2017/9/11.
 */
<template>
  <div id="home" class="home">
    <home-top-bar class="topBar" @logoutEmit="logoutEvent" @menuClickEmit="menuClickEmitHandle"></home-top-bar>
    <left-page-navigation :menuSource="permissions" @navClickEmit="menuClickEmitHandle" ref="leftPage" :subMenuOpenArray="subMenuOpenArray" id="navMenu" class="theme-home-left-nav navMenu"></left-page-navigation>
    <div class="content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
  import homeTopBar from '@components/home-top-bar';
  import leftPageNavigation from '@components/left-page-navigation';
  import TokenUtil from '@/utils/TokenUtil'
  import RequestHeaderUtil from '@/utils/RequestHeaderUtil';
  import ActionTypeName from '@/utils/ActionTypeName';
  import { mapActions, mapState } from 'vuex';
  import router from '@/router';
  import LoginNameUtil from '@/utils/LoginNameUtil';
  import GuideStatusUtil from '@/utils/GuideStatusUtil';

  export default {
    name: 'home',
    data() {
      return {
      };
    },
    computed: {
      ...mapState({
        permissions: state => state.user.permissions,
      }),
//      ACCESS_TOKEN() {
//        return TokenUtil.getAccessToken();
//      },
      subMenuOpenArray() {
        const array = ['trade-manager', 'agentpay-manager'];
//        if (this.permissions.children !== undefined) {
//          this.permissions.children.filter((item) => {
//            if (item.children && item.children.length > 0) {
//              array.push(item.path);
//            }
//          });
//        }
        return array;
      },
    },
//    watch: {
//      ACCESS_TOKEN(value, oldvalue) {
//        if (!value) {
//          this.userLogout();
//        }
//      },
//    },
    methods: {
      ...mapActions([ActionTypeName.USER_LOGOUT]),

      logoutEvent() {
        this.userLogout({
          user_name: LoginNameUtil.getOperatorName(),
        })
        .then(() => {
          RequestHeaderUtil.removeAccessTokenHeader();
          GuideStatusUtil.removeGuideStatus();
          router.push('/login');
        })
        .catch(() => {
          GuideStatusUtil.removeGuideStatus();
          RequestHeaderUtil.removeAccessTokenHeader();
          router.push('/login');
        });
      },
      menuClickEmitHandle() {
        let leftPageDisplay = this.$refs['leftPage'].$el.style.display;
        this.$refs['leftPage'].$el.style.zIndex = 99;
        if (leftPageDisplay === 'block') {
          this.$refs['leftPage'].$el.style.display = 'none';
          return;
        }
        this.$refs['leftPage'].$el.style.display = 'block';
      },
    },
    components: {
      homeTopBar,
      leftPageNavigation,
    },
  };
</script>

<style scoped>

 .home {
   height: 100%;
   overflow-y: auto;
   background-color: #f0f2f8;
 }

  .navMenu {
    height: 100%;
    width: 240px!important;
    overflow: auto;
    padding-top: 70px;
    position: fixed;
    left: 0;
    transition: all 0.3s;
    display: block;
  }
 .content {
   /*height: 100%;*/
   margin-top: 40px;
   margin-left: 240px;
   padding: 20px 20px 40px 20px;
   background-color: #f0f2f8;
   overflow-y: auto;
   overflow-x: hidden;
   transition: all 0.3s;
 }
  @media screen and (max-width: 768px) {
    .navMenu {
      width: 100%!important;
      display: none;
    }
    .content {
      margin-left: 0;
    }
    .top-menu {
      display: inline-block;
    }
    .el-menu .el-submenu .el-menu-item {
      padding-left: 100px!important;
    }
    .menuCol .el-menu-item {
      padding-left: 40px!important;
    }
  }
 @media screen and (min-width: 768px) {
   .navMenu {
     width: 240px;
     display: block!important;
   }
   .content {
     margin-left: 240px;
   }
 }
</style>
<style>
  @media screen and (max-width: 768px) {
    .menuCol .el-menu-item {
      padding-left: 40px!important;
    }
    .menuCol .el-submenu .el-submenu__title {
      padding-left: 40px!important;
    }
    .menuCol .el-submenu .el-menu .el-menu-item {
      padding-left: 100px!important;
    }
  }
  .head-data_text {
    color: rgb(255, 51, 102);
    margin-right: 20px;
  }
  .home .el-range-editor.el-input__inner {
    width: auto;
  }
</style>
