<template>
  <div v-cloak>
    <div class="layui-row bgc">
      <div class="layui-row filters" lay-filter="filters">
        <div class="filters-col ">
          <div class="filters-one" name="patentId" v-if="filters.patentId==1">
            <label for="">Patent ID</label>
            <input type="text" class="layui-input" id="patentId">
          </div>
          <div class="filters-one" name="applicationNo" v-if="filters.applicationNo==1">
            <label for="">Application NO.</label>
            <input type="text" class="layui-input" id="applicationNo">
          </div>
          <div class="filters-one" name="lawFirmNo" v-if="filters.lawFirmNo==1">
            <label for="">Law Firm No.</label>
            <input type="text" class="layui-input" id="lawFirmNo">
          </div>
          <div class="filters-one" name="patentNo" v-if="filters.patentNo==1">
            <label for="">Patent NO.</label>
            <input type="text" class="layui-input" id="patentNo">
          </div>
          <div class="filters-one" name="patentTitle" v-if="filters.patentTitle==1">
            <label for="">Patent Title</label>
            <input type="text" class="layui-input" id="patentTitle">
          </div>
          <div class="filters-one" name="applicationDate" v-if="filters.applicationDate==1">
            <label for="">Application Date</label>
            <input type="text" id="applicationDate" autocomplete="off" class="layui-input">
          </div>
          <div class="filters-one" name="inventor" v-if="filters.inventor==1">
            <label for="">Inventor</label>
            <input type="text" class="layui-input" id="inventor">
          </div>
          <div class="filters-one" name="applicant" v-if="filters.applicant==1">
            <label for="">Applicant</label>
            <select name="" class="layui-input" id="applicant">
              <option value="">All</option>
              <template v-for="item in applicantOptions">
                <option :value="item.id">{{item.name}}</option>
              </template>
            </select>
          </div>
          <div class="filters-one" name="type" v-if="filters.applicationType==1">
            <label for="">Application Type</label>
            <select name="" class="layui-input" id="applicationType">
              <option value="">All</option>
              <template v-for="item in applicationTypeOptions">
                <option :value="item.key_id">{{item.key_value}}</option>
              </template>

            </select>
          </div>
          <div class="filters-one" name="patentIssueDate" v-if="filters.patentIssueDate==1">
            <label for="">Patent Issue Date</label>
            <input type="text" id="patentIssueDate" autocomplete="off" class="layui-input">
          </div>
          <div class="filters-one" name="relatedTech" v-if="filters.relatedTech==1">
            <label for="">Related Tech</label>
            <input type="text" class="layui-input" id="relatedTech">
          </div>
          <div class="filters-one" name="country" v-if="filters.country==1">
            <label for="">Country</label>
            <select name="" class="layui-input" id="country">
              <option value="">All</option>
              <template v-for="item in countryOptions">
                <option :value="item.id">{{item.name}}</option>
              </template>
            </select>
          </div>
          <div class="filters-one" name="lawFirm" v-if="filters.lawFirm==1">
            <label for="">Law Firm</label>
            <select name="" class="layui-input" id="lawFirm">
              <option value="">All</option>
              <template v-for="item in lawFirmOptions">
                <option :value="item.id">{{item.name}}</option>
              </template>
            </select>
          </div>
          <div class="filters-one" name="relatedFeature" v-if="filters.relatedFeature==1">
            <label for="">Related Feature</label>
            <input type="text" class="layui-input" id="relatedFeature">
          </div>
          <div class="filters-one" name="status" v-if="filters.status==1">
            <label for="">Status</label>
            <select name="" class="layui-input" id="status" @change="getConcreteStatusOptions()">
              <option value=" ">All</option>
              <template v-for="item in statusOptions">
                <option :value="item.key_id">{{item.key_value}}</option>
              </template>

            </select>
          </div>
          <!--<div class="filters-one" name="manager" v-if="filters.manager==1">-->
          <!--<label for="">Manager</label>-->
          <!--<input type="text" class="layui-input" id="manager">-->
          <!--</div>-->
          <div class="filters-one" name="currentPatentee" v-if="filters.currentPatentee==1">
            <label for="">Current Patentee</label>
            <select name="" class="layui-input" id="currentPatentee">
              <option value="">All</option>
              <template v-for="item in currentPatenteeOptions">
                <option :value="item.id">{{item.name}}</option>
              </template>
            </select>
          </div>
          <div class="filters-one" name="concreteStatus" v-if="filters.concreteStatus==1">
            <label for="">Concrete Status</label>
            <select name="" class="layui-input" id="concreteStatus">
              <option value="">All</option>
              <template v-for="item in concreteStatusOptions">
                <option :value="item.key_id">{{item.key_value}}</option>
              </template>
            </select>
          </div>
        </div>

        <div class="button-col right" id="button-col">
          <div class="customizediv">
            <button class="layui-btn layui-btn-primary layui-btn-xs all-button customize" @click="showFilter()">
              Customize
            </button>
          </div>
          <div class="">
            <button class="layui-btn layui-btn-normal layui-btn-xs all-button search" @click="filterSearch()">
              Search
            </button>
          </div>
          <!--&lt;!&ndash;<div class="filters-one">&ndash;&gt;-->
          <!--<button class="layui-btn layui-btn-primary layui-btn-xs all-button customize" @click="showFilter()">-->
          <!--Customize-->
          <!--</button>-->
          <!--&lt;!&ndash;</div>&ndash;&gt;-->
          <!--&lt;!&ndash;<div class="filters-one">&ndash;&gt;-->
          <!--<button class="layui-btn layui-btn-normal layui-btn-xs all-button search" @click="filterSearch()">-->
          <!--Search-->
          <!--</button>-->
          <!--&lt;!&ndash;</div>&ndash;&gt;-->
        </div>
      </div>

      <div class="layui-row table-col">
        <div class="logo-name">
          Patent
        </div>
        <div class="button-col-right" v-if="canAdd">
          <button class="layui-btn layui-btn-normal layui-btn-xs all-button" @click="newPatent()">+
            Patent
          </button>
        </div>

        <table class="layui-table table" lay-skin="nob" lay-even>
          <colgroup></colgroup>
          <thead>
          <tr>
            <!--<th style="width: 30px"></th>-->
            <th name="patentId" v-if="filters.patentId ==1" class="content-ellipsis">Patent ID</th>
            <th name="patentTitle" v-if="filters.patentTitle==1" class="content-ellipsis">Patent Title</th>
            <th name="applicationType" v-if="filters.applicationType==1" class="table-col-width">Application Type</th>
            <th name="country" v-if="filters.country==1" class="table-col-width">Country</th>
            <th name="applicant" v-if="filters.applicant==1" class="content-ellipsis">Applicant</th>
            <th name="applicationNo" v-if="filters.applicationNo==1" class="table-col-width">Application No.</th>
            <th name="applicationDate" v-if="filters.applicationDate==1" class="table-col-width">Application Date</th>
            <th name="patentIssueDate" v-if="filters.patentIssueDate==1" class="table-col-width">Patent Issue Date</th>
            <th name="lawFirm" v-if="filters.lawFirm==1" class="content-ellipsis">Law Firm</th>
            <!--<th name="manager" v-if="filters.manager==1">Manager</th>-->
            <th name="inventor" v-if="filters.inventor==1" class="content-ellipsis">Inventor(s)</th>
            <th name="relatedTech" v-if="filters.relatedTech==1" class="table-col-width">Related Tech</th>
            <th name="relatedFeature" v-if="filters.relatedFeature==1" class="table-col-width">Related Feature</th>
            <th name="currentPatentee" v-if="filters.currentPatentee==1" class="content-ellipsis">Current Patentee</th>
            <th name="lawFirmNo" v-if="filters.lawFirmNo==1" class="table-col-width">Law Firm No.</th>
            <th name="patentNo" v-if="filters.patentNo==1" class="table-col-width">Patent No.</th>
            <th name="status" v-if="filters.status==1" class="table-col-width">Status</th>
            <th name="concreteStatus" v-if="filters.concreteStatus==1" class="table-col-width">Concrete Status</th>
            <th class="table-col-width">Operate</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(item,index) in patentList">
            <!--<td style="width: 30px">{{ index+1+(curPage-1)*10 }}</td>-->
            <td name="patentId" class="content-ellipsis" v-if="filters.patentId==1"><a href="javascript:;"
                                                                                       @click="patentDetail(item.id)">{{item.full_serial}}</a>
            </td>
            <td name="patentTitle" v-if="filters.patentTitle==1" class="content-ellipsis">{{item.title}}</td>
            <td name="applicationType" v-if="filters.applicationType==1" class="table-col-width">{{item.application_type}}</td>
            <td name="country" v-if="filters.country==1" class="table-col-width">{{item.application_country}}</td>
            <td name="applicant" v-if="filters.applicant==1" class="content-ellipsis">{{item.applicant}}</td>
            <td name="applicationNo" v-if="filters.applicationNo==1" class="table-col-width">{{item.application_no}}</td>
            <td name="applicationDate" v-if="filters.applicationDate==1" class="table-col-width">{{item.application_date}}</td>
            <td name="patentIssueDate" v-if="filters.patentIssueDate==1" class="table-col-width">{{item.issue_date}}</td>
            <td name="lawFirm" v-if="filters.lawFirm==1" class="content-ellipsis">{{item.law_firm}}</td>
            <!--<td name="manager" v-if="filters.manager==1">{{}}</td>-->
            <td name="inventor" class="content-ellipsis" v-if="filters.inventor==1">
              {{ item.first_inventor.real_name }}
              <template v-for="inv_one in item.inventor_list">
                ,{{inv_one.real_name}}
              </template>
            </td>
            <td name="relatedTech" v-if="filters.relatedTech==1" class="table-col-width">{{item.related_technology}}</td>
            <td name="relatedFeature" v-if="filters.relatedFeature==1" class="table-col-width">{{item.related_feature}}</td>
            <td name="currentPatentee" v-if="filters.currentPatentee==1" class="content-ellipsis">
              {{item.current_patentee}}
            </td>
            <td name="lawFirmNo" v-if="filters.lawFirmNo==1" class="table-col-width">{{item.patent_law_firm_no}}</td>
            <td name="patentNo" v-if="filters.patentNo==1" class="table-col-width">{{item.patent_no}}</td>
            <td name="status" v-if="filters.status==1" class="table-col-width">{{item.status_value}}</td>
            <td name="concreteStatus" v-if="filters.concreteStatus==1" class="table-col-width">{{item.concrete_status_value}}</td>
            <td class="table-col-width"><i class="layui-icon layui-icon-delete" @click="deleteCord(item.id)"
                   style="color: #990000;cursor: pointer"></i></td>
          </tr>

          </tbody>
        </table>

        <div class="table-foot">
          <button class="layui-btn layui-btn-primary layui-btn-xs all-button customize" id="importPatents"><a
            href="#">Import</a></button>
          <button class="layui-btn layui-btn-primary layui-btn-xs all-button customize"><a
            :href="host + '/patent/patent/download_excel' + '?' + exportParams()">Export</a></button>
          <span>Total: {{total}} Patents</span>
          <div class="page-bar">

            <span v-if="curPage>1"><a href="javascript:;" v-on:click="curPage--"> < </a></span>
            <span v-if="curPage==1"><a href="javascript:;" class="banclick"> < </a></span>
            <span v-for="index in indexs" :class="{ 'active': curPage == index}">
                            <a href="javascript:;" @click="btnClick(index)">{{ index }}</a>
                        </span>
            <span v-if="curPage!=allPage && allPage != 0"><a href="javascript:;" @click="curPage++"> > </a></span>
            <span v-if="curPage == allPage || allPage == 0"><a href="javascript:;" class="banclick"> > </a></span>

          </div>
        </div>
      </div>
    </div>
    <div id="items" class="hide">
      <div class="radio-box">
        <div class="radio-box-one">
          <input type="checkbox" name="patentId" checked v-model="filters.patentId">
          <label>Patent ID</label>
        </div>
        <div class="radio-box-one">
          <input type="checkbox" name="patentTitle" checked v-model="filters.patentTitle">
          <label for="">Patent Title</label>
        </div>
        <div class="radio-box-one">
          <input type="checkbox" name="applicationType" checked v-model="filters.applicationType">
          <label for="">Type</label>
        </div>
        <div class="radio-box-one">
          <input type="checkbox" name="country" checked v-model="filters.country">
          <label for="">Country</label>
        </div>
        <div class="radio-box-one">
          <input type="checkbox" name="applicant" checked v-model="filters.applicant">
          <label for="">Applicant</label>
        </div>
        <div class="radio-box-one">
          <input type="checkbox" name="applicationNo" checked v-model="filters.applicationNo">
          <label for="">Application No.</label>
        </div>
        <div class="radio-box-one">
          <input type="checkbox" name="applicationDate" checked v-model="filters.applicationDate">
          <label for="">Application Date</label>
        </div>
        <div class="radio-box-one">
          <input type="checkbox" name="patentIssueDate" checked v-model="filters.patentIssueDate">
          <label for="">PatentIssue Date</label>
        </div>
        <div class="radio-box-one">
          <input type="checkbox" name="lawFirm" checked v-model="filters.lawFirm">
          <label for="">Law Firm</label>
        </div>
        <!--<div class="radio-box-one">-->
        <!--<input type="checkbox" name="manager" checked v-model="filters.manager">-->
        <!--<label for="">Manager</label>-->
        <!--</div>-->
        <div class="radio-box-one">
          <input type="checkbox" name="inventor" v-model="filters.inventor">
          <label for="">Inventor(s)</label>
        </div>
        <div class="radio-box-one">
          <input type="checkbox" name="relatedTech" v-model="filters.relatedTech" checked>
          <label for="">Related Tech</label>
        </div>
        <div class="radio-box-one">
          <input type="checkbox" name="relatedFeature" v-model="filters.relatedFeature">
          <label for="">Related Feature</label>
        </div>

        <div class="radio-box-one">
          <input type="checkbox" name="currentPatentee" v-model="filters.currentPatentee">
          <label for="">Current Patentee</label>
        </div>
        <div class="radio-box-one">
          <input type="checkbox" name="lawFirmNo" v-model="filters.lawFirmNo">
          <label for="">Law Firm No.</label>
        </div>

        <div class="radio-box-one">
          <input type="checkbox" name="patentNo" v-model="filters.patentNo">
          <label for="">Patent No.</label>
        </div>
        <div class="radio-box-one">
          <input type="checkbox" name="status" v-model="filters.status">
          <label for="">Status</label>
        </div>
        <div class="radio-box-one">
          <input type="checkbox" name="concreteStatus" v-model="filters.concreteStatus">
          <label for="">Concrete Status</label>
        </div>

      </div>
      <div class="radio-box-button">
        <button class="layui-btn layui-btn-primary layui-btn-xs all-button customize" @click="filterCancel()">
          Cancel
        </button>
        <button class="layui-btn layui-btn-normal layui-btn-xs all-button search" @click="filterSave()">
          Save
        </button>
      </div>
    </div>

  </div>
