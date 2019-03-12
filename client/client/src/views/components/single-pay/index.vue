<template>
  <el-card id="single-pay-card" class="single-pay-card">
    <el-form id="single-pay-form" ref="singlePayFormModel" :model="formModel" :rules="rules" label-width="100px" onsubmit="return false;">
      <el-row :gutter="40" type="flex" justify="center">
        <el-col :lg="12" :md="12" :sm="22" :xs="22">
          <el-form-item label="收款方户名" prop="card_name" class="card-name">
            <el-autocomplete
            class="write-card-name"
            popper-class="my-autocomplete"
            v-model="formModel.card_name"
            :fetch-suggestions="querySearch"
            placeholder="对方账号"
            :trigger-on-focus="false"
            @blur="accountSearch"
            @select="handleSelect">
            <template slot-scope="scope">
              <div class="name">{{ scope.item }}</div>
            </template>
          </el-autocomplete><el-button v-if="batchVisible" @click="chose" type="success" class="chose-from-list" plain>从列表选择</el-button>
          </el-form-item>
          <el-form-item label="银行账号" prop="card_no">
            <el-input v-model="formModel.card_no" @keyup.native="cardNoFormat(formModel.card_no)" class="amount"></el-input>
          </el-form-item>
          <el-form-item label="开户行" prop="card_bank_name">
            <el-select v-model="formModel.card_bank_name"
                       style="width: 100%;"
                       placeholder="请选择">
              <el-option
                v-for="item in bankName"
                :key="item.code"
                :label="item.name"
                :value="item.code">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="分行" prop="bank_branch">
            <el-input v-model="formModel.bank_branch"></el-input>
          </el-form-item>
          <el-form-item label="支行" prop="bank_sub_branch">
            <el-input v-model="formModel.bank_sub_branch"></el-input>
          </el-form-item>
          <el-form-item label="账户类型" prop="account_type">
            <el-select v-model="formModel.account_type"
                       style="width: 100%;"
                       placeholder="请选择">
              <el-option
                v-for="item in accountTypes"
                :key="item.code"
                :label="item.name"
                :value="item.code">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="所在地" prop="bank_prov" class="address">
            <!--<el-input v-model="formModel.bank_province" placeholder="省" class="province"></el-input>-->
            <!--<el-input v-model="formModel.bank_city" placeholder="市" class="city"></el-input>-->
            <el-select v-model="formModel.bank_province" @change="handleChange" placeholder="请选择省" class="province">
              <el-option
                v-for="item in province"
                :key="item"
                :label="item"
                :value="item">
              </el-option>
            </el-select>
            <el-select v-model="formModel.bank_city" placeholder="请选择市" class="city">
              <el-option
                v-for="item in city"
                :key="item"
                :label="item"
                :value="item">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :lg="12" :md="12" :sm="22" :xs="22">
            <el-form-item label="币种">
              <el-select v-model="formModel.comment"
                         disabled
                         style="width: 100%;"
                         placeholder="CNY">
                <el-option
                  v-for="item in commentTypes"
                  :key="item.code"
                  :label="item.name"
                  :value="item.code">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="付款金额" prop="amount" class="money">
              <el-input v-model="formModel.amount" placeholder="单位: 元" class="amount"></el-input>
            </el-form-item>
            <el-form-item label="商户订单号">
              <el-input v-model="formModel.order_no" :disabled="order_no_editable"></el-input>
            </el-form-item>
            <el-form-item label="手机号" prop="mobile_phone_no">
              <el-input v-model="formModel.mobile_phone_no" placeholder="选填"></el-input>
            </el-form-item>
            <el-form-item label="证件类型">
              <el-select v-model="formModel.certificate_type"
                         style="width: 100%;"
                         placeholder="请选择">
                <el-option
                  v-for="item in certificateType"
                  :key="item.code"
                  :label="item.name"
                  :value="item.code">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="证件号">
              <el-input v-model="formModel.certificate_no" placeholder="选填"></el-input>
            </el-form-item>
            <el-form-item label="备注" prop="remark">
              <el-input v-model="formModel.remark" placeholder="选填（最多20个字符）"></el-input>
            </el-form-item>
          </el-col>
      </el-row>
    </el-form>
    <el-row :gutter="40" type="flex" justify="center">
      <el-col :lg="12" :md="12" :sm="22" :xs="22">
        <div class="operate">
          <el-button style="margin-left: 100px;" size="large" class="single_pay_submit_btn" type="primary"
                     @click="submitBtnClicked" v-if="batchVisible">提 交</el-button>
          <el-button style="margin-left: 30px;" size="large" class="single_pay_submit_btn"
                     @click="resetClicked" v-if="batchVisible">重 置</el-button>
          <el-button style="margin-left: 100px;" size="large" class="single_pay_submit_btn" type="primary"
                     @click="saveBtnClicked" v-if="!batchVisible">保 存</el-button>
          <el-button size="large" class="single_pay_submit_btn"
                     @click="cancel" v-if="!batchVisible">取 消</el-button>
        </div>
      </el-col>
      <el-col :lg="12" :md="12" :sm="22" :xs="22"></el-col>
    </el-row>
  </el-card>
