<template>
  <div id="role-edit" class="role-edit">
    <div class="role-edit-title">
      <page-header-comp :title="pageMeta.title" :titleTip="pageMeta.desc"></page-header-comp>
    </div>
    <role-edit-card-comp :roleId="roleId" :description="desc"
                         :status="status" :displayName="displayName"
                         :permissionData="allPermissions"></role-edit-card-comp>
  </div>
</template>

<script>
  import { mapState } from 'vuex';
  import roleEditCardComp from '@components/role-edit-card';
  import pageHeaderComp from '@components/page-header';

  export default {
    name: 'role-edit',
    components: {
      pageHeaderComp,
      roleEditCardComp,
    },
    data() {
      return {
        roleId: '',
        desc: '',
        status: 'normal',
        displayName: '',
      };
    },
    created: function () {
      this.roleId = this.$route.query.roleId;
      this.desc = this.$route.query.desc;
      this.status = this.$route.query.status || this.status;
      this.displayName = this.$route.query.displayName;
    },
    computed: {
      ...mapState({
        appMeta: state => state.meta.appMeta,
        pageMeta: state => state.meta.pageMeta,
        permissions: state => state.user.permissions,
        userInfo: state => state.user.userInfo,
      }),

      defaultRolePerms() {
        return this.pageMeta.defaultRolePerms;
      },

      allPermissions() {
        if (this.permissions && this.permissions.children) {
//          if (this.userInfo.operator.loginFlag === '1') {
//            this.recursionPermission(this.permissions.children);
//          }

          this.recursionPermission(this.permissions.children);
          return this.permissions.children;
        }

        return [];
      },

    },
    methods: {

      recursionPermission(permissions) {
        permissions.map((item) => {
          if (item.name === 'operator-manager' || item.name === 'operator-info-create' ||
            item.name === 'role-manager' || item.name === 'role-info-create' ||
            item.name === 'security-center') {
            item.disabled = true;
          }

          if (item.children && item.children.length > 0) {
            this.recursionPermission(item.children);
          }
        });
      },
    },
  };
</script>

<style>

  .role-edit-title {
    margin-bottom: 20px;
  }

</style>
