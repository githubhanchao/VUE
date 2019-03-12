<template>
  <div class="single-pay-account-list">
    <div class="condition">
      <h2>账户列表</h2>
      <div>
        <el-select v-model="queryCond.bizType"
                   style="margin-right: 10px;"
                   placeholder="请选择">
          <el-option
            v-for="item in searchTypes"
            :key="item.code"
            :label="item.name"
            :value="item.code">
          </el-option>
        </el-select>
        <el-input v-model="queryCond.resultSearch" style="width: auto; margin-right: 10px;" @keydown.enter.native="responseData"></el-input>
        <el-button @click="responseData">搜索</el-button>
      </div>
      <div style="width: 200px;"></div>
    </div>
    <el-table :data="accountList"
              ref="multipleTable"
              v-loading="loading"
              height="400" style="width: 100%;">
      <el-table-column label="选择" width="60">
        <template slot-scope="scope">
          <el-radio v-model="radio" :label="scope.$index" @change="change"></el-radio>
        </template>
      </el-table-column>
      <el-table-column prop="cardName" label="收款方户名"></el-table-column>
      <el-table-column prop="cardNum" label="银行账号"></el-table-column>
      <el-table-column prop="bank" label="开户行">
        <template slot-scope="scope">
          {{ scope.row.bank }}
        </template>
      </el-table-column>
      <el-table-column prop="branchBank" label="分行"></el-table-column>
      <el-table-column prop="subbranchBank" label="支行"></el-table-column>
      <el-table-column prop="province" label="所在省市">
        <template slot-scope="scope">
          {{ scope.row.province }} {{ scope.row.city }}
        </template>
      </el-table-column>
      <el-table-column prop="accountType" label="账户类型" width="80">
        <template slot-scope="scope">
          {{ scope.row.accountType ? accountTypes.find(function(item){ if(item.code === scope.row.accountType) return item; }).name : '' }}
        </template>
      </el-table-column>
      <el-table-column label="操作" width="80">
        <template slot-scope="scope">
          <el-button size="mini" @click="deleteAccouunt(scope.$index)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="block">
      <div>
        <el-button type="primary" @click="select">确 定</el-button>
        <el-button style="margin-left: 30px;" @click="resetSelection">取消选中</el-button>
      </div>
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                     layout="total, sizes, prev, pager, next, jumper"
                     :page-sizes="[10,20,30,40]" :page-size="queryCond.page_size"
                     :current-page="queryCond.page" :total="count">
      </el-pagination>
    </div>
  </div>
</template>
<script>
  import BankName from '@/utils/getBankName';
  import AccountType from '@/utils/getAccountType';
  import SinglePaySearchType from '@/utils/getSinglePaySearchType';

  export default {
    data() {
      return {
        queryCond: {
          bizType: 'cardName',
          resultSearch: '',
          page_size: 20,
          page: 1,
        },
        searchTypes: SinglePaySearchType.allSinglePaySearchType(),
        accountTypes: AccountType.allAccountType(),
        selection: [],
        radio: '',
//        bankName: BankName.queryBanks(),
      };
    },
    props: {
      accountList: {
        type: Array,
        required: true,
      },
      count: {
        type: Number,
        required: true,
      },
      loading: {
        type: Boolean,
        required: true,
      },
      bankName: {
        type: Array,
        required: true,
      },
    },
    methods: {
      handleSizeChange(val) {
        this.queryCond.page_size = val;
        this.responseData();
      },
      handleCurrentChange(val) {
        this.queryCond.page = val;
        this.responseData();
      },
      deleteAccouunt(index) {
        this.$confirm('确定要删除该操作员吗？', '删除确认', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }).then(() => {
          this.$emit('deleteAccouuntEmit', index);
        }).catch((error) => {
          console.log(error);
        });
      },
      select() {
        const params = {
          card_name: this.selection.cardName,
          card_no: this.selection.cardNum,
          card_bank_name: this.selection.bank,
          bank_province: this.selection.province,
          bank_city: this.selection.city,
          bank_branch: this.selection.branchBank,
          bank_sub_branch: this.selection.subbranchBank,
          account_type: this.selection.accountType,
          certificate_type: this.selection.certificateType,
        };
        this.$emit('selectEmit', params);
      },
      change(value) {
        this.selection = this.accountList[value];
      },
      resetSelection() {
        this.radio = '';
      },
      responseData() {
        const params = {
          page: this.queryCond.page,
          page_size: this.queryCond.page_size,
          resultSearch: this.queryCond.resultSearch,
          bizType: this.queryCond.bizType,
        };
        this.$emit('accountListEmit', params);
      },
    },
  };
</script>
<style scoped>
  .condition {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 10px;
  }
  .block {
    display: flex;
    justify-content: space-between;
  }
</style>
<style>
  .single-pay-account-list .el-card__body {
    padding: 0;
  }
  .single-pay-account-list .el-radio__label {
    display: none;
  }
  .single-pay-account-list .el-radio__inner {
    width: 18px;
    height: 18px;
  }
</style>
