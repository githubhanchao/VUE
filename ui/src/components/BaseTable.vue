<template>
  <div class="layui-row bgc">
    <div class="sidebar">
      <ul id="slideBar">
        <span>Base Table</span>
        <li class="sidebar-selected" name="country"><a>Application Country</a></li>
        <li name="applicant"><a>Applicant</a></li>
        <li name="dataDict"><a>Data Dict</a></li>
        <li name="lawFirm"><a>Patent Law Firm</a></li>
      </ul>
    </div>
    <div class="fr content-right">
      <div style="width: 250px; height: 26px">
        <div style="display: inline-block; float: left;padding-top: 4px;font-size: 16px">{{currentTab |tableHead}}</div>
        <div style="display: inline-block; float: right">
          <button class="layui-btn layui-btn-normal layui-btn-xs all-button" @click="toAdd()">+{{currentTab}}</button>
        </div>
      </div>
      <table class="layui-table" lay-skin="nob" lay-size="sm" id="something">
        <template v-for="(item,index) in objList">
          <tr v-if="currentTab == 'country'">
            <td><input type="text" :value="index+1" class="layui-input no-border layui-input-sss"
                       readonly></td>
            <td style="display: none"><input type="text" :value="item.id" name="id" class="layui-input no-border"
                       ></td>
            <td v-for="(val,field) in country.showFields">
              <input v-if="val[0]=='input'" type="text" :value="item[field]" :name="field" class="layui-input no-border"
                     readonly>
              <select v-if="val[0] =='select'" :name="field" disabled class="layui-input no-border">
                <option v-for="option in createOptions(val[1])" :value="option.option_value" :selected="option.option_value == item[field]">
                  {{ option.option_text }}
                </option>
              </select>
            </td>
            <td>
              <span style="display: inline-block">
                <a href="javascript:;">
                  <i class="layui-icon layui-icon-edit" @click="toEdit($event)"></i>
                  <i class="layui-icon layui-icon-ok hide" @click="toSave($event)"></i>
                </a>
                <a href="javascript:;" style="margin-left: 20px">
                  <i class="layui-icon layui-icon-delete" @click="toDelete(item.id)"></i>
                </a>
              </span>
            </td>
          </tr>
          <tr v-if="currentTab == 'applicant'">
            <td><input type="text" :value="index+1" class="layui-input no-border layui-input-sss"
                       readonly></td>
            <td style="display: none"><input type="text" :value="item.id" name="id" class="layui-input no-border"
            ></td>
            <td v-for="(val,field) in applicant.showFields">
              <input v-if="val[0]=='input'" type="text" :value="item[field]" :name="field" class="layui-input no-border"
                     readonly>
              <select v-if="val[0] =='select'" :name="field" disabled class="layui-input no-border">
                <option v-for="option in createOptions(val[1])" :value="option.option_value" :selected="option.option_value == item[field]">
                  {{ option.option_text }}
                </option>
              </select>
            </td>
            <td>
             <span style="display: inline-block">
                <a href="javascript:;">
                  <i class="layui-icon layui-icon-edit" @click="toEdit($event)"></i>
                  <i class="layui-icon layui-icon-ok hide" @click="toSave($event)"></i>
                </a>
                <a href="javascript:;" style="margin-left: 20px">
                  <i class="layui-icon layui-icon-delete" @click="toDelete(item.id)"></i>
                </a>
              </span>
            </td>
          </tr>
          <tr v-if="currentTab == 'dataDict'">
            <td><input type="text" :value="index+1" class="layui-input no-border layui-input-sss"
                       readonly></td>
            <td style="display: none"><input type="text" :value="item.id" name="id" class="layui-input no-border"
            ></td>
            <td v-for="(val,field) in dataDict.showFields">
              <input v-if="val[0]=='input'" type="text" :value="item[field]" :name="field" class="layui-input no-border"
                     readonly>
              <select v-if="val[0] =='select'" :name="field" disabled class="layui-input no-border">
                <option v-for="option in createOptions(val[1])" :value="option.option_value" :selected="option.option_value == item[field]">
                  {{ option.option_text }}
                </option>
              </select>
            </td>
            <td>
            <span style="display: inline-block">
                <a href="javascript:;">
                  <i class="layui-icon layui-icon-edit" @click="toEdit($event)"></i>
                  <i class="layui-icon layui-icon-ok hide" @click="toSave($event)"></i>
                </a>
                <a href="javascript:;" style="margin-left: 20px">
                  <i class="layui-icon layui-icon-delete" @click="toDelete(item.id)"></i>
                </a>
              </span>
            </td>
          </tr>
          <tr v-if="currentTab == 'lawFirm'">
            <td><input type="text" :value="index+1" class="layui-input no-border layui-input-sss"
                       readonly></td>
            <td style="display: none"><input type="text" :value="item.id" name="id" class="layui-input no-border"
            ></td>
            <td v-for="(val,field) in lawFirm.showFields">
              <input v-if="val[0]=='input'" type="text" :value="item[field]" :name="field" class="layui-input no-border"
                     readonly>
              <select v-if="val[0] =='select'" :name="field" disabled class="layui-input no-border">
                <option v-for="option in createOptions(val[1])" :value="option.option_value" :selected="option.option_value == item[field]">
                  {{ option.option_text }}
                </option>
              </select>
            </td>
            <td>
             <span style="display: inline-block">
                <a href="javascript:;">
                  <i class="layui-icon layui-icon-edit" @click="toEdit($event)"></i>
                  <i class="layui-icon layui-icon-ok hide" @click="toSave($event)"></i>
                </a>
                <a href="javascript:;" style="margin-left: 20px">
                  <i class="layui-icon layui-icon-delete" @click="toDelete(item.id)"></i>
                </a>
              </span>
            </td>
          </tr>
        </template>
      </table>
    </div>
    <div class="hide" id="item">
      <template v-if="currentTab=='country'">
        <div class="layui-row" v-for="(val,key) in country.addFields">
          <label for="">{{ key|labelFilter }}</label>
          <input type="text" v-if="val[0] == 'input'" class="layui-input layui-input-new" :name="key">
          <input type="number" v-if="val[0] == 'inputNo'" class="layui-input layui-input-new" :name="key">
          <select v-if="val[0] =='select'" :name="key" class="layui-input layui-input-new">
            <option v-for="option in createOptions(val[1])" :value="option.option_value">
              {{ option.option_text }}
            </option>
          </select>
        </div>
      </template>
      <template v-if="currentTab=='applicant'">
        <div class="layui-row" v-for="(val,key) in applicant.addFields">
          <label for="">{{ key|labelFilter }}</label>
          <input type="text" v-if="val == 'input'" class="layui-input layui-input-new" :name="key">
          <input type="number" v-if="val == 'inputNo'" class="layui-input layui-input-new" :name="key">
          <select v-if="val[0] =='select'" :name="key" class="layui-input layui-input-new ">
            <option v-for="option in createOptions(val[1])" :value="option.option_value">
              {{ option.option_text }}
            </option>
          </select>
        </div>
      </template>
      <template v-if="currentTab=='dataDict'">

        <div class="layui-row" v-for="(val,key) in dataDict.addFields">
          <label for="">{{ key|labelFilter }}</label>
          <input type="text" v-if="val == 'input'" class="layui-input layui-input-new" :name="key">
          <input type="number" v-if="val == 'inputNo'" class="layui-input layui-input-new" :name="key">
          <select v-if="val[0] =='select'" :name="key" class="layui-input layui-input-new" @change="isConcreteStatus($event)">
            <option v-for="option in createOptions(val[1])" :value="option.option_value">
              {{ option.option_text }}
            </option>
          </select>
          <!--特殊情况特殊添加-->
          <div id="showStatus" class="hide" v-if="key == 'parentId'">
            <label for="">Status</label>
            <select name="" id="status" class="layui-input layui-input-new">
              <option v-for="one in statusOptions" :value="one['key_id']">{{one['key_value']}}</option>
            </select>
          </div>
          <!--特殊情况特殊添加-->
        </div>
      </template>
      <template v-if="currentTab=='lawFirm'">
        <div class="layui-row" v-for="(val,key) in lawFirm.addFields">
          <label for="">{{ key|labelFilter }}</label>
          <input type="text" v-if="val == 'input'" class="layui-input layui-input-new" :name="key">
          <input type="number" v-if="val == 'inputNo'" class="layui-input layui-input-new" :name="key">
          <select v-if="val[0] =='select'" :name="key" class="layui-input layui-input-new">
            <option v-for="option in createOptions(val[1])" :value="option.option_value">
              {{ option.option_text }}
            </option>
          </select>
        </div>
      </template>
      <div class="box-button">
        <button class="layui-btn layui-btn-primary layui-btn-xs all-button" @click="layerClose()">
          Cancel
        </button>
        <button class="layui-btn layui-btn-normal layui-btn-xs all-button" @click="saveAdd()">
          Save
        </button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "BaseTable",
    data() {
      return {
        host: window.host,
        objList: [],
        currentTab: 'country',
        previousOptionKey: '',
        isConcrete: false,
        options: [],
        statusOptions: [],
        country: {
          showFields: {
            // 'id': ['input'],
            'name': ['input'],
            'abbreviation': ['input'],
            'patent_unit': ['input'],
            'oa_type_key': ['select','oa_type_key'], // key是显示字段的key_id .第二个是判断查询的字段名
            // 'oa_time_limit': ['input'],
          },
          addFields: {
            'name': ['input'],
            'abbreviation': ['input'],
            'patentFee': ['inputNo'],
            'patentCycle': ['inputNo'],
            'patentUnit': ['input'],
            'oaTypeKey': ['select', 'oa_type_key'], // 第二个位置 key，对应 提交字段
            'oaTimeLimit': ['inputNo']
          },
          editFields: {
            'id': 'id',
            'name': 'name',
            'abbreviation': 'abbreviation',
            'patent_unit': 'patentUnit',
            'oa_type_key': 'oaTypeKey',   // 对应showFields中的字段名，前为show，后为提交时参数
            // 'oa_time_limit': 'oaTimeLimit'
          }
        },
        applicant: {
          showFields: {
            // 'id': ['input'],
            'name': ['input'],
            'address': ['input']
          },
          addFields: {
            'name': ['input'],
            'address': ['input'],
          },
          editFields: {
            'id': 'id',
            'name': 'name',
            'address': 'address'
          }
        },
        dataDict: {
          showFields: {
            // 'id': ['input'],
            'key_value': ['input'],
            'parent_id': ['select','data_type'],
          },
          addFields: {
            'parentId': ['select', 'data_type'],
            // 'keyId': 'inputNo',
            'keyValue': ['input'],
            // 'parentId': ['inputNo'],
            'sort': ['inputNo'],
            // 'level': ['inputNo'],
            'remark': ['input']
          },
          editFields: {
            'id': 'id',
            'key_value': 'keyValue',
            'parent_id': 'parentId'
          }
        },
        lawFirm: {
          showFields: {
            // 'id': ['input'],
            'name': ['input'],
            'address': ['input'],
            'tel': ['input'],
            'email': ['input']
          },
          addFields: {
            'name': ['input'],
            'address': ['input'],
            'tel': ['input'],
            'eMail': ['input']
          },
          editFields: {
            'id': 'id',
            'name': 'name',
            'address': 'address',
            'tel': 'tel',
            'email': 'eMail'
          }
        }

      }
    },
    mounted: function () {
      var vm = this;
      vm.activeSlider();
      vm.getObjList('country');
      vm.getStatusOptions();
    },
    watch: {
      // isConcrete: function () {
      //   var vm = this;
      //
      // }
    },
    methods: {
      activeSlider: function () {
        var vm = this;
        var li_name = '';
        var $ = layui.jquery;
        $('#slideBar li').each(function (i, item) {
          $(item).on('click', function () {
            $(this).addClass('sidebar-selected').siblings().removeClass('sidebar-selected');
            li_name = this.getAttribute('name');
            vm.getObjList(li_name);
            vm.currentTab = li_name;
            $('#something input').each(function () {
              $(this).attr('readonly', true).removeClass('has-border');
            });
            $('#something select').each(function () {
              $(this).attr('disabled', true).removeClass('has-border');
            });
            $('.layui-icon-edit').removeClass('hide');
            $('.layui-icon-ok').addClass('hide');
          })
        });
      },
      getObjList: function (item) {
        var vm = this;
        var url = vm.host + '/patent/' + item + '/list';
        var $ = layui.jquery;
        $.ajax({
          url: url,
          type: 'POST',
          dataType: 'json',
          data: {},
          xhrFields: {
            withCredentials: true,
          },
          success: function (data) {
            if (data['success']) {
              vm.objList = data['ret_obj'];
            } else {
              // 提示 data['ret_msg]
            }
          },
          error: function () {
            // 提示失败
          }
        });
      },
      toEdit: function (event) {
        var vm = this;
        var el = event.currentTarget;
        var tds;
        var $ = layui.jquery;
        var tds_el = $($($($(el).parent()).parent()).parent()).prevAll();
        var tds_length = tds_el.length;
        tds = tds_el.splice(0, tds_length - 1);
        // console.log(tds);
        $.each(tds, function () {
          $(this).children().removeAttr('readonly').addClass('has-border');
          $(this).children().removeAttr('disabled').addClass('has-border');
        })
        $(el).addClass('hide').next().removeClass('hide');

      },
      toReadOnly: function (el) {
        var $ = layui.jquery;
        var tds;
        var tds_el = $($($($(el).parent()).parent()).parent()).prevAll();
        var tds_length = tds_el.length;
        tds = tds_el.splice(0, tds_length - 1);
        $.each(tds, function () {
          $(this).children().attr('readonly', true).removeClass('has-border');
          $(this).children().attr('disabled', true).removeClass('has-border');
        });
        $(el).addClass('hide').prev().removeClass('hide');
      },
      toSave: function () {
        var $ = layui.jquery;
        var vm = this;
        var el = event.currentTarget;
        vm.toReadOnly(el);
        var params = {};
        var params_key;
        var params_value;
        var temp_name;
        var url = vm.host + '/patent/' + vm.currentTab + '/edit';
        $($($($(el).parent()).parent()).parent()).prevAll().each(function () {
          if ($(this).children('input').length == 0){
            temp_name = $(this).children('select')[0].getAttribute('name');
            params_value = $(this).children('select').val();
          }else {
            temp_name = $(this).children('input')[0].getAttribute('name');
            params_value = $(this).children('input').val();
          }
            params_key = vm[vm.currentTab]['editFields'][temp_name];
            if(params_key){
              params[params_key] = params_value;
            }
          }
        );
        $.ajax({
          url: url,
          type: 'POST',
          dataType: 'json',
          data: params,
          xhrFields: {
            withCredentials: true,
          },
          success: function (data) {
            if (data['success']) {
              layui.layer.msg(data['ret_msg']);
              vm.getObjList(vm.currentTab);
            } else {
              // 提示 data['ret_msg]
            }
          },
          error: function () {
            // 提示失败
          }
        });
      },
      toDelete: function (item_id) {
        var vm = this;
        var layer = layui.layer;
        var url = vm.host + '/patent/' + vm.currentTab + '/delete';
        var $ = layui.jquery;
        layer.confirm('确定要删除吗？', {
            btn: ['删除', '取消']
          }, function () {
            $.ajax({
            url: url,
            type: 'POST',
            dataType: 'json',
            data: {id: item_id},
            xhrFields: {
              withCredentials: true
            },
            success: function (data) {
              if (data['success']) {
                layer.msg('已删除');
                vm.getObjList(vm.currentTab);
              } else {
                layer.alert(data['ret_msg']);
              }
            },
            error: function (ret) {
              layer.alert('删除失败！')
            }
          });
          }, function () {
            layer.closeAll();
          }
        );
      },
      toAdd: function () {
        var $ = layui.jquery;
        var vm = this;
        var elm = $('#item');
        var layer = layui.layer;
        layer.open({
          title: ['Add' + ' ' + vm.currentTab, 'font-weight: bolder;'],
          type: 1,
          skin: 'layui-layer-demo', //样式类名
          closeBtn: 0, //不显示关闭按钮
          anim: 2,
          // area: ['600px', '300px'],
          area: '400px',
          // offset: '200px',
          shadeClose: false, //开启遮罩关闭
          content: elm,
          end: function () {
            // $('#item').addClass('hide');
          }
        });
      },
      saveAdd: function () {
        var vm = this;
        var value;
        var params = {};
        var $ = layui.jquery;
        // $('#item').addClass('hide');
        var url = vm.host + '/patent/' + vm.currentTab + '/add';
        for (var k in vm[vm.currentTab]['addFields']) {
          if (vm[vm.currentTab]['addFields'][k][0] == 'input' || vm[vm.currentTab]['addFields'][k][0] == 'inputNo') {
            $("#item input[name='" + k + "']").each(function () {
              value = $(this).val();
              params[k] = value;
            })
          } else if (vm[vm.currentTab]['addFields'][k][0] == 'select') {
            value = $("select[name='" + k + "']").val();
            params[k] = value;
          }
        }
        if (vm.isConcrete){
          params['level'] = $('#status').val();
        }
        $.ajax({
          url: url,
          type: 'POST',
          dataType: 'json',
          data: params,
          xhrFields: {
            withCredentials: true,
          },
          success: function (data) {
            if (data['success']) {
              layui.layer.msg(data['ret_msg']);
              vm.layerClose();
              vm.getObjList(vm.currentTab)
            } else {
              // 提示 data['ret_msg]
            }
          },
          error: function () {
            // 提示失败
          }
        });


      },
      layerClose: function () {
        var layer = layui.layer;
        var $ = layui.jquery;
        layer.closeAll();
        $('#item').addClass('hide');
      },
      isConcreteStatus: function (event) {
        var vm = this;
        var el = event.currentTarget;
        var $ = layui.jquery;
        if($(el).find("option:selected").text().search('Concrete Status')!=-1){
          $('#showStatus').removeClass('hide');
          vm.isConcrete = true;
        }else {
          $('#showStatus').addClass('hide');
          vm.isConcrete = false;
        }
      },
      getStatusOptions: function () {
        var vm = this;
        layui.jquery.ajax({
          url: vm.host + '/patent/list_field',
          type: 'GET',
          dataType: 'json',
          xhrFields: {
            withCredentials: true
          },
          data: {filedName: 'Patent Status'},
          success: function (data) {
            if (data['success']) {
              vm.statusOptions = data['ret_obj'];
            }
          },
          error: function (res) {
            console.log('type 获取失败');
          }
        });
      }
    },
    filters: {
      tableHead: function (item) {
        var dic = {
          'country': 'Application Country',
          'applicant': 'Applicant',
          'dataDict': 'Data Dict',
          'lawFirm': 'Patent Law Firm',
        };
        return dic[item]
      },
      labelFilter: function (item) {
        switch (item) {
          case 'parentId': return 'DataType';break;
          case  'keyValue': return 'Value'; break;
          default: return item;
        }
      }
    },
    computed: {
      createOptions: function () {
        var $ = layui.jquery;
        var vm = this;
        return function (filed_param) {
          if(vm.previousOptionKey != filed_param){
            var param, k, v;
            var options = [];
            var $ = layui.jquery;
            if (filed_param == 'oa_type_key'){
              param = 'OA Type';
              k = 'key_id';
              v = 'key_value'
              $.ajax({
                url: vm.host + '/patent/list_field',
                type: 'GET',
                dataType: 'json',
                async: false,
                xhrFields: {
                  withCredentials: true,
                },
                data: {filedName: param},
                success: function (data) {
                  if (data['success']){
                    for (var key in data['ret_obj']){
                      var el = {};
                      el['option_text'] = data['ret_obj'][key][v];
                      el['option_value'] = data['ret_obj'][key][k];

                      options.push(el);
                    }
                  }
                }
              });
            }
            if (filed_param == 'data_type'){
              k = 'parent_id';
              v = 'parent_name';
              $.ajax({
                url: vm.host + '/patent/dataDict/list_parent',
                type: 'GET',
                dataType: 'json',
                async: false,
                xhrFields: {
                  withCredentials: true,
                },
                data: {filedName: param},
                success: function (data) {
                  if (data['success']){
                    for (var key in data['ret_obj']){
                      var el = {};
                      el['option_text'] = data['ret_obj'][key][v];
                      el['option_value'] = data['ret_obj'][key][k];

                      options.push(el);
                    }
                  }
                }
              });
            }
            vm.options = options;
            vm.previousOptionKey = filed_param;
            return options;
          }else {
            return vm.options;
          }
        }
      }
    }
  }
