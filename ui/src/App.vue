<template>
  <div class="layui-container">
    <div class="layui-row header">
      <!--<div class="layui-header">-->
      <div class="header-col">
        <!--<div class="layui-logo">-->
        <div class="layui-show-lg-inline">
          <img src="../static/images/ArcSoftLogo.png" alt="虹软专利管理系统" width="100px" height="30px">
        </div>
        <span class="logo-title">Patent Management System</span>
        <!--</div>-->
      </div>

      <ul class="layui-nav layui-layout-right" v-show="currentPath != '/'">
        <li :class="currentPath == '/invention_list' ? 'layui-nav-item layui-this' : 'layui-nav-item'">
          <router-link to="Invention_list">
            <div :class="currentPath == '/invention_list' ? 'nav-icon nav-icon-invention-on' : 'nav-icon nav-icon-invention-off'"></div>Invention
          </router-link>
        </li>
        <li :class="currentPath == '/patent_list' ? 'layui-nav-item layui-this' : 'layui-nav-item'">
          <router-link to="Patent_list">
            <div :class="currentPath == '/patent_list' ? 'nav-icon nav-icon-patent-on' : 'nav-icon nav-icon-patent-off'"></div>Patent
          </router-link>
        </li>
        <li :class="currentPath == '/base_table' ? 'layui-nav-item layui-this' : 'layui-nav-item'" v-if="user.base_table">
          <router-link to="Base_table">
            <div :class="currentPath == '/base_table' ? 'nav-icon nav-icon-base-table-on' : 'nav-icon nav-icon-base-table-off'"></div>Base Table
          </router-link>
        </li>
        <li class="layui-nav-item">
          <a href="javascript:;">
            {{user.username}}
            <span class="layui-nav-more"></span>
          </a>
          <dl class="layui-nav-child">
            <dd><a href="#" @click="logout">退出登录</a></dd>
          </dl>
        </li>
      </ul>

    </div>
    <div id="app">
      <router-view @loginSuccess="loginSuccess"/>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'App',
    data(){
      return {
        user: '',
        currentPath: '',
      }
    },
    watch: {
      $route:function(){
        this.currentPath = this.$route.path.toLowerCase();
        console.log(this.currentPath);
      }
    },
    mounted: function () {
      var temp_data = layui.sessionData('arcsoft');
      this.user = {
        'username' : temp_data.username,
        'user_id' : temp_data.user_id,
        'base_table': temp_data.base_table,
      }
      this.currentPath = this.$route.path.toLowerCase();
      console.log(this.currentPath);
      layui.element.render();
    },
    methods:{
      loginSuccess: function (user) {
        this.user = user;
        console.log(user);
      },
      logout: function () {
        var vue = this;
        vue.$http.post(`http://172.17.186.157:7010/patent/logout`,{
          withCredentials: true,
        })
          .then(function (res) {
            if (res.data['success']){

            }
          })
          .catch(function (err) {
            console.log(err)
          })
        layui.sessionData('arcsoft', {
          key: 'username',
          remove: true
        });
        layui.sessionData('arcsoft', {
          key: 'user_id',
          remove: true
        });
        vue.user = '';
        vue.$router.push({
          path:'/',
          query:{
          }
        });
      }
    }
  }
</script>

<style>
  body {
    min-width: 1200px !important;
    overflow: auto;
    height: 100%;
  }

  .layui-container {
    min-width: 1200px !important;
    width: 100%;
  }
  .layui-header {
    min-width: 1200px;
    height: 30px !important;
  }
  .header {
    margin-top: 20px;
  }

  .header-col {
    display: inline-block;
    width: 49%;
  }
  .menu {
    position: relative;
    top: 10px;
    bottom: 0;
    display: inline-block;
    font-weight: 100;
    font-style: inherit;
    color: #A8A8A8;
    width: 24%;
    text-align: right;
  }
  .layui-show-lg-inline{
    float: left;
  }
  .logo-title{
    font-size: 24px;
    font-weight: bold;
    float: left;
    margin-top: 7px;
    margin-left: 10px;
    color: #333;
  }
  .layui-nav {
    position: relative;
    padding: 0 20px;
    color: #A8ADB1;
    border-radius: 2px;
    font-size: 0;
    box-sizing: border-box;
    background-color: #ffffff;
  }

  .layui-nav .layui-nav-item a:hover, .layui-nav .layui-this a {
    color: #398DDE!important;
    /*font-weight: 700;*/
  }
  .router-link-active{
    color: #398DDE!important;
    /*font-weight: 700;*/
  }
  .layui-nav .layui-nav-item a {
    display: inline-block;
    padding: 0 00px;
    color: #A8ADB1;
    transition: all .3s;
    -webkit-transition: all .3s;
  }

  .layui-nav .layui-this:after, .layui-nav-bar, .layui-nav-tree .layui-nav-itemed:after {
    background-color: #ffffff;
  }

  .layui-nav * {
    font-size: 20px;
    font-weight: 500;
  }

  .layui-nav .layui-nav-more{
    border-color: #A8ADB1 transparent transparent;
    border-top-color: #A8ADB1;
  }

  .layui-nav .layui-nav-mored{
    border-color: transparent transparent #A8ADB1;
  }

  .layui-nav .layui-nav-item{
    line-height: 30px;
    padding: 0px 40px;
  }


  .nav-icon{
    width: 24px;
    height: 25px;
    display: inline-block;
    vertical-align: middle;
    margin-right:5px;
  }

  .nav-icon-invention-on{
    background-image: url('../static/images/navibar_invention_on.png')
  }

  .nav-icon-invention-off{
    background-image: url('../static/images/navibar_invention_off.png');
  }

  .layui-nav .layui-nav-item a:hover .nav-icon-invention-off{
    background-image: url('../static/images/navibar_invention_on.png')
  }

  .nav-icon-patent-on{
    background-image: url('../static/images/navibar_patent_on.png')
  }

  .nav-icon-patent-off{
    background-image: url('../static/images/navibar_patent_off.png')
  }

  .layui-nav .layui-nav-item a:hover .nav-icon-patent-off{
    background-image: url('../static/images/navibar_patent_on.png')
  }

  .nav-icon-base-table-on{
    background-image: url('../static/images/navibar_baseTable_on.png')
  }

  .nav-icon-base-table-off{
    background-image: url('../static/images/navibar_baseTable_off.png')
  }

  .layui-nav .layui-nav-item a:hover .nav-icon-base-table-off{
    background-image: url('../static/images/navibar_baseTable_on.png')
  }

  .layui-nav-child{
    left: 3px;
    top: 45px;
  }
  .layui-nav-child dd{
    text-align: center;
  }
</style>
