
<template>
  <footer class="footer default-font-size theme-font-gray">
    <div class="type-page">
      <p>{{ bakInfo }}</p>
    </div>
  </footer>
</template>

<script>
  import Vue from 'vue';
  import { mapActions } from 'vuex';
  import UrlConfig from '@/utils/UrlConfig';

  export default {
    name: 'bottom-bar',
    data() {
      return {
        copyright: '',
      };
    },
    created() {
//     Vue.axios.get(UrlConfig.COPYRIGHT_PATH)
//       .then((response) => {
//          this.copyright = response.data.bakInfo;
//        })
//        .catch((error) => {
//          console.log(error);
//        });
    },
    computed: {
      appMeta() {
        return this.$store.state.meta.appMeta;
      },
      bakInfo() {
        if (this.appMeta.ui.bakInfo) {
          return this.appMeta.ui.bakInfo.replace('@', '©');
        }
        return '';
      },
    },
    methods: {
    },
  };
</script>

<style scoped>
  .footer {
    text-align: center;
    height: 60px;
  }
  .type-page {
    width: 100%;
    max-width: 960px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .footer p {
    color: #777;
    font-size: 12px;
  }
</style>
