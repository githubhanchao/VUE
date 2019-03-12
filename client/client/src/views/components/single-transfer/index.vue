
<template>
  <el-card id="single-transfer-card" class="single-transfer-card">
    <div class="single-transfer-content">
      <el-form id="single-transfer-form" class="single-transfer-form" ref="singleTransferFormModel" :model="formModel" :rules="rules" label-width="100px" onsubmit="return false;">
        <el-form-item label="对方账号" prop="to_account">
          <el-autocomplete
            popper-class="my-autocomplete"
            v-model="formModel.to_account"
            :fetch-suggestions="querySearch"
            placeholder="对方账号"
            :trigger-on-focus="false"
            @blur="accountSearch"
            @select="handleSelect">
            <template slot-scope="scope">
              <div class="name">{{ scope.item }}</div>
            </template>
          </el-autocomplete>
        </el-form-item>
        <el-form-item label="对方姓名">
          <el-input v-model="dataSource.name" disabled></el-input>
        </el-form-item>
        <el-form-item label="对方公司">
          <el-input v-model="dataSource.company" disabled></el-input>
        </el-form-item>
        <el-form-item label="付款金额" prop="amount">
          <el-input v-model="formModel.amount" placeholder="单位: 元" class="amount"></el-input>
        </el-form-item>
        <el-form-item label="付款理由" prop="subject">
          <el-input v-model="formModel.subject" @keydown.enter.native="submitBtnClicked" placeholder="付款理由"></el-input>
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="formModel.comment" placeholder="选填..." :maxlength="64"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button size="large" class="single_transfer_submit_btn" id="submitBtn" type="primary"
                     @click="submitBtnClicked">提 交</el-button>
          <el-button size="large" class="single_transfer_submit_btn" @click="cancel()" >取 消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </el-card>
</template>

<script>

  export default {
    name: 'single-transfer-card',
    props: {
      dataSource: {
        type: Object,
        required: true,
      },
      accountLists: {
        type: Array,
        required: true,
      },
    },
    data() {
      const validateAccount = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入对方账号'));
          return;
        }
        if (!/^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/.test(value)) {
          callback(new Error('请输入正确的对方账号'));
          return;
        }
        callback();
      };
      const validateAmount = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入付款金额'));
          return;
        }
        if (!/^\d+(\.\d+)?$/.test(value)) {
          callback(new Error('付款金额只能为数字'));
          return;
        }
        if (!/^\d+(?:\.\d{1,2})?$/.test(value)) {
          callback(new Error('付款金额最多有两位小数'));
          return;
        }
        if (value < 0.1) {
          callback(new Error('付款金额不能小于0.1元'));
          return;
        }
        callback();
      };
      return {
        formModel: {
          to_account: '',
          amount: '',
          subject: '',
          comment: '',
        },
        rules: {
          to_account: [
            { required: true, message: '请输入对方账号', trigger: 'blur' },
            { validator: validateAccount, trigger: 'blur' },
          ],
          amount: [
            { required: true, message: '请输入付款金额', trigger: 'blur' },
            { validator: validateAmount, trigger: 'blur' },
          ],
          subject: [
            { required: true, message: '请输入付款理由', trigger: 'blur' },
          ],
        },
      };
    },
    computed: {

    },
    methods: {
      cancel() {
        this.$router.push('/home/transfer-trade');
      },
      submitBtnClicked() {
        this.$refs['singleTransferFormModel'].validate((valid) => {
          if (valid) {
            this.$emit('submitBtnClickedEmit', this.formModel);
          }
        });
      },
      querySearch(queryString, cb) {
        let restaurants = this.accountLists;
        let arr = restaurants.filter((value) => {
          return value.indexOf(queryString.toLowerCase()) === 0;
        });
        let results = queryString ? arr : restaurants;
        cb(results);
      },
      createFilter(queryString) {
        return (restaurant) => {
          return (restaurant.value.indexOf(queryString.toLowerCase()) === 0);
        };
      },
      handleSelect(value) {
        this.formModel.to_account = value;
        this.$emit('accountSearchEmit', this.formModel.to_account);
      },
      accountSearch() {
        this.$refs['singleTransferFormModel'].validateField('to_account', (valid) => {
          if (!valid) {
            this.$emit('accountSearchEmit', this.formModel.to_account);
          }
        });
      },
    },
  };
</script>

<style>

  .single-transfer-card {
    width: 100%;
    height: auto;
    margin: 0 auto;
    background-color: white;
  }
  .single-transfer-card .el-autocomplete {
    width: 100%;
  }
  .single_transfer_submit_btn {
    width: 100px;
  }

  .single-transfer-form {
    width: 50%;
    min-width: 400px;
    max-width: 600px;
  }

  .single-transfer-card .el-form {
    padding: 40px 0px;
  }
  .single-transfer-card .el-form-item {
    margin-bottom: 20px;
  }
  .single-transfer-card .el-form-item__content {
    margin-left: 120px!important;
  }
  .my-autocomplete li {
    line-height: normal;
    padding: 7px;
  }
  .my-autocomplete li .name {
    text-overflow: ellipsis;
    overflow: hidden;
  }
  .amount input {
    font-weight: 700;
  }
  .single-transfer-content {
    display: flex;
    justify-content: center;
  }
</style>