</script>

<style scoped>
  .bgc {
    margin-top: 20px;
    padding: 10px 15px 20px 15px;
    background-color: #F2F2F2;
    box-shadow: 1px 0px 1px #A8A8A8;
    height: 600px;
    overflow: auto;
  }

  .sidebar {
    display: inline-block;
    position: absolute;
    float: left;
    background: #fff;
    border-radius: 4px;
    padding-bottom: 15px;
    width: 15%;
    border-top: 1px #E6E6E6 solid;
    border-bottom: 1px #E6E6E6 solid;
    box-shadow: 0px 0px 1px #A8A8A8
    /*margin-left: 10px;*/
  }

  .sidebar > ul {
    list-style: none;
    padding: 0;
    margin: 0;
    font-size: 16px;
  }

  .sidebar > ul > li, span {
    padding: 10px 20px;
  }

  .sidebar > ul > span {
    display: inline-block;
    font-size: 22px;
    font-weight: 400;
    padding-top: 20px;
    /*margin: 20px 0px;*/
    height: 40px;
  }

  .sidebar a {
    line-height: 2;
    color: #888;
  }

  .sidebar a:hover {
    cursor: pointer;
  }

  .sidebar-selected {
    background: #DEE7F3;
  }

  .sidebar-selected a {
    color: #000000;
  }

  .content-right {
    display: inline-block;
    padding: 20px;
    width: 79%;
    background: #fff;
    border-radius: 4px;
    border-top: 1px #E6E6E6 solid;
    border-bottom: 1px #E6E6E6 solid;
    box-shadow: 0px 0px 1px #A8A8A8
  }

  #something {
    display: block;
    height: 500px;
    overflow-x: auto !important;
    overflow-y: auto !important;
    white-space: nowrap !important;

  }

  ::-webkit-scrollbar { /*隐藏滚轮*/
    display: none;
  }

  .layui-table td {
    display: inline-block;
    width: auto;
    height: 40px;
  }

  /*.layui-table td span {*/
  /*display: inline-block;*/
  /*!*height: 500px;*!*/

  /*}*/


  .layui-input {
    width: 160px;
    height: 30px;
    margin-top: 10px;
    color: #8D8D8D;
    font-size: 14px;
  }

  .no-border {
    border: 0;
  }

  .layui-btn-normal{
    background-color: #408cd3 !important;
  }
  .all-button {
    width: 65px;
    height: 25px;
    border-radius: 3px;
  }

  .hide {
    display: none;
  }

  .has-border {
    border: 1px #40AFFE solid;
  }

  #item {
    text-align: center;
  }

  #item div label {
    display: inline-block;
    width: 101px;
    text-align: right;
    padding-right: 10px;
    color: #555555;
  }
  /*#item div select {*/
    /*display: inline-block;*/
    /*border: 1px #40AFFE solid;*/
  /*}*/

  .layui-input-new {
    display: inline-block;
    width: 160px;
    height: 25px;
    border-color: #99CCFF;
    border-radius: 5px;
    margin-right: 45px;
  }
  .layui-input-sss {
    width: 30px;
  }

  .box-button {
    margin-top: 20px;
    margin-bottom: 20px;
  }

  .hide {
    display: none;
  }
</style>