</template>

<script>
  export default {
    name: "PatentList",
    data() {
      return {
        host: window.host,
        canAdd: false,
        patentList: [],
        applicationTypeOptions: [],
        concreteStatusOptions: [],
        countryOptions: [],
        applicantOptions: [],
        lawFirmOptions: [],
        statusOptions: [],
        currentPatenteeOptions: [],
        total: 0,
        curPage: 1,
        allPage: 0,
        filters: {
          patentId: 1,
          patentTitle: 1,
          applicationType: 1,
          country: 1,
          applicant: 1,
          applicationNo: 1,
          applicationDate: 1,
          patentIssueDate: 1,
          lawFirm: 1,
          // manager: 1,
          inventor: 0,
          relatedTech: 1,
          relatedFeature: 0,
          currentPatentee: 0,
          lawFirmNo: 0,
          patentNo: 0,
          status: 0,
          concreteStatus: 0
        }
      }
    },
    mounted: function () {
      var vm = this;
      vm.filterSearch(vm.curPage);
      vm.applicationTypeOptions = vm.getOptions('Application Type');
      vm.countryOptions = vm.getOptions('Application Country');
      vm.applicantOptions = vm.getOptions('Applicant');
      vm.lawFirmOptions = vm.getOptions('Law Firm');
      vm.currentPatenteeOptions = vm.getOptions('Applicant');
      vm.statusOptions = vm.getOptions('Patent Status');
      vm.renderInput();
      vm.initWidth();
      var loading = 0;
      layui.upload.render({
        elem: '#importPatents' //绑定元素
        , url: host + '/patent/patent/import_patents'
        , accept: 'file'
        , done: function (res) {
          layui.layer.close(loading);
          if (res.success) {
            layui.layer.alert(res.ret_obj)
          } else {
            var str = '';
            for (var i = 0; i < res.ret_obj.length; i++) {
              str = str + 'NO.:' + res.ret_obj[i]['no'];
              str = str + '<br>' + 'errorMsg:' + res.ret_obj[i]['error_msg'];
              str = str + '<br>';
            }
            layui.layer.alert(res.ret_msg + '<br>' + str);
          }
        }
        , before: function () {
          loading = layui.layer.load(1, {shade: [0.5, '#000']});
        }
        , error: function () {

        }
      });
      // vm.filterSave();
    },
    created: function () {
      this.renderSelect();

    },
    methods: {
      btnClick: function (data) {//页码点击事件
        var $ = layui.jquery;
        var vm = this;
        if (data !== vm.curPage) {
          vm.curPage = data;
        }
      },
      renderSelect: function () {
        var $ = layui.jquery;
        var layform = layui.form;
        layform.render('select', 'filters');
        $('.layui-form-select').addClass('inline-block');
        // layui.use('form', function () {
        //
        // })

      },
      getOptions: function (option) {
        var vm = this;
        var _data;
        layui.jquery.ajax({
          url: vm.host + '/patent/list_field',
          type: 'GET',
          dataType: 'json',
          async: false,
          xhrFields: {
            withCredentials: true
          },
          data: {filedName: option},
          success: function (data) {
            if (data['success']) {
              _data = data['ret_obj'];
            }
          },
          error: function (res) {
            console.log('type 获取失败');
          }
        });
        return _data
      },
      renderInput: function () {
        var $ = layui.jquery;
        var vm = this;
        var laydate = layui.laydate;
        laydate.render({
          elem: '#applicationDate', //指定元素
          theme: '#2D93CA',
          format: 'yyyy-MM-dd',
          done: function (value) {
            // vm.filters.applicationDate = value;
          }
        });
        laydate.render({
          elem: '#patentIssueDate',
          theme: '#2D93CA',//指定元素
          format: 'yyyy-MM-dd',
          done: function (value) {
            // vm.filters.patentIssueDate = value;
          }
        });
        // layui.use('laydate', function () {
        //
        // })

      },
      filterSearch: function (page) {
        var $ = layui.jquery;
        var vm = this;
        var limit = 10;
        if (!page) {
          page = 1;
        }
        var params = {
          page: page,
          limit: limit,
          fullSerial: $('#patentId').val(),
          title: $('#patentTitle').val(),
          applicationTypeKey: $('#applicationType').val(),
          applicationCountryKey: $('#country').val(),
          applicantId: $('#applicant').val(),
          applicationNo: $('#applicationNo').val(),
          applicationDate: $('#applicationDate').val(),
          issueDate: $('#patentIssueDate').val(),
          lawFirmId: $('#lawFirm').val(),
          inventor: $('#inventor').val(),
          relatedTechnology: $('#relatedTech').val(),
          relatedFeature: $('#relatedFeature').val(),
          currentPatenteeId: $('#currentPatentee').val(),
          patentLawFirmNo: $('#lawFirmNo').val(),
          patentNo: $('#patentNo').val(),
          status: $('#status').val(),
          concreteStatus: $('#concreteStatus').val(),
        };
        // this.$http.post(
        //   `http://172.17.186.157:7010/patent/patent/list`, JSON.stringify(params), {
        //     withCredentials: true
        //   }
        // ).then(function (res) {
        //   if (res.data['success']) {
        //     vm.patentList = res.data['ret_obj']['records'];
        //     vm.total = res.data['ret_obj']['total'];
        //     // vm.curPage = res.data['ret_obj']['current'];
        //     vm.allPage = res.data['ret_obj']['pages'];
        //   }
        // }).catch(function (res) {
        //   console.log(res)
        // })
        layui.jquery.ajax({
//                    url: '172.17.186.172:7010/patent/patent/list',
          url: vm.host + '/patent/patent/list',
          type: 'POST',
          dataType: 'json',
          async: false,
          data: params,
          xhrFields: {
            withCredentials: true
          },
          success: function (data) {
            if (data['success']) {
              vm.patentList = data['ret_obj']['data']['records'];
              vm.canAdd = data['ret_obj']['vo']['patent_add'];
              vm.total = data['ret_obj']['data']['total'];
              vm.curPage = data['ret_obj']['data']['current'];
              vm.allPage = data['ret_obj']['data']['pages'];
            }

          },
          error: function (res) {
            console.log('请求失败！');
            console.log(res)
          }
        });
      },
      showFilter: function () {
        var $ = layui.jquery;
        $('#items').removeClass('hide');
        $('.table-col-width').each(function () {
          this.style.minWidth = '120px';
        })
        var layer = layui.layer;
        layer.open({
          title: 'Customize',
          type: 1,
          skin: 'layui-layer-demo', //样式类名
          closeBtn: 0, //不显示关闭按钮
          anim: 2,
          area: ['600px', '400px'],
          shadeClose: false, //开启遮罩关闭
          content: $('#items'),
          end: function () {
            $('#items').addClass('hide');
          }
        });
        // layui.use('layer', function () {
        //
        // })
      },
      filterSave: function () {
        var $ = layui.jquery;
        var vm = this;
        var num = 0;
        vm.renderInput();
        vm.renderSelect();
        vm.layerClose();
        $('#items').addClass('hide');
        vm.changeWidth();
        // $('.wwwwwww').addClass('hide');
      },
      filterCancel: function () {
        var vm = this;
        vm.layerClose();
        vm.changeWidth();
      },
      layerClose: function () {
        var $ = layui.jquery;
        var layer = layui.layer;
        layer.closeAll();
        // layui.use('layer', function () {
        //
        // });
        $('#items').addClass('hide');
      },
      newPatent: function () {
        var $ = layui.jquery;
        this.$router.push({
          path: '/patent_add',
          query: {}
        })
      },
      patentDetail: function (p_id) {
        var $ = layui.jquery;
        var vm = this;
        vm.$router.push({
          path: '/patent_detail',
          name: 'PatentDetail',
          query: {
            p_id: p_id,
          },
        });
      },
      exportParams: function () {
        var $ = layui.jquery;
        var vm = this;
        var showFields = '';
        var allFields = {
          patentId: 'Patent ID',
          patentTitle: 'Patent Title',
          applicationType: 'Application Type',
          country: 'Country',
          applicant: 'Applicant',
          applicationNo: 'Application NO.',
          applicationDate: 'Application Date',
          patentIssueDate: 'Patent Issue Date',
          lawFirm: 'Law Firm',
          // manager: 'Manager',
          inventor: 'Inventor',
          relatedTech: 'Related Tech',
          relatedFeature: 'Related Feature',
          currentPatentee: 'Current Patentee',
          lawFirmNo: 'Law Firm No.',
          patentNo: 'Patent No.',
          status: 'Status',
          concreteStatus: 'Concrete Status',
        }
        for (var key in vm.filters) {
          if (vm.filters[key]) {
            showFields = showFields + allFields[key] + ',';
          }
        }
        var params = {
          showFields: showFields,
          page: vm.curPage,
          limit: 10,
          fullSerial: $('#patentId').val(),
          title: $('#patentTitle').val(),
          applicationTypeKey: $('#applicationType').val(),
          applicationCountryKey: $('#country').val(),
          applicantId: $('#applicant').val(),
          applicationNo: $('#applicationNo').val(),
          applicationDate: $('#applicationDate').val(),
          issueDate: $('#patentIssueDate').val(),
          lawFirmId: $('#lawFirm').val(),
          inventor: $('#inventor').val(),
          relatedTechnology: $('#relatedTech').val(),
          relatedFeature: $('#relatedFeature').val(),
          currentPatenteeId: $('#currentPatentee').val(),
          patentLawFirmNo: $('#lawFirmNo').val(),
          patentNo: $('#patentNo').val(),
          status: $('#status').val(),
          concreteStatus: $('#concreteStatus').val(),
        };
        var paramsString = ''
        for (var key in params) {
          if (params[key]) {
            paramsString = paramsString + key + '=' + params[key] + '&'
          }
        }
        return paramsString.slice(0, -1)
      },
      deleteCord: function (p_id) {
        var $ = layui.jquery;
        var layer = layui.layer;
        var vm = this;
        layer.confirm('确定删除？', {
            btn: ['删除', '取消']
          }, function () {
            $.ajax({
              url: vm.host + '/patent/patent/delete',
              type: 'POST',
              dataType: 'json',
              xhrFields: {
                withCredentials: true,
              },
              data: {id: p_id},
              success: function (data) {
                if (data['success']) {
                  layer.alert(data['ret_msg'], {icon: 1});
                  vm.filterSearch(vm.curPage);
                } else {
                  layer.alert(data['ret_msg'], {icon: 2});
                }
              },
              error: function (data) {
                layer.alert(data, {icon: 2});
              }
            });
          }, function () {
            layer.closeAll();
          }
        );

      },
      getConcreteStatusOptions: function () {
        var vm = this;
        var $ = layui.jquery;
        var status = $('#status').val();
        if (status == ' ') {
          vm.concreteStatusOptions = [];
        } else {
          $.ajax({
            url: window.host + '/patent/list_field',
            type: 'GET',
            dataType: 'json',
            xhrFields: {
              withCredentials: true
            },
            data: {filedName: 'Concrete Status', value: status},
            success: function (data) {
              if (data['success']) {
                vm.concreteStatusOptions = data['ret_obj'];
              }
            }
          });
        }

      },
      initWidth: function () {
        var $ = layui.jquery;
        var vm = this;
        $('input[type=checkbox]').each(function () {
          $(this).on('change',function () {
            $('.table-col-width').each(function () {
              this.style.minWidth = '120px';
            })
          })
        });
      },
      changeWidth: function () {
        var $ = layui.jquery;
        var vm = this;
        var table_width = $('table')[0].scrollWidth;
        var col_width = $('tbody')[0].scrollWidth;
        var num = 0;
        var some_num = 0;
        for (var key in vm.filters){
          if(vm.filters[key]){
            num ++;
          }
        }
        $('th.content-ellipsis').each(function () {
          some_num ++;
        });
        console.log(num,some_num);
        if (table_width > col_width){

          $('.table-col-width').each(function () {
            this.style.minWidth = (120 + (table_width - col_width)/(num-some_num+1)) + 'px';
          })
        }else {
          $('.table-col-width').each(function () {
            this.style.minWidth = '120px';
          })
        }
      }
    },
    watch: {
      curPage: function (newValue, oldValue) {
        var vm = this;
        vm.filterSearch(vm.curPage);
        console.log('当前第' + newValue + '页！')
      },
    },
    computed: {
      indexs: function () {
        var $ = layui.jquery;
        var vm = this;
        var left = 1;
        var right = vm.allPage;
        var ar = [];
        if (vm.allPage >= 5) {
          if (vm.curPage > 3 && vm.curPage < vm.allPage - 2) {
            left = vm.curPage - 2;
            right = vm.curPage + 2
          } else {
            if (vm.curPage <= 3) {
              left = 1;
              right = 5;
            } else {
              right = vm.allPage;
              left = vm.allPage - 4;
            }
          }
        }
        while (left <= right) {
          ar.push(left);
          left++;
        }
        return ar
      },

    }
  }
