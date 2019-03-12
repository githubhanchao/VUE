<template>
  <div id="role-manager" class="role-manager">
    <div class="role-manager-title">
      <page-header-comp :title="pageMeta.title" :titleTip="pageMeta.desc"></page-header-comp>
      <el-button size="large" class="edit_role_btn" type="primary"
                 icon="el-icon-my-add"
                 style="width: 112px;"
                 v-permission="'role-info-create'"
                 @click="addRoleBtnClicked">添加角色</el-button>
    </div>
    <role-manager-table-comp :action="roleInfoUrl"></role-manager-table-comp>
  </div>
</template>

<script>
  import { mapState } from 'vuex';
  import roleManagerTableComp from '@components/role-manager-table';
  import pageHeaderComp from '@components/page-header';
  import UrlConfig from '@/utils/UrlConfig';
  import router from '@/router';

  export default {
    name: 'role-manager',
    components: {
      pageHeaderComp,
      roleManagerTableComp,
    },
    data() {
      return {
        roleInfoUrl: '',
      };
    },
    created: function () {
      this.roleInfoUrl = UrlConfig.ROLE_LIST_PATH;
    },
    computed: {
      ...mapState({
        appMeta: state => state.meta.appMeta,
        pageMeta: state => state.meta.pageMeta,
      }),

    },
    methods: {
      addRoleBtnClicked() {
        router.push('/home/role-add');
      },
    },
  };
</script>

<style>

  .role-manager-title {
    /*margin-bottom: 20px;*/
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

</style>
