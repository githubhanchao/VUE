<template>
  <div class="layadmin-user-login-main">
    <div class="layadmin-user-login-box layadmin-user-login-header">
      <h2>ArcSoft</h2>
      <p>ArcSoft专利管理系统</p>
    </div>
    <div class="layadmin-user-login-box layadmin-user-login-body layui-form">
      <div class="layui-form-item">
        <label class="layadmin-user-login-icon layui-icon layui-icon-username" for="LAY-user-login-username"></label>
        <input type="text" name="userName" id="LAY-user-login-username" lay-verify="required" placeholder="用户名" class="layui-input">
      </div>
      <div class="layui-form-item">
        <label class="layadmin-user-login-icon layui-icon layui-icon-password" for="LAY-user-login-password"></label>
        <input type="password" name="password" id="LAY-user-login-password" lay-verify="required" placeholder="密码" class="layui-input">
      </div>
      <div class="layui-form-item">
        <button class="layui-btn layui-btn-fluid" lay-submit lay-filter="user-login-submit" id="btnLogin">登 入</button>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
      name: "Login",
      mounted: function(){
        var vue = this;
        layui.form.on('submit(user-login-submit)', function(data){
          var content = data.field;
          vue.$http.get(window.host + '/patent/login',{
            withCredentials: true,
            params: content,
          })
            .then(function (res) {
              if (res.data['success']){
                layui.sessionData('arcsoft', {
                  key: 'username',
                  value: res.data['ret_obj']['username']
                });
                layui.sessionData('arcsoft', {
                  key: 'user_id',
                  value: res.data['ret_obj']['user_id']
                });
                layui.sessionData('arcsoft', {
                  key: 'base_table',
                  value: res.data['ret_obj']['base_table']
                });
                vue.$emit("loginSuccess",res.data['ret_obj']);
                vue.$router.push({
                  path:'/patent_list',
                  query:{
                  }
                });
              }
              else{
                layui.layer.msg(res.data['ret_msg'])
              }
            })
            .catch(function (err) {
              console.log(err)
            })
        });
        layui.jquery(document).keydown(function (e) {
          if (e.keyCode === 13) {
            layui.jquery("#btnLogin").trigger("click");
          }
        });
      },
      methods:{

      }
    }
</script>

<style scoped>

  #LAY_app,body,html {
    height: 100%
  }

  .layui-layout-body {
    overflow: auto
  }

  #LAY-user-login,.layadmin-user-display-show {
    display: block!important
  }

  .layadmin-user-login {
    position: relative;
    left: 0;
    top: 0;
    padding: 110px 0;
    min-height: 100%;
    box-sizing: border-box
  }

  .layadmin-user-login-main {
    width: 375px;
    margin: 150px auto;
    box-sizing: border-box;
  }

  .layadmin-user-login-box {
    padding: 20px
  }

  .layadmin-user-login-header {
    text-align: center
  }

  .layadmin-user-login-header h2 {
    margin-bottom: 10px;
    font-weight: 300;
    font-size: 30px;
    color: #000
  }

  .layadmin-user-login-header p {
    font-weight: 300;
    color: #999
  }

  .layadmin-user-login-body .layui-form-item {
    position: relative
  }

  .layadmin-user-login-icon {
    position: absolute;
    left: 1px;
    top: 1px;
    width: 38px;
    line-height: 36px;
    text-align: center;
    color: #d2d2d2
  }

  .layadmin-user-login-body .layui-form-item .layui-input {
    padding-left: 38px
  }

  .layadmin-user-login-codeimg {
    max-height: 38px;
    width: 100%;
    cursor: pointer;
    box-sizing: border-box
  }

  .layadmin-user-login-other {
    position: relative;
    font-size: 0;
    line-height: 38px;
    padding-top: 20px
  }

  .layadmin-user-login-other>* {
    display: inline-block;
    vertical-align: middle;
    margin-right: 10px;
    font-size: 14px
  }

  .layadmin-user-login-other .layui-icon {
    position: relative;
    top: 2px;
    font-size: 26px
  }

  .layadmin-user-login-other a:hover {
    opacity: .8
  }

  .layadmin-user-jump-change {
    float: right
  }

  .layadmin-user-login-footer {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    line-height: 30px;
    padding: 20px;
    text-align: center;
    box-sizing: border-box;
    color: rgba(0,0,0,.5)
  }

  .layadmin-user-login-footer span {
    padding: 0 5px
  }

  .layadmin-user-login-footer a {
    padding: 0 5px;
    color: rgba(0,0,0,.5)
  }

  .layadmin-user-login-footer a:hover {
    color: rgba(0,0,0,1)
  }

  .layadmin-user-login-main[bgimg] {
    background-color: #fff;
    box-shadow: 0 0 5px rgba(0,0,0,.05)
  }

  .ladmin-user-login-theme {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    text-align: center
  }

  .ladmin-user-login-theme ul {
    display: inline-block;
    padding: 5px;
    background-color: #fff
  }

  .ladmin-user-login-theme ul li {
    display: inline-block;
    vertical-align: top;
    width: 64px;
    height: 43px;
    cursor: pointer;
    transition: all .3s;
    -webkit-transition: all .3s;
    background-color: #f2f2f2
  }

  .ladmin-user-login-theme ul li:hover {
    opacity: .9
  }

  @media screen and (max-width: 768px) {
    .layadmin-user-login {
      padding-top:60px
    }

    .layadmin-user-login-main {
      width: 300px
    }

    .layadmin-user-login-box {
      padding: 10px
    }
  }

</style>
