<template>
  <div id="reconciliation-download" class="reconciliation-download">
    <div class="reconciliation-download-title">
      <page-header-comp :title="pageMeta.title" :titleTip="pageMeta.desc"></page-header-comp>
    </div>
    <reconciliation-download-comp :action="downloadUrl"></reconciliation-download-comp>
  </div>
</template>

<script>
  import { mapState } from 'vuex';
  import reconciliationDownloadComp from '@components/reconciliation-download';
  import pageHeaderComp from '@components/page-header';
  import UrlConfig from '@/utils/UrlConfig';

  export default {
    name: 'reconciliation-download',
    components: {
      pageHeaderComp,
      reconciliationDownloadComp,
    },
    data() {
      return {
        downloadUrl: '',
      };
    },
    created: function () {
      this.downloadUrl = UrlConfig.DOWNLOAD_RECONCILIATION_PATH;
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

  .reconciliation-download-title {
    margin-bottom: 20px;
  }

</style>
