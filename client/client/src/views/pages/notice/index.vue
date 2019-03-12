<template>
  <div class="login-log">
    <div class="notice-title">
      <page-header-comp :title="pageMeta.title" :titleTip="pageMeta.desc"></page-header-comp>
    </div>
    <notice-list-comp></notice-list-comp>
  </div>
</template>

<script>
  import { mapState } from 'vuex';
  import noticeListComp from '@components/notice-list';
  import pageHeaderComp from '@components/page-header';

  export default {
    name: 'notice',
    components: {
      pageHeaderComp,
      noticeListComp,
    },
    data() {
      return {
      };
    },
    created: function () {

    },
    computed: {
      ...mapState({
        appMeta: state => state.meta.appMeta,
        pageMeta: state => state.meta.pageMeta,
      }),
    },
    methods: {

    },
  };
</script>

<style>

  .notice-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

</style>
