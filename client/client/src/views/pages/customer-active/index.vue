<template>
  <div class="customer-active">
    <top-bar class="topBar"></top-bar>
    <div class="set-login-pwd">
      <el-card class="customer-active-card">
        <component :is="componentName" :user_name="user_name"></component >
      </el-card>
    </div>
  </div>
</template>
<script>
  import Vue from 'vue';
  import customerActiveSuccess from '@components/customer-active-success';
  import customerActiveFailed from '@components/customer-active-failed';
  import topBar from '@components/top-bar';
  import UrlConfig from '@/utils/UrlConfig';
  import ActiveNextStep from '@/utils/ActiveNextStep';
  
  export default {
    data() {
      return {
        componentName: '',
        user_name: '',
      };
    },
    components: {
      topBar,
      customerActiveSuccess,
      customerActiveFailed,
    },
    props: {
    
    },
    created() {
      const val = {
        operator_id: this.$route.query.operator_id,
        active_token: this.$route.query.active_token,
      };
      Vue.axios.post(UrlConfig.CUSTOMER_ACTIVE_PATH, val)
        .then((response) => {
          if (response) {
            this.user_name = response.data.user_name;
            this.$store.commit('SET_AUTH_INFO', response.data);
            if (response.data.auth_next_step === ActiveNextStep.ACTIVE_LOGIN_PWD) {
              this.$router.push({
                path: '/retrieve-pwd-reset',
                query: {
                  auth_token: this.authInfo.auth_token,
                  is_active: 'active',
                  skipBindPhone: true,
                },
              });
            }
            if (response.data.auth_next_step === ActiveNextStep.ACTIVE_PHONE_NO) {
              this.componentName = 'customerActiveSuccess';
            }
          }
        })
        .catch((error) => {
          this.componentName = 'customerActiveFailed';
        });
    },
    computed: {
      authInfo() {
        return this.$store.state.user.authInfo;
      },
    },
    methods: {
    
    },
  }
</script>
<style>
  
  .customer-active {
    background-color: #eee;
    height: 100%;
  }
  .set-login-pwd {
    background-color: #eee;
    height: 100%;
  }
  .customer-active-card {
    width: 400px;
    height: auto;
    margin: 10% auto;
  }
  .el-card__body {
    padding: 30px;
  }
</style>

