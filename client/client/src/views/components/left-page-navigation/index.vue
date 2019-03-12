<template>
  <el-aside>
    <el-col class="menuCol">
      <el-menu :span="5"
               :default-openeds="subMenuOpenArray"
               @select="navClick" :router="true"
               v-if="menuSource" class="theme-home-left-nav">
        <component v-for="item in menuSource.children"
                   :key="item.name"
                   v-if="item.category === 'menu'"
                   :index="item.path"
                   :is="item.hasChildMenu ? 'el-submenu': 'el-menu-item'"
                   :class="{ 'cur-active': item.path === currentPath }">
          <template slot="title">
            <i :class="item.icon"></i>
            <span slot="title">{{ item.displayName }}</span>
          </template>
          <el-menu-item v-for="subitem in item.children"
                        class="theme-home-left-nav"
                        :class="{ 'cur-active': subitem.path === currentPath }"
                        :key="subitem.name"
                        v-if="subitem.category === 'menu'" :index="subitem.path">
            {{ subitem.displayName }}
            <el-badge v-if="subitem.name === 'agentpay-check' && num !== 0 " :value="num" :max="9999" >
            </el-badge>
            <el-badge v-if="subitem.name === 'secret-manager' && isRedPort !== false " :value="'!'">
            </el-badge>
          </el-menu-item>
        </component>
      </el-menu>
    </el-col>
  </el-aside>
</template>

<script>
  import Vue from 'vue';
  import store from '@/vuex/store';
  import ActionTypeName from '@/utils/ActionTypeName';
  import ElBadge from '../../../../node_modules/element-ui/packages/badge/src/main.vue';

  export default {
    components: { ElBadge },
    name: 'left-page-navigation',
    props: {
      menuSource: {
        type: Object,
        required: true,
      },
      subMenuOpenArray: {
        type: Array,
        required: true,
      },
    },
    data() {
      return {
        num: 0,
        isRedPort: false,
      };
    },
    created() {
      this.timingNotifiacation();
      setInterval(() => {
        this.timingNotifiacation();
      }, 600000);
    },
    methods: {
      navClick() {
        this.$emit('navClickEmit');
      },
      timingNotifiacation() {
        let menu = this.menuSource.children;
        let menuLength = menu.length;
        for (let i = 0; i < menuLength; i++) {
          for (let j = 0; j < menuLength; j++) {
            const agentpayManager = menu[i].name === 'agentpay-manager' || menu[i].name === 'agentpay-check';
            const agentpayCheck = menu[j].name === 'agentpay-check' || menu[j].name === 'agentpay-manager';
            if (agentpayManager && agentpayCheck) {
              this.$store.dispatch(ActionTypeName.GET_WARNING_HINTS)
                .then((response) => {
                  console.log(response);
                  this.num = response.data.num;
                  this.isRedPort = response.data.isRedPort;
                })
                .catch((error) => {
                  Vue.prototype.$message({
                    showClose: true,
                    message: error.respMessage,
                    type: 'error',
                  });
                });
            }
          }
        }
        // if (this.$permission.permissions.hasOwnProperty('agentpay-manager') && this.$permission.permissions.hasOwnProperty('agentpay-check')) {
        //   this.$store.dispatch(ActionTypeName.GET_WARNING_HINTS)
        //     .then((response) => {
        //       console.log(response);
        //       this.num = response.data.num;
        //       this.isRedPort = response.data.isRedPort;
        //     })
        //     .catch((error) => {
        //       Vue.prototype.$message({
        //         showClose: true,
        //         message: error.respMessage,
        //         type: 'error',
        //       });
        //     });
        // }
      },
    },
    computed: {
      currentPath() {
        return this.$route.path;
      },
    },
  };
</script>

<style scoped>
  .menuCol {
    /*height:100%;*/
    min-width: 200px;
  }

</style>
<style>
  .el-submenu__title {
    height: 44px;
    line-height: 44px;
    color: #1f2d3d;
  }
  .el-menu .el-submenu .el-menu-item{
    height: 44px;
    line-height: 44px;
    padding-left: 54px!important;
    /*color: #1f2d3d;*/
  }
  .el-menu-item.is-active {
    color: #2d2f33;
    background-color: #fff;
  }
  .el-menu-item.cur-active {
    font-weight: 700;
    color: #409EFF;
    background-color: rgba(240,242,248,.5);
  }
  .el-submenu__title:hover, .el-menu-item:hover {
    color: #409EFF;
    background-color: rgba(240,242,248,.5);
  }
  .menuCol .el-menu-item {
    height: 44px;
    line-height: 44px;
  }
  .el-menu-item.cur-active i {
    color: #409EFF;
    background-color: rgba(240,242,248,.5);
  }
  .el-submenu__title:hover i, .el-menu-item:hover i {
    color: #409EFF;
    background-color: rgba(240,242,248,.5);
  }
  .menuCol .el-menu {
    border-right: none;
  }
  .menuCol .el-icon-arrow-down:before {
    content: '\E60B';
  }
  .el-badge__content{
    background-color: #f66;
    border-radius: 9px;
    color: #fff;
    display: inline-block;
    font-size: 12px;
    font-weight: 700;
    height: 18px;
    line-height: 18px;
    padding: 0 6px;
    text-align: center;
    white-space: nowrap;
    margin-top: -10px;
    margin-left: 30px;
    border: none;
  }
</style>
