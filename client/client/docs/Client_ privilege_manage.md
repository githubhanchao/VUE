###前端权限管理

####菜单权限控制
做法有两种:
1.在vue-router的beforeEach钩子函数中校验路由地址是否有权访问;
2.本地保存当前权限的完整路由，需要将登录页独立出去做成一个单独的页面;


####按钮权限控制
1.通过自定义指令，绑定权限校验方法;
2.通过vue-resource拦截器在请求级别统一处理权限验证;
3.client端获取资源和权限的配置表，依据该表完成权限校验;

####相关资源
http://refined-x.com/2017/08/29/基于Vue实现后台系统权限控制/