</script>

<style scoped>


  .logo-name {
    position: relative;
    width: 30%;
    height: 40px;
    top: 10px;
    bottom: 0;
    font-weight: bold;
    font-size: 24px;
    color: #333;
    /*z-index: 100000;*/
  }


  .filters-col {
    display: inline-block;
    width: 94%;
    margin-bottom: 10px;
    float: left;
  }

  .button-col {
    display: inline-block;
    float: right;
    width: 5%;
  }

  .right {
    text-align: right;
  }


  .bgc {
    margin-top: 20px;
    padding: 10px 15px 20px 15px;
    background-color: #F2F2F2;
    box-shadow: 1px 0px 1px #A8A8A8
  }

  .filters {
    height: auto;
    background-color: white;
    padding: 10px 25px 10px 25px;
    border-radius: 8px;
    border-top: 1px #E6E6E6 solid;
    border-bottom: 1px #E6E6E6 solid;
    box-shadow: 0px 0px 1px #A8A8A8
  }

  .layui-input {
    height: 30px;
    display: inline-block;
    width: 140px;
    color: #A8A8A8;
    font-size: smaller;
    margin-left: 15px;
  }

  label {
    display: inline-block;
    width: 140px;
    font-size: 16px;
    text-align: right;
    color: #6B6B6B;
    line-height: 30px;
  }

  select option {
    color: #A8A8A8;
  }

  .filters-one {
    display: inline-block;
    width: 320px;
    margin-top: 15px;
    text-align: center;
  }

  .all-button {
    width: 80px;
    height: 30px;
    border-radius: 3px;
    /*z-index: 100000000;*/
  }

  .customizediv {
    margin: 15px 0px 15px 0px;
  }

  .customize {
    color: #1E9FFF;
    border: 1px #408cd3 solid;

  }

  .search {
    color: white;
    border: 1px #408cd3 solid;
  }

  .layui-btn-normal {
    background-color: #408cd3 !important;
  }

  .table-col {
    margin-top: 15px;
    height: auto;
    background-color: white;
    padding: 10px 15px 10px 15px;
    border-radius: 8px;
    border-top: 1px #E6E6E6 solid;
    border-bottom: 1px #E6E6E6 solid;
    box-shadow: 0px 0px 1px #A8A8A8
  }

  .table-foot span {
    margin-top: 5px;
    margin-left: 3px;
    display: inline-block;
    color: #A8A8A8;
    font-size: smaller;
    position: relative;
    bottom: 0;
    top: 5px;
  }

  .table-foot {
    width: 100%;
    height: 30px;
  }

  .button-col-right {
    margin-top: -30px;
    /*width: 100%;*/
    text-align: right;
    margin-bottom: 20px;
  }
  table thead tr th {
    width: 100%;
    background-color: #e1ebf8;
    height: 20px;
    color: #1d61a1;
    font-size: 16px;
    text-align: center;
  }
  table tbody tr td {
    color: #A8A8A8;
    text-align: center;
    font-size: smaller;
  }

  .table {
    display: block;
    height: auto;
    min-height: 450px;
    width: auto;
    overflow-x: auto !important;
    overflow-y: auto !important;
    white-space: nowrap !important;

  }

  table tbody tr td a {
    color: #2D93CA;
  }

  [v-cloak] {
    display: none;
  }

  /*page style*/
  .page-bar {
    /*margin:40px;*/
    margin-top: -6px;
    float: right;
    display: inline-block;
  }

  .page-bar a {
    /*display: inline-block;*/
    border: 0;
    width: 20px;
    height: 17px;
    text-decoration: none;
    position: relative;
    float: left;
    /*padding: 1px 5px 5px 5px;*/
    /*margin-left: -1px;*/
    line-height: 1.42857143;
    color: #337ab7;
    cursor: pointer;
    text-align: center;
  }

  .table-foot .page-bar span {
    border: 0;
    width: auto;
    height: auto;
    text-align: center;
    margin-left: 3px;
  }

  .page-bar a:hover {
    background-color: #eee;
  }

  .page-bar a.banclick {
    cursor: not-allowed;
  }

  .page-bar .active a {
    color: #fff;
    cursor: default;
    background-color: #337ab7;
    border-color: #337ab7;
    /*padding: 0px 5px 5px 1px;*/
    text-align: center;
  }

  .inline-block {
    display: inline-block;
  }

  .radio-box {
    padding: 15px 15px 15px 15px;
  }

  .radio-box-one {
    display: inline-block;
    margin: 15px 0 0 15px;
  }

  .radio-box-one label {
    text-align: left;
  }

  .radio-box-button {
    text-align: center;
    margin-bottom: 20px;
  }

  .hide {
    display: none !important;
  }

  .content-ellipsis {
    /*display: inline-block;*/
    min-width: 200px;
    /*max-width: 400px;*/
    width: auto;
    overflow: visible;
    white-space: normal;
    word-break: normal;
    /*text-overflow: ellipsis;*/
  }

  /*.content-ellipsis:hover {*/
    /*text-overflow: inherit;*/
    /*overflow: visible;*/
    /*white-space: normal;*/
    /*!*word-break:normal;*!*/
    /*height: auto;*/
  /*}*/

  /*.content-ellipsis:hover {*/
  /*text-overflow: inherit;*/
  /*overflow: visible;*/
  /*background-color: black;*/
  /*color: white;*/
  /*position: fixed;*/
  /*width: auto;*/
  /*}*/

  /*page style*/
  /*::-webkit-scrollbar:vertical { !*隐藏滚轮*!*/
    /*display: none;*/
  /*}*/
  .table-col-width {
    width: auto;
    min-width: 120px;
  }
</style>
