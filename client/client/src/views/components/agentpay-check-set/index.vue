<template>
  <el-card>
    <div class="agentpay-check-set">
      <div class="security-list">
        <i class="el-icon-circle-check check"  v-if="warningVisible"></i>
        <i class="el-icon-warning warning" v-else></i>
        <div class="security-list-content">
          <div class="title" v-if="warningVisible">
            <span>{{ pageMeta.title }}</span> <span class="phoneNum">{{ pageMeta.agentpayCheckSetList ? pageMeta.agentpayCheckSetList.status : 'disabled' }}</span>
          </div>
          <div class="title" v-else>{{ pageMeta.title }}{{ pageMeta.agentpayCheckSetList ? pageMeta.agentpayCheckSetList.statusUnsafe : '' }}</div>
          <div class="notice">
            <span>{{ pageMeta.agentpayCheckSetList ? pageMeta.agentpayCheckSetList.desc : '' }}</span>
          </div>
        </div>
      </div>
      <div class="operate">
        <el-tooltip :content="switchContent" placement="top">
          <el-switch v-model="status" @change="checkSetStatusChange"
                     active-value="normal" inactive-value="disabled"
                     active-color="#13ce66" inactive-color="#ddd">
          </el-switch>
        </el-tooltip>
      </div>
    </div>
  </el-card>
</template>
<script>
  import Vue from 'vue';
  import { mapState } from 'vuex';
  const SET_STATUS_NORMAL = 'normal';
  const SET_STATUS_DISABLED = 'disabled';

  export default {
    name: 'agentpay-check-set',
    props: {
      actionUrl: {
        type: String,
        required: true,
      },
    },
    data() {
      return {
        status: 'disabled',
      };
    },
    created() {
      this.getCheckSetStatus();
    },
    methods: {
      checkSetStatusChange() {
        if (this.status === SET_STATUS_DISABLED) {
          this.$confirm('确定要关闭审核吗？', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
          }).then(() => {
            this.setCheckSetStatus();
          }).catch(() => {
            this.status = 'normal';
          });
          return;
        }
        this.setCheckSetStatus();
      },
      getCheckSetStatus() {
        Vue.axios.get(this.actionUrl)
          .then((response) => {
            if (response.data.data.ismpCheck) {
              this.status = 'normal';
              return;
            }
            this.status = 'disabled';
          })
          .catch((error) => {
            console.log(error);
          });
      },
      setCheckSetStatus() {
        const params = {
          is_check: this.status === 'normal' ? 1 : 0,
        };
        Vue.axios.post(this.actionUrl, params)
          .then((response) => {
            this.status = this.status === 'normal' ? 'normal' : 'disabled';
          })
          .catch((error) => {
            this.$message({
              showClose: true,
              message: error.respMessage,
              type: 'error',
            });
            if (this.status === 'normal') {
              this.status = 'disabled';
              return;
            }
            if (this.status === 'disabled') {
              this.status = 'normal';
              return;
            }
          });
      },
    },
    computed: {
      ...mapState({
        appMeta: state => state.meta.appMeta,
        pageMeta: state => state.meta.pageMeta,
      }),
      switchContent() {
        const content = [
          {
            name: '启用',
            code: 'normal',
          },
          {
            name: '禁用',
            code: 'disabled',
          },
        ];
        return content.find((item) => {
          if (item.code === this.status) {
            return item;
          }
        }).name;
      },
      warningVisible() {
        return this.status === 'normal';
      },
    },
  }
</script>
<style>
  .agentpay-check-set {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 90%;
    height: 120px;
    border: 1px solid #eee;
    margin: 0 auto 20px auto;
  }
  .security-list {
    width: 60%;
  }
  .agentpay-check-set, .security-list {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 35px;
  }
  .security-list .title {
    font-weight: 700;
    font-style: normal;
    margin-bottom: 10px;
  }
  .el-icon-circle-check, .el-icon-warning {
    font-size: 22px;
    margin-right: 30px;
  }
  .check {
    color: #67c23a;
  }
  .warning {
    color: #fa5555;
  }
  .security-list-content {
    width: 80%;
  }
  .notice {
    color: #878d99;
    font-size: 13px;
  }
</style>
