<template>
  <div v-cloak>
    <div class="layui-row bgc">
      <div class="layui-row filters" lay-filter="filters">
        <div class="filters-col ">
          <div class="filters-one" name="inventionId" v-if="filters.inventionId==1">
            <label for="">Invention ID</label>
            <input type="text" class="layui-input" id="inventionId">
          </div>
          <div class="filters-one" name="projectStatus" v-if="filters.projectStatus==1">
            <label for="">Project Status</label>
            <select name="" id="projectStatus" class="layui-input">
              <option value="">All</option>
              <template v-for="item in projectStatusOptions">
                <option :value="item.key_id">{{ item.key_value }}</option>
              </template>
            </select>
          </div>
          <div class="filters-one" name="conclusionName" v-if="filters.conclusionName==1">
            <label for="">Conclusion</label>
            <select name="" id="conclusionName" class="layui-input">
              <option value="">All</option>
              <template v-for="item in conclusionNameOptions">
                <option :value="item.key_id">{{ item.key_value }}</option>
              </template>
            </select>
          </div>
          <div class="filters-one" name="inventionTitle" v-if="filters.inventionTitle==1">
            <label for="">Invention Title</label>
            <input type="text" class="layui-input" id="inventionTitle">
          </div>
          <div class="filters-one" name="relatedTech" v-if="filters.relatedTech==1">
            <label for="">Related Tech</label>
            <input type="text" class="layui-input" id="relatedTech">
          </div>
          <div class="filters-one" name="inventor" v-if="filters.inventor==1">
            <label for="">Inventor</label>
            <input type="text" class="layui-input" id="inventor">
          </div>
          <div class="filters-one" name="progressName" v-if="filters.progressName==1">
            <label for="">Progress</label>
            <select name="" id="progressName" class="layui-input">
              <option value="">All</option>
              <template v-for="item in progressNameOptions">
                <option :value="item.key_id">{{ item.key_value }}</option>
              </template>
            </select>
          </div>
          <div class="filters-one" name="applicationType" v-if="filters.applicationType==1">
            <label for="">Application Type</label>
            <select name="" class="layui-input" id="applicationType">
              <option value="">All</option>
              <template v-for="item in applicationTypeOptions">
                <option :value="item.key_id">{{item.key_value}}</option>
              </template>
            </select>
          </div>
          <div class="filters-one" name="relatedFeature" v-if="filters.relatedFeature==1">
            <label for="">Related Feature</label>
            <input type="text" class="layui-input" id="relatedFeature">
          </div>
          <div class="filters-one" name="projectNo" v-if="filters.projectNo==1">
            <label for="">Project No.</label>
            <input type="text" class="layui-input" id="projectNo">
          </div>
          <div class="filters-one" name="priorityName" v-if="filters.priorityName==1">
            <label for="">Priority</label>
            <select name="" class="layui-input" id="priorityName">
              <option value="">All</option>
              <template v-for="item in priorityNameOptions">
                <option :value="item.key_id">{{item.key_value}}</option>
              </template>
            </select>
          </div>
          <div class="filters-one" name="applicationCountry" v-if="filters.applicationCountry==1">
            <label for="">Application Country</label>
            <select name="" class="layui-input" id="applicationCountry">
              <option value="">All</option>
              <template v-for="item in applicationCountryOptions">
                <option :value="item.id">{{item.name}}</option>
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
        </div>
      </div>

      <div class="layui-row table-col">
        <div class="logo-name">
          Invention
        </div>
        <div class="button-col-right">
          <button v-if="canAdd" class="layui-btn layui-btn-normal layui-btn-xs all-button" @click="newInvention()">
            +Invention
          </button>
        </div>

        <table class="layui-table table" lay-skin="nob" lay-even>
          <colgroup></colgroup>
          <thead>
          <tr>
            <!--<th style="width: 30px"></th>-->
            <th name="inventionId" v-if="filters.inventionId ==1" class="content-ellipsis">Invention ID</th>
            <th name="inventionTitle" v-if="filters.inventionTitle==1" class="content-ellipsis">Invention Title</th>
            <th name="inventor" v-if="filters.inventor==1" class="content-ellipsis">Inventor(s)</th>
            <th name="progressName" v-if="filters.progressName==1" class="table-col-width">Progress</th>
            <th name="applicationType" v-if="filters.applicationType==1" class="table-col-width">Application Type</th>
            <th name="projectNo" v-if="filters.projectNo==1" class="table-col-width">Project No.</th>
            <th name="projectStatus" v-if="filters.projectStatus==1" class="table-col-width">Project Status</th>
            <th name="relatedTech" v-if="filters.relatedTech==1" class="table-col-width">Related Tech</th>
            <th name="relatedFeature" v-if="filters.relatedFeature==1" class="table-col-width">Related Feature</th>
            <th name="conclusionName" v-if="filters.conclusionName==1" class="table-col-width">Conclusion</th>
            <!--<th name="manager" v-if="filters.manager==1">Manager</th>-->
            <th name="priorityName" v-if="filters.priorityName==1" class="table-col-width">Priority</th>
            <th name="applicationCountry" v-if="filters.applicationCountry==1" class="table-col-width">Application Country</th>
            <th class="table-col-width">Operate</th>

          </tr>
          </thead>
          <tbody>
          <tr v-for="(item,index) in inventionList">
            <!--<td style="width: 30px">{{ index+1+(curPage-1)*10 }}</td>-->
            <td name="inventionId" v-if="filters.inventionId==1" class="content-ellipsis"><a href="javascript:;"
                                                                                             @click="inventionDetail(item.id)">{{item.full_serial}}</a>
            </td>
            <td name="inventionTitle" v-if="filters.inventionTitle==1" class="content-ellipsis">{{item.title}}</td>
            <td name="inventor" v-if="filters.inventor==1" class="content-ellipsis">
              {{ item.first_inventor.real_name }}
              <template v-for="inv_one in item.inventor_list">
                ,{{inv_one.real_name}}
              </template>
            </td>
            <td name="progressName" v-if="filters.progressName==1" class="table-col-width">{{item.progress_name}}</td>
            <td name="applicationType" v-if="filters.applicationType==1" class="table-col-width">{{item.application_type}}</td>
            <td name="projectNo" v-if="filters.projectNo==1" class="table-col-width">{{item.project_no}}</td>
            <td name="projectStatus" v-if="filters.projectStatus==1" class="table-col-width">{{item.project_status}}</td>
            <td name="relatedTech" v-if="filters.relatedTech==1" class="table-col-width">{{item.related_technology}}</td>
            <td name="relatedFeature" v-if="filters.relatedFeature==1" class="table-col-width">{{item.related_feature}}</td>
            <td name="conclusionName" v-if="filters.conclusionName==1" class="table-col-width">{{item.conclusion_name}}</td>
            <!--<td name="manager" v-if="filters.manager==1">{{}}</td>-->
            <td name="priorityName" v-if="filters.priorityName==1" class="table-col-width">{{item.priority_name}}</td>
            <td name="applicantCountry" v-if="filters.applicationCountry==1" class="table-col-width">{{item.application_country}}</td>
            <td class="table-col-width"><i class="layui-icon layui-icon-delete" @click="deleteCord(item.id)"
                   style="color: #990000;cursor: pointer"></i></td>
          </tr>

          </tbody>
        </table>

        <div class="table-foot">
          <button class="layui-btn layui-btn-primary layui-btn-xs all-button customize"><a
            :href="host + '/patent/invention/download_excel' + '?' + exportParams()">Export</a></button>
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
          <input type="checkbox" name="inventionId" checked v-model="filters.inventionId">
          <label>Invention ID</label>
        </div>
        <div class="radio-box-one">
          <input type="checkbox" name="inventionTitle" checked v-model="filters.inventionTitle">
          <label for="">Invention Title</label>
        </div>
        <div class="radio-box-one">
          <input type="checkbox" name="processName" checked v-model="filters.progressName">
          <label for="">Progress</label>
        </div>
        <div class="radio-box-one">
          <input type="checkbox" name="applicationType" checked v-model="filters.applicationType">
          <label for="">Application Type</label>
        </div>
        <div class="radio-box-one">
          <input type="checkbox" name="projectNo" checked v-model="filters.projectNo">
          <label for="">Project No.</label>
        </div>
        <div class="radio-box-one">
          <input type="checkbox" name="projectStatus" checked v-model="filters.projectStatus">
          <label for="">Project Status</label>
        </div>
        <div class="radio-box-one">
          <input type="checkbox" name="relatedTech" checked v-model="filters.relatedTech">
          <label for="">Related Tech</label>
        </div>
        <div class="radio-box-one">
          <input type="checkbox" name="relatedFeature" checked v-model="filters.relatedFeature">
          <label for="">Related Feature</label>
        </div>
        <div class="radio-box-one">
          <input type="checkbox" name="conclusionName" checked v-model="filters.conclusionName">
          <label for="">Conclusion</label>
        </div>

        <div class="radio-box-one">
          <input type="checkbox" name="inventor" v-model="filters.inventor">
          <label for="">Inventor(s)</label>
        </div>
        <div class="radio-box-one">
          <input type="checkbox" name="priorityName" v-model="filters.priorityName">
          <label for="">Priority</label>
        </div>
        <div class="radio-box-one">
          <input type="checkbox" name="applicationCountry" v-model="filters.applicationCountry">
          <label for="">Application Country</label>
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
    name: "InventionList",
    data() {
      return {
        host: window.host,
        canAdd: false,
        inventionList: [],
        progressNameOptions: [],
        applicationTypeOptions: [],
        conclusionNameOptions: [],
        projectStatusOptions: [],
        priorityNameOptions: [],
        applicationCountryOptions: [],
        total: 0,
        curPage: 1,
        allPage: 0,
        filters: {
          inventionId: 1,
          inventionTitle: 1,
          progressName: 0,
          applicationType: 1,
          projectNo: 1,
          projectStatus: 1,
          relatedTech: 1,
          relatedFeature: 1,
          conclusionName: 0,
          inventor: 1,
          priorityName: 0,
          applicationCountry: 0,
        }
      }
    },
    mounted: function () {
      var vm = this;
      vm.filterSearch(vm.curPage);
      vm.progressNameOptions = vm.getOptions('Invention Progress');
      vm.applicationTypeOptions = vm.getOptions('Application Type');
      vm.conclusionNameOptions = vm.getOptions('Conclusion');
      vm.projectStatusOptions = vm.getOptions('Project Status');
      vm.priorityNameOptions = vm.getOptions('Invention Priority');
      vm.applicationCountryOptions = vm.getOptions('Application Country');
      vm.initWidth();
    },
    created: function () {
      // this.renderSelect();

    },
    methods: {
      btnClick: function (data) {//页码点击事件
        var $ = layui.jquery;
        var vm = this;
        if (data !== vm.curPage) {
          vm.curPage = data;
        }
      },

      getOptions: function (option) {
        var $ = layui.jquery;
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
            console.log('processName 获取失败');
          }
        });
        return _data
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
          fullSerial: $('#inventionId').val(),
          title: $('#inventionTitle').val(),
          progressKey: $('#progressName').val(),
          applicationTypeKey: $('#applicationType').val(),
          projectNo: $('#projectNo').val(),
          projectStatusKey: $('#projectStatus').val(),
          relatedTechnology: $('#relatedTech').val(),
          relatedFeature: $('#relatedFeature').val(),
          conclusion: $('#conclusionName').val(),
          inventorsLoginName: $('#inventor').val(),
          priorityKey: $('#priorityName').val(),
          applicationCountryKey: $('#applicationCountry').val(),
        };
        layui.jquery.ajax({
//                    url: '172.17.186.172:7010/patent/patent/list',
          url: vm.host + '/patent/invention/list',
          type: 'GET',
          dataType: 'json',
          async: false,
          data: params,
          xhrFields: {
            withCredentials: true
          },
          success: function (data) {
            console.log(data);
            if (data['success']) {
              vm.inventionList = data['ret_obj']['data']['records'];
              vm.canAdd = data['ret_obj']['vo']['invention_add'];
              vm.total = data['ret_obj']['data']['total'];
              vm.curPage = data['ret_obj']['data']['current'];
              vm.allPage = data['ret_obj']['data']['pages'];
            }

          },
          error: function (res) {
            console.log('请求失败！');
            console.log(res)
          }
        })
      },
      showFilter: function () {
        var $ = layui.jquery;
        $('#items').removeClass('hide');
        $('.table-col-width').each(function () {
          this.style.minWidth = '120px';
        })
        var layer = layui.layer;
        // layer.open({
        //   type: 1,
        //   skin: 'layui-layer-demo', //加上边框
        //   area: ['600px', '300px'],
        //   closeBtn: 0, //不显示关闭按钮
        //   content: 'html内容'
        // });
        layer.open({
          title: 'Customize',
          type: 1,
          skin: 'layui-layer-demo', //样式类名
          closeBtn: 0, //不显示关闭按钮
          anim: 2,
          area: ['600px', '300px'],
          shadeClose: false, //开启遮罩关闭
          content: $('#items'),
          end: function () {
            $('#items').addClass('hide');
          }
        });
      },
      filterSave: function () {
        var $ = layui.jquery;
        var vm = this;
        // vm.renderInput();
        // vm.renderSelect();
        vm.layerClose();
        vm.changeWidth();
        $('#items').addClass('hide');
        // $('.wwwwwww').addClass('hide');
      },
      filterCancel: function () {
        var vm = this;
        vm.layerClose();
        vm.changeWidth();
      },
      layerClose: function () {
        var layer = layui.layer;
        layer.closeAll();
        // layui.use('layer', function () {
        //
        // });
        // $('#items').addClass('hide');
      },
      newInvention: function () {
        var $ = layui.jquery;
        this.$router.push({
          path: '/invention_add',
          query: {}
        })
      },
      inventionDetail: function (p_id) {
        var $ = layui.jquery;
        var vm = this;
        vm.$router.push({
          path: '/invention_detail',
          name: 'InventionDetail',
          query: {
            invention_id: p_id,
          },
        });
      },
      exportParams: function () {
        var $ = layui.jquery;
        var vm = this;
        var showFields = '';
        var allFields = {
          inventionId: 'Invention ID',
          inventionTitle: 'Invention Name',
          progressName: 'Progress',
          applicationType: 'Type',
          projectNo: 'Project ID',
          projectStatus: 'Project Status',
          conclusionName: 'Conclusion',
          inventor: 'Inventor',
          relatedTech: 'Related Tech',
          relatedFeature: 'Related Feature',
          priorityName: 'Priority',
          applicationCountry: 'Country',
        }
        for (var key in vm.filters) {
          if (vm.filters[key]) {
            if (allFields[key]) {
              showFields = showFields + allFields[key] + ',';
            }
          }
        }
        var params = {
          showFields: showFields,
          page: vm.curPage,
          limit: 10,
          fullSerial: $('#inventionId').val(),
          title: $('#inventionTitle').val(),
          processKey: $('#processName').val(),
          applicationTypeKey: $('#applicationType').val(),
          projectNo: $('#projectNo').val(),
          projectStatusKey: $('#projectStatus').val(),
          relatedTechnology: $('#relatedTech').val(),
          relatedFeature: $('#relatedFeature').val(),
          conclusionNameId: $('#conclusionName').val(),
          inventorsLoginName: $('#inventor').val(),
          priorityKey: $('#priorityName').val(),
          applicationCountryKey: $('#applicationCountry').val(),
        };
        var paramsString = '';
        for (var key in params) {
          if (params[key]) {
            paramsString = paramsString + key + '=' + params[key] + '&'
          }
        }
        console.log(params)
        return paramsString.slice(0, -1)
      },
      deleteCord: function (i_id) {
        var $ = layui.jquery;
        var layer = layui.layer;
        var vm = this;
        layer.confirm('确定删除？', {
            btn: ['删除', '取消']
          }, function () {
            $.ajax({
              url: vm.host + '/patent/invention/delete',
              type: 'POST',
              dataType: 'json',
              xhrFields: {
                withCredentials: true,
              },
              data: {id: i_id},
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
  .customizediv{
    margin:15px 0px 15px 0px;
  }

  .logo-name {
    position: relative;
    height: 40px;
    width: 30%;
    top: 10px;
    bottom: 0;
    font-size: 24px;
    font-weight: bold;
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
  .layui-btn-xs {
    height: 22px;
    line-height: 22px;
    padding: 0 5px;
    font-size: 12px;
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
    line-height:30px;
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
  }

  .customize {
    color: #1E9FFF;
    border: 1px #408cd3 solid;
  }

  .search {
    color: white;
    border: 1px #408cd3 solid;
  }
  .layui-btn-normal{
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

  /*.button-col-right button {*/
    /*width: 70px;*/
  /*}*/

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
    text-align: center;
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
    width: 150px;
  }

  .radio-box-button {
    text-align: center;
  }

  .hide {
    display: none !important;
  }

  .content-ellipsis {
    min-width: 200px;
    /*max-width: 400px;*/
    width: auto;
    overflow: visible;
    white-space: normal;
    word-break: normal;
  }
  /*.content-ellipsis:hover {*/
    /*text-overflow: inherit;*/
    /*overflow: visible;*/
    /*white-space: normal;*/
    /*!*word-break:normal;*!*/
    /*height: auto;*/
  /*}*/
  .table-col-width {
    width: auto;
    min-width: 120px;
  }

  /*page style*/
</style>
