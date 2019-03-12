<template>
  <div class="notification-detail">
    <page-header-comp :title="pageMeta.title" :titleTip="pageMeta.desc"></page-header-comp>
    <notification-detail-card-comp :notificationId="notificationId"
                                   @backButtonClickedEmit="backButtonClickedHandle"></notification-detail-card-comp>
  </div>
</template>

<script>
  import { mapState } from 'vuex';
  import notificationDetailCardComp from '@components/notification-detail-card';
  import pageHeaderComp from '@components/page-header';
  import router from '@/router';

  export default {
    name: 'notification-detail',
    components: {
      notificationDetailCardComp,
      pageHeaderComp,
    },
    data() {
      return {
        notificationId: 0,
      };
    },
    created: function () {
      this.notificationId = this.$route.query.notificationId;
    },
    computed: {
      ...mapState({
        appMeta: state => state.meta.appMeta,
        pageMeta: state => state.meta.pageMeta,
      }),
    },
    methods: {
      backButtonClickedHandle() {
        router.push('/home/notification');
      },
    },
  };
</script>

<style>

</style>
