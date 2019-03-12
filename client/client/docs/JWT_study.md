###简介
JWT是一种用于双方之间传递安全信息的简洁的、URL安全的表述性声明规范。
###应用场景

* 身份认证
* 信息交换

###好处

* 简洁
* 自包含

###jwt组成

* Header (包含token类型和采用的算法)
* Payload (一些用户的信息)
* Signature (header payload各自的base64字符串，用某种算法计算得到一个签名)

###如何使用
server端返回jwt,client端在登陆后将其带入请求头中，交由server端接口校验

###jwt存放在哪里
jwt存放在浏览器的web storage中的local storage中，永久有效

###LocalStorage如何管理jwt
用户在登录有获取到服务端返回的jwt,client端将其存放在LocalStorage中，关闭浏览器后仍然有效，但是当用户主动登出后，需要清除LocalStorage中的jwt

###jwt如何存取
使用LocalStorage,如：
localStorage.setItem("jwt", "jwtString");
localStorage.getItem("jwt");

###vue-resource如何使用
1.通过向vue-resource的方法的可选参数设置headers对象,将jwt传入请求头中；
2.通过vue-resource拦截器，在请求发送前设置请求头；
两种方法，个人倾向第一种使用一个全局的可选参数对象，带入到各个请求方法中；

###相关资源
http://blog.leapoahead.com/2015/09/06/understanding-jwt/
https://jwt.io/#libraries
https://segmentfault.com/a/1190000005047525

