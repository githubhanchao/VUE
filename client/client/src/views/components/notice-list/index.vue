
<template>
  <el-card class="notice-list" v-loading="loading">
    <el-collapse v-model="activeName">
      <el-collapse-item v-for="(item, index) in noticeData"
                        :title="item.date_created" :name="index">
        <div>{{ item.content }}</div>
      </el-collapse-item>
    </el-collapse>
  </el-card>
</template>

<script>
  import { mapState } from 'vuex';
  import Vue from 'vue';
  import UrlConfig from '@/utils/UrlConfig';

  export default {
    name: 'notice-list',
    props: {
    },
    data() {
      return {
        loading: true,
        noticeData: [],
        activeName: [],
      };
    },
    computed: {
      ...mapState({
        userInfo: state => state.user.userInfo,
      }),
    },
    created() {
      this.loadNoticeList();
    },
    methods: {

      loadNoticeList() {
        this.loading = true;
        Vue.axios.get(UrlConfig.NOTICE_LIST_PATH)
          .then((response) => {
            this.loading = false;
            this.noticeData = response.data.list;
            const count = this.noticeData.length;
            for (let i = 0; i < count; i++) {
              this.activeName.push(i);
            }
          })
          .catch((error) => {
            this.loading = false;
            this.$message({
              showClose: true,
              message: error.respMessage,
              type: 'error',
            });
          });
      },
    },
  };
</script>

<style scoped>
  .notice-list {
    width: 100%;
    height: auto;
    margin: 0 auto;
    background-color: white;
  }
</style>
