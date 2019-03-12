<template>
  <div id="edit-secret" class="edit-secret">
    <div id="edit-title" class="edit-title">{{ dialogTitle }}</div>
    <el-form ref="formModel" :model="formModel" :rules="rules" label-width="120px"
             label-position="left" onsubmit="return false;">
      <el-form-item label="密钥类别" v-if="serviceTypeVisible" prop="serviceType">
        <el-select placeholder="请选择" v-model="formModel.serviceType" @change="handleChange" :disabled="typeDisabled" :clearable="true">
          <el-option
            v-for="item in secretTypes"
            :key="item.code"
            :label="item.name"
            :value="item.code">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="密钥类型">
        <el-radio-group v-model="formModel.secretType" :disabled="secretTypeDisabled">
          <el-radio :label="labelSha">SHA</el-radio>

          <el-radio :label="labelMd5">MD5</el-radio>
          <!--<el-radio :label="labelRsa">RSA</el-radio>-->
        </el-radio-group>
      </el-form-item>
      <el-form-item label="密钥内容" prop="secretContent" v-if="secretContentShow">
        <el-input size="large" v-model="formModel.secretContent" type="textarea" :rows="inputCount"
                  :disabled="secretContentDisabled" :maxlength="secretMaxLength" resize="none"></el-input>
      </el-form-item>
      <el-form-item label="生效时间" prop="effectiveDate">
        <el-date-picker
          :disabled="startDateDisabled"
          class="date-picker"
          v-model="formModel.startDate"
          type="date"
          placeholder="选择日期"
          :picker-options="pickerOptions0">
        </el-date-picker>
        <span>--</span>
        <el-date-picker
          :disabled="endDateDisabled"
          class="date-picker"
          v-model="formModel.endDate"
          type="date"
          placeholder="选择日期"
          :picker-options="pickerOptions1">
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button size="large" type="primary" @click="confirmBtnClicked"
                   :loading="btnLoading" class="confirm-button">确 定</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import Vue from 'vue';
  import { mapState, mapActions } from 'vuex';
  import moment from 'moment';
  import randomString from 'random-string';
  import StringUtil from '@/utils/StringUtil';
  import UrlConfig from '@/utils/UrlConfig';

  export default {
    name: 'edit-secret',
    props: {
      mode: {
        type: Number,         // 1 表示增加，2 表示修改，3 表示查看
        required: true,
        default: 1,
      },
      secretData: {
        type: Object,
      },
      btnLoading: {
        type: Boolean,
        required: true,
        default: false,
      },
    },
    data () {
      const validateSecretContent = (rule, value, callback) => {
        if (!value) {
          callback(new Error('密钥内容不能为空'));
          return;
        }

        if (value.length < 64) {
          callback(new Error('密钥长度至少64位'));
          return;
        }

        if (value.length > 128) {
          callback(new Error('密钥长度不能大于128位'));
          return;
        }

        const contentReg = /^[A-Za-z0-9]+$/;
        if (!contentReg.test(value)) {
          callback(new Error('只能输入字母和数字'));
          return;
        }

        callback();
      };

      const validateSecretDateRange = (rule, value, callback) => {
        if (!this.formModel.startDate) {
          callback(new Error('开始时间不能为空'));
          return;
        }

        if (!this.formModel.endDate) {
          callback(new Error('结束时间不能为空'));
          return;
        }

        const days = moment(this.formModel.endDate).diff(moment(this.formModel.startDate), 'days');
        if (days < 0) {
          callback(new Error('结束时间不能早于开始时间'));
          return;
        }

        callback();
      };

      return {
        confirmLoading: false,
        secretTypeDisabled: false,
        secretContentDisabled: false,
        startDateDisabled: false,
        endDateDisabled: false,
        secretContentShow: true,
        typeDisabled: false,
        serviceTypeVisible: true,
        inputCount: 3,
        dialogTitle: '',
        labelMd5: 'MD5',
        labelSha: 'SHA',
        labelRsa: 'RSA',
        secretMaxLength: 250,
        formModel: {
          secretType: this.labelSha,
          secretContent: '',
          startDate: moment().subtract(1, 'days').format('YYYY-MM-DD'),
          endDate: moment().format('YYYY-MM-DD'),
          serviceType: '',
        },
        rules: {
          secretContent: [
            { validator: validateSecretContent, trigger: 'blur' },
          ],
          effectiveDate: [
            { validator: validateSecretDateRange, trigger: 'blur' },
          ],
          serviceType: [
            { required: true, message: '请选择密钥类别', trigger: 'blur' },
          ],
        },
        // 生效时间：默认为空，点击开始时间后，时间选择器“今天”之前禁用
        pickerOptions0: {
          disabledDate (time) {
            return time.getTime() < Date.now() - 8.64e7;
          },
        },
        // 失效时间：默认为空，点击开始时间后，时间选择器“今天”之前禁用
        pickerOptions1: {
          disabledDate (time) {
            return time.getTime() < Date.now() - 8.64e7;
          },
        },
      };
    },
    created () {
      this.componentMode();
      this.clearFormData();

      if ((this.mode === 2 || this.mode === 3) && this.secretData !== null) {
        this.formModel.secretType = this.secretData.keyType;

        this.formModel.secretContent = this.mode === 2 ? '********' : StringUtil.userSensitiveDataDecode(this.secretData.keyContent);
        this.formModel.startDate = moment(this.secretData.effectiveStartDate).format('YYYY-MM-DD');
        this.formModel.endDate = moment(this.secretData.effectiveEndDate).format('YYYY-MM-DD');
        this.formModel.serviceType = this.secretData.serviceType;
      } else if (this.mode === 1) {
        this.formModel.secretContent = randomString({ length: 64 });
      }
    },
    computed: {
      secretTypes () {
        return this.$store.state.meta.pageMeta.ui.secretTypes;
      },
    },
    methods: {
      ...mapActions([]),

      confirmBtnClicked () {
        this.$refs['formModel'].validate((valid) => {
          if (valid) {
            if (this.mode === 1) {
              const condParams = {
                key_type: this.formModel.secretType,
                key_content: this.formModel.secretContent,
                effective_startdate: moment(this.formModel.startDate).format('YYYY-MM-DD'),
                effective_enddate: moment(this.formModel.endDate).format('YYYY-MM-DD'),
                service_type: this.formModel.serviceType,
              };

              this.$emit('confirmEmit', condParams);
            }

            if (this.mode === 2) {
              this.secretData.effective_startdate = moment(this.formModel.startDate).format('YYYY-MM-DD');
              this.secretData.effective_enddate = moment(this.formModel.endDate).format('YYYY-MM-DD');
              this.secretData.service_type = this.formModel.serviceType;
              this.$emit('confirmEmit', this.secretData);
            }

            if (this.mode === 3) {
              this.$emit('confirmEmit');
            }
          }
        });
      },

      componentMode () {
        switch (this.mode) {
          case 2:
            this.modifyMode();
            break;
          case 3:
            this.viewMode();
            break;
          default:
            this.addMode();
            break;
        }
      },

      // 新增模式
      addMode () {
        this.secretTypeDisabled = false;
        this.secretContentDisabled = false;
        this.startDateDisabled = false;
        this.endDateDisabled = false;
        this.typeDisabled = false;
        this.dialogTitle = '新增密钥';
      },

      // 修改模式
      modifyMode () {
        this.secretTypeDisabled = true;
        this.secretContentDisabled = true;
        this.startDateDisabled = false;
        this.endDateDisabled = false;
        this.secretContentShow = false;
        this.dialogTitle = '修改密钥生效时间';
        this.serviceTypeVisible = false;
      },

      // 查看模式
      viewMode () {
        this.secretTypeDisabled = true;
        this.secretContentDisabled = true;
        this.startDateDisabled = true;
        this.endDateDisabled = true;
        this.typeDisabled = true;
        this.dialogTitle = '查看密钥';
      },

      clearFormData () {
        this.formModel.secretType = this.labelSha;
        this.formModel.secretContent = '';
        this.formModel.startDate = '';
        this.formModel.endDate = '';
      },
      // 切换事件
      handleChange (value) {
        const items = [];
        Vue.axios.get(UrlConfig.SECRET_LIST_PATH)
          .then((response) => {
            if (response) {
              response.data.forEach((item) => {

                if (item.serviceType === '支付密钥,代付密钥') {
                  this.type = item.serviceType === '支付密钥,代付密钥' ? 'PAYMENT' : 'AGENTPAY';
                } else {
                  this.type = item.serviceType === '支付密钥' ? 'PAYMENT' : 'AGENTPAY';
                }
                if (this.type === value) {
                  items.push(item);
                }
                this.endData = item.effectiveEndDate;
              });
              this.items = items.sort(this.sortBy('id', false));
              this.formModel.startDate = moment(this.items[0].effectiveEndDate).add(1, 'd');
              this.formModel.endDate = moment(this.formModel.startDate).add(6, 'M');
            }
          });
      },
      // 排序方法
      sortBy (attr, rev) {
        if (rev) {
          rev = 1;
        } else {
          rev = (rev) ? 1 : -1;
        }
        return function (a, b) {
          a = a[attr];
          b = b[attr];
          if (a < b) {
            return rev * -1;
          }
          if (a > b) {
            return rev * 1;
          }
          return 0;
        };
      },

    },
    components: {

    },
  };
</script>
<style scoped>
.edit-title {
  font-size: 20px;
  margin-bottom: 30px;
}

.confirm-button {
  width: 100px;
  height: 42px;
  box-sizing: border-box;
}

.date-picker {
  width: 140px;
}
</style>