</template>

<script>
  import AccountType from '@/utils/getAccountType';
  import CertificateType from '@/utils/getCertificateType';

  export default {
    name: 'single-pay-card',
    props: {
      dataSource: {
        type: Object,
      },
      accountLists: {
        type: Array,
      },
      bankName: {
        type: Array,
        required: true,
      },
      batchVisible: {
        type: Boolean,
        default: true,
      },
      province: {
        type: Array,
        requied: true,
      },
      city: {
        type: Array,
        requied: true,
      },
    },
    data() {
      const validateAmount = (rule, value, callback) => {
        if (!value) {
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
        if (value <= 0.01) {
          callback(new Error('付款金额不能小于0.01元'));
          return;
        }
        if (value > 50000) {
          callback(new Error('付款金额不能大于50000元'));
          return;
        }
        callback();
      };
      const validateCardNo = (rule, value, callback) => {
        if (value.startsWith('0')) {
          callback(new Error('银行卡号首位不能为0'));
          return;
        }
        value = value.replace(/\s/g, '');
        if (!/^\d{8,32}$/.test(value)) {
          callback(new Error('请输入正确的银行卡号'));
          return;
        }
        callback();
      };
      const validateCardName = (rule, value, callback) => {
        if (!/^[\u4e00-\u9fa5]+(·[\u4e00-\u9fa5]+)*$/.test(value) &&
          !/^[\u4e00-\u9fa5]+(\.[\u4e00-\u9fa5]+)*$/.test(value)) {
          callback(new Error('仅限中文姓名'));
          return;
        }
        callback();
      };
      const validateAddress = (rule, value, callback) => {
        if (this.formModel.bank_province === '') {
          callback(new Error('请输入开户银行所在省'));
          return;
        }
        if (this.formModel.bank_city === '') {
          callback(new Error('请输入开户银行所在市'));
          return;
        }
        callback();
      };
      const validateOrderNo = (rule, value, callback) => {
        if (!/^[a-zA-Z0-9]+$/.test(value)) {
          callback(new Error('订单号只能为字母和数字'));
          return;
        }
        callback();
      };
      const validateRemark = (rule, value, callback) => {
        if (value && value.length > 20) {
          callback(new Error('备注最多20个字符'));
          return;
        }
        callback();
      };
      const validatePhoneNo = (rule, value, callback) => {
        if (value && value.length !== 11 && !(/^((13|14|15|17|18)[0-9]{1}\d{8})$/.test())) {
          callback(new Error('手机号码输入有误'));
          return;
        }
        callback();
      };
      return {
        formModel: {
          card_name: '',           // 持卡人名称
          card_no: '',             // 持卡人卡号
          card_bank_name: '',      // 持卡人开户银行
          bank_province: '',       // 开户银行所在省
          bank_city: '',           // 开户银行所在市
          bank_branch: '',         // 开户银行分行
          bank_sub_branch: '',     // 开户银行支行
          account_type: '',        // 账户类型
          certificate_type: '',    // 证件类型
          certificate_no: '',      // 证件号
          mobile_phone_no: '',     // 手机号
          order_no: '',            // 商户订单号
          remark: '',              // 备注
          amount: '',              // 金额(元)
        },
        selectedOptions: '',
        // 账户类型
        accountTypes: AccountType.allAccountType(),
        // 证件类型
        certificateType: CertificateType.allCertificateTypes(),
        commentTypes: {
          code: 'CNY',
          name: 'CNY',
        },
        order_no_editable: false,
        rules: {
          card_name: [
            { required: true, message: '请输入收款方户名', trigger: 'blur' },
            { validator: validateCardName, trigger: 'blur' },
          ],
          card_no: [
            { required: true, message: '请输入银行账号', trigger: 'blur' },
            { validator: validateCardNo, trigger: 'blur' },
          ],
          card_bank_name: [
            { required: true, message: '请输入开户行', trigger: 'blur' },
          ],
          bank_branch: [
            { required: true, message: '请输入分行', trigger: 'blur' },
          ],
          bank_prov: [
            { validator: validateAddress, trigger: 'blur' },
          ],
          bank_sub_branch: [
            { required: true, message: '请输入支行', trigger: 'blur' },
          ],
          account_type: [
            { required: true, message: '请输入账户类型', trigger: 'blur' },
          ],
          bank_address: [
            { required: true, message: '请输入所在地', trigger: 'blur' },
          ],
          amount: [
//            { required: true, message: '请输入付款金额', trigger: 'blur' },
            { validator: validateAmount, trigger: 'blur' },
          ],
          order_no: [
            { validator: validateOrderNo, trigger: 'blur' },
          ],
          remark: [
            { validator: validateRemark, trigger: 'blur' },
          ],
          mobile_phone_no: [
            { validator: validatePhoneNo, trigger: 'blur' },
          ],
        },
      };
    },
    created() {
      this.formModel.card_name = this.dataSource.card_name ? this.dataSource.card_name : '';
      this.formModel.card_no = this.dataSource.card_no ? this.dataSource.card_no : '';
      this.formModel.card_bank_name = this.dataSource.card_bank_name ? this.dataSource.card_bank_name : '';
      this.formModel.bank_branch = this.dataSource.bank_branch ? this.dataSource.bank_branch : '';
      this.formModel.bank_sub_branch = this.dataSource.bank_sub_branch ? this.dataSource.bank_sub_branch : '';
      this.formModel.account_type = this.dataSource.account_type ? this.dataSource.account_type : '';
      this.formModel.bank_province = this.dataSource.bank_province ? this.dataSource.bank_province : '';
      this.formModel.bank_city = this.dataSource.bank_city ? this.dataSource.bank_city : '';
      this.formModel.comment = this.dataSource.comment ? this.dataSource.comment : '';
      this.formModel.amount = this.dataSource.amount ? this.dataSource.amount : '';
      this.formModel.order_no = this.dataSource.order_no ? this.dataSource.order_no : '';
      this.formModel.mobile_phone_no = this.dataSource.mobile_phone_no ? this.dataSource.mobile_phone_no : '';
      this.formModel.certificate_type = this.dataSource.certificate_type ? this.dataSource.certificate_type : '';
      this.formModel.certificate_no = this.dataSource.certificate_no ? this.dataSource.certificate_no : '';
      this.formModel.remark = this.dataSource.remark ? this.dataSource.remark : '';
      if (this.$route.query && this.$route.query.batchId
        && this.$route.query.batchId !== '[object Object]') {
        this.order_no_editable = true;
      }
    },
    methods: {
      submitBtnClicked() {
        this.$refs['singlePayFormModel'].validate((valid) => {
          if (valid) {
            this.$emit('collectionEmit', this.formModel);
          }
        });
      },
      resetClicked() {
        this.formModel = {
          card_name: '',
          card_no: '',
          card_bank_name: '',
          bank_province: '',
          bank_city: '',
          bank_branch: '',
          bank_sub_branch: '',
          account_type: '',
          certificate_type: '',
          certificate_no: '',
          mobile_phone_no: '',
          order_no: '',
          remark: '',
          amount: '',
        };
      },
      handleSelect(card_name) {
        this.changeFormModel(card_name);
      },
      accountSearch() {
        this.changeFormModel(this.formModel.card_name);
      },
      changeFormModel(card_name) {
        this.formModel.card_no = '';
        this.formModel.card_bank_name = '';
        this.formModel.bank_province = '';
        this.formModel.bank_city = '';
        this.formModel.bank_branch = '';
        this.formModel.bank_sub_branch = '';
        this.formModel.account_type = '';
        if (!card_name) {
          return;
        }
        for (let i = 0; i < this.accountLists.length; i++) {
          const result = this.accountLists[i];
          if (result.cardName === card_name) {
            this.formModel.card_name = result.cardName;
            this.formModel.card_no = result.cardNum;
            this.formModel.card_bank_name = result.bank;
            this.formModel.bank_province = result.province;
            this.formModel.bank_city = result.city;
            this.formModel.bank_branch = result.branchBank;
            this.formModel.bank_sub_branch = result.subbranchBank;
            this.formModel.account_type = result.accountType;
            return;
          }
        }
      },
      querySearch(queryString, cb) {
        let cardNameList = [];
        let results = this.accountLists.filter((value) => {
          if (value.cardName.indexOf(queryString) > -1) {
            return value;
          }
        });
        results.forEach(value => cardNameList.push(value.cardName));
        cb(cardNameList);
      },
      cancel() {
        const params = {
          batchId: this.$route.query.batchId.batchId,
          batchFilename: this.$route.query.batchId.batchFilename,
        };
        this.$router.push({ path: '/home/batch-upload-detail', query: params });
      },
      handleChange(value) {
        this.formModel.bank_city = '';
        this.$emit('provinceChange', value);
      },
      saveBtnClicked() {
        this.$refs['singlePayFormModel'].validate((valid) => {
          if (valid) {
            let card_bank_name = this.bankName.find((item) => {
              if (item.code === this.formModel.card_bank_name) {
                return item;
              }
            });
            this.formModel.card_bank_name = card_bank_name ? card_bank_name.name : this.formModel.card_bank_name;
            let account_type = this.accountTypes.find((item) => {
              if (item.name === this.formModel.account_type) {
                return item;
              }
            });
            this.formModel.account_type = account_type ? account_type.code : this.formModel.account_type;
            this.$emit('saveBatchInfoEmit', this.formModel);
          }
        });
      },
      cardNoFormat(value) {
        let v = value;
        if (/\S{5}/.test(v)) {
          value = v.replace(/\s/g, '').replace(/(\d{4})(?=\d)/g, "$1 ");
        }
        this.formModel.card_no = value;
      },
      resetForm() {
        this.$refs['singlePayFormModel'].resetFields();
      },
      chose() {
        this.$emit('choseEmit');
      },
    },
    watch: {
      "$route": function (to, from) {
        if (from.path === '/home/batch-agentpay-edit') {
          this.formModel = {};
          this.batchVisible = true;
        }
      },
    },
  };
</script>
<style src="./index.css"></style>
