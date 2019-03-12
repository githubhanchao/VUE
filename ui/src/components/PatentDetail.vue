<template>
  <div v-cloak>
    <div class="layui-row bgc">
      <div class="big-div layui-row">
        <div class="head">
          <div class="logo-name">
            Patent - <span style="display: inline-block;color: black">{{patentObj.full_serial}}</span>
          </div>
          <button v-if="canEdit" class="layui-btn layui-btn-primary layui-btn-xs all-button kong-xin right margin-10"
                  @click="toEdit()">Edit
          </button>
        </div>
        <div class="content">
          <div class="content-top">
            <div class="content-col-one">
              <label>Patent Tile</label>
              <span class="content-ellipsis">{{patentObj.title}}</span>
            </div>
            <div class="content-col-one">
              <label>Related Feature</label>
              <span>{{patentObj.related_feature}}</span>
            </div>
            <div class="content-col-one">
              <label>Current Patentee</label>
              <span class="content-ellipsis">{{patentObj.current_patentee}}</span>
            </div>
            <div class="content-col-one">
              <label>Submit Time</label>
              <span>{{patentObj.create_time}}</span>
            </div>
            <div class="content-col-one">
              <label>Status</label>
              <span>{{patentObj.status_value}}</span>
            </div>
            <div class="content-col-one">
              <label>Concrete Status</label>
              <span>{{patentObj.concrete_status_value}}</span>
            </div>

            <!--<div class="content-col-one">-->
            <!--<label>Type</label>-->
            <!--<span>{{patentObj.patent_type}}</span>-->
            <!--</div>-->
            <div class="content-col-one">
              <label>First Filling</label>
              <span>{{patentObj.first_filling|firstFilling}}</span>
            </div>
            <div class="content-col-one" v-if="patentObj.first_filling">
              <label>Priority Patent ID</label>
              <span>{{patentObj.parent_full_serial}}</span>
            </div>
            <div class="content-col-one" v-if="patentObj.first_filling">
              <label>Relationship</label>
              <span>{{patentObj.relation_ship_name}}</span>
            </div>

            <div class="content-col-one">
              <label>Country</label>
              <span>{{patentObj.application_country}}</span>
            </div>
            <div class="content-col-one">
              <label>Application No.</label>
              <span>{{patentObj.application_no}}</span>
            </div>
            <div class="content-col-one">
              <label>Responsible Person</label>
              <span>{{patentObj.responsible_person}}</span>
            </div>
            <div class="content-col-one">
              <label>First Inventor</label>
              <!--<span v-for="item in patentObj.inventor_list">-->
              <!--<span style="display: inline-block">{{item.real_name}},</span>-->
              <!--</span>-->
              <span>{{patentObj.first_inventor.real_name}}</span>
            </div>
            <div class="content-col-one">
              <label>Project ID</label>
              <span>{{patentObj.project_no}}</span>
            </div>
            <div class="content-col-one">
              <label>Other Inventor(s)</label>
              <span class="content-ellipsis">
                <template v-for="item in patentObj.inventor_list">
                  {{item.real_name}},
                </template>
              </span>
            </div>
            <div class="content-col-one">
              <label>Application Date</label>
              <span>{{patentObj.application_date}}</span>
            </div>
            <div class="content-col-one">
              <label>Patent Law Firm</label>
              <span class="content-ellipsis">{{patentObj.law_firm}}</span>
            </div>
            <div class="content-col-one">
              <label>Patent No.</label>
              <span>{{patentObj.patent_no}}</span>
            </div>
            <div class="content-col-one">
              <label>Related Tech</label>
              <span>{{patentObj.related_technology}}</span>
            </div>
            <div class="content-col-one">
              <label>Applicant</label>
              <span class="content-ellipsis">{{patentObj.applicant}}</span>
            </div>
            <div class="content-col-one">
              <label>Law Firm No.</label>
              <span>{{patentObj.patent_law_firm_no}}</span>
            </div>
            <div class="content-col-one">
              <label>Patent Issue Date</label>
              <span>{{patentObj.issue_date}}</span>
            </div>
            <div class="content-col-one">
              <label>Application Type</label>
              <span>{{patentObj.application_type}}</span>
            </div>
          </div>
          <div class="content-bottom">
            <div class="layui-tab layui-tab-brief" lay-filter="docDemoTabBrief">
              <ul class="layui-tab-title">
                <li class="layui-this">Files</li>
                <li>Patent Family</li>
                <li>log</li>
              </ul>
              <div class="layui-tab-content">
                <div class="layui-tab-item layui-show">
                  <table class="layui-table" lay-skin="nob" lay-size="sm" id="fileList">
                    <tbody>
                    <template v-for="(item,index) in patentFileList">
                      <tr>
                        <td>{{index+1}}</td>
                        <td>{{item.origin_name}}</td>
                        <td>{{item.upload_type_value}}</td>
                        <td>{{item.file_size |sizeCompute}}kB</td>
                        <td>{{item.create_time}}</td>
                        <td>
                          <span style="display: inline-block">
                            <a :href="host + '/patent/patentFile/downloadFile?id=' + item.id" target="_blank">
                              <i class="layui-icon layui-icon-download-circle"></i>
                            </a>
                          </span>
                          <span style="display: inline-block;margin-left: 20px;">
                            <i class="layui-icon layui-icon-delete" @click="deleteFile(item.id)"></i>
                          </span>
                        </td>
                      </tr>
                    </template>
                    </tbody>
                  </table>
                  <button class="layui-btn layui-btn-normal layui-btn-xs all-button margin15" @click="showUpload()">
                    Upload
                  </button>
                </div>
                <div class="layui-tab-item">
                  <div id="union_charts" style="height: 200px;width: 1090px"></div>
                </div>
                <div class="layui-tab-item">
                  <table class="layui-table" lay-skin="nob" lay-size="sm">
                    <tbody>
                    <template v-for="(item,index) in logList">
                      <tr>
                        <td>{{index+1}}</td>
                        <td>{{item.field}}</td>
                        <td>{{item.action}}</td>
                        <td>{{item.modify_value}}</td>
                      </tr>
                    </template>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="hide" id="items">
      <div style="margin-left: 20%;margin-top: 5%">
        <label for="">File Type</label>
        <select id="fileType" class="layui-select"
                style="height: 30px;border-radius: 10px;color: #8D8D8D;margin-left: 20px" @change="getSelect()">
          <option v-for="item in fileTypeOptions" :value="item.key_id">{{item.key_value}}</option>
        </select>
        <a class="" id="upload">Upload</a>
      </div>
      <div style="margin-left: 20%;margin-top: 5%">
        <button class="layui-btn layui-btn-primary layui-btn-xs all-button kong-xin"
                @click="closeModal()">Cancel
        </button>
        <button class="layui-btn layui-btn-normal layui-btn-xs all-button" id="fileSave" @click="closeModal()"
                style="margin-left: 26%">
          Save
        </button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "PatentDetail",
    data() {
      return {
        host: window.host,
        patentId: '',
        patentObj: '',
        canEdit: false,
        fileType: '',
        patentFileList: [],
        relatedPatentObj: [],
        fileTypeOptions: [],
        logList: [],

      }
    },
    mounted: function () {
      var vm = this;
      vm.getFileTypeOptions();
      vm.fileType = vm.fileTypeOptions[0]['key_id'];
      vm.bindUpload();
      // vm.unionCharts();
    },
    created: function () {
      var vm = this;
      vm.patentId = vm.$route.query.p_id;
      vm.getFileList();
      vm.getPatent();
      vm.getPatentLog();
      vm.getRelatedPatent();
    },
    methods: {
      getPatent: function () {
        var vm = this;
        layui.jquery.ajax({
          url: vm.host + '/patent/patent/view',
          type: 'POST',
          dataType: 'json',
          async: false,
          xhrFields: {
            withCredentials: true
          },
          data: {id: vm.patentId},
          success: function (data) {
            if (data['success']) {
              vm.patentObj = data['ret_obj']['data'];
              vm.canEdit = data['ret_obj']['vo']['patent_update']
            } else {
              console.log('专利信息获取失败')
            }
          },
          error: function (res) {
            console.log('请求失败！');
          }
        })
      },
      getFileList: function () {
        var vm = this;
        layui.jquery.ajax({
          url: vm.host + '/patent/patentFile/list',
          type: 'POST',
          dataType: 'json',
          async: false,
          data: {patentId: vm.patentId},
          xhrFields: {
            withCredentials: true
          },
          success: function (data) {
            if (data['success']) {
              vm.patentFileList = data['ret_obj'];
            } else {
              // 弹窗提示失败
            }
          }
        });
      },
      deleteFile: function (fileId) {
        var vm = this;
        var layer = layui.layer;
        layer.confirm('确定要删除吗？', {
            btn: ['删除', '取消']
          }, function () {
            layui.jquery.ajax({
              url: vm.host + '/patent/patentFile/delete',
              type: 'POST',
              dataType: 'json',
              data: {id: fileId},
              xhrFields: {
                withCredentials: true
              },
              success: function (data) {
                if (data['success']) {
                  layer.msg('已删除');
                  vm.getFileList();
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

        // layui.use('layer', function () {
        //
        // });
      },
      getFileTypeOptions: function () {
        var vm = this;
        layui.jquery.ajax({
          url: vm.host + '/patent/list_field',
          type: 'GET',
          dataType: 'json',
          async: false,
          xhrFields: {
            withCredentials: true,
          },
          data: {filedName: 'Patent Upload Files Type'},
          success: function (data) {
            if (data['success']) {
              vm.fileTypeOptions = data['ret_obj'];
            } else {
              console.log('获取失败');
            }
          }
        })
      },
      showUpload: function () {
        var $ = layui.jquery;
        // $('#items').removeClass('hide');
        var vm = this;
        var layer = layui.layer;
        layer.open({
          title: 'Upload',
          type: 1,
          skin: 'layui-layer-demo', //样式类名
          closeBtn: 0, //不显示关闭按钮
          anim: 2,
          area: ['400px', '200px'],
          shadeClose: false, //开启遮罩关闭
          content: $('#items'),
          end: function () {
            $('#items').addClass('hide');
          }
        });
      },
      getSelect: function () {
        var vm = this;
        vm.fileType = layui.jquery("#fileType").val();
      },
      closeModal: function () {
        layui.layer.closeAll();
      },
      bindUpload: function () {
        var $ = layui.jquery;
        var vm = this;
        var upload = layui.upload;
        var layer = layui.layer;
        var uploadInst = upload.render({
          elem: '#upload',
          url: vm.host + '/patent/patentFile/save',
          data: {
            patentId: vm.patentId,
            uploadType: vm.fileType
          },
          accept: 'file',
          // exts: 'png',
          auto: false,
          bindAction: '#fileSave',
          done: function (res) {
            console.log(res);
            $('#items').addClass('hide');
            //上传完毕回调
            vm.getFileList();
            layer.msg(res['ret_msg']);
          },
          error: function () {
            console.log('上传异常')
            //请求异常回调
          }
        });
      },
      getPatentLog: function () {
        var vm = this;
        layui.jquery.ajax({
          url: vm.host + '/patent/patentChangeLog/list',
          type: 'POST',
          dataType: 'json',
          async: false,
          xhrFields: {
            withCredentials: true
          },
          data: {patentId: vm.patentId},
          success: function (data) {
            if (data['success']) {
              vm.logList = data['ret_obj'];
            } else {
              console.log('专利日志信息获取失败')
            }
          },
          error: function (res) {
            console.log('请求失败！');
          }
        })
      },
      unionCharts: function () {
        var vm = this;
        var echarts = require('echarts');
        var myChart = echarts.init(document.getElementById('union_charts'));
        var nodes = [];
        var nodes_id = [];
        var links = [];
        var obj;
        myChart.showLoading();
        for (var index in vm.relatedPatentObj) {
          obj = {};
          obj['name'] = vm.relatedPatentObj[index]['full_serial'];
          obj['value'] = 1;
          obj['category'] = 0;
          nodes_id.push(vm.relatedPatentObj[index]['id']);
          nodes.push(obj);
        }
        for (var index in vm.relatedPatentObj) {
          if (vm.relatedPatentObj[index]['parent_id'] != 0) {
            obj = {};
            obj['source'] = parseInt(index);
            obj['target'] = nodes_id.indexOf(vm.relatedPatentObj[index]['parent_id']);
            links.push(obj);
          }
        }
        var webkitDep = {
          "type": "force",
          "categories": [//关系网类别，可以写多组
            {
              "name": "Patent",//关系网名称
              "keyword": {},
              "base": "Patent",
            },
          ],

          nodes: nodes,
          links: links
        };
        myChart.hideLoading();
        var option = {
          legend: {
            data: ['Patent'],//此处的数据必须和关系网类别中name相对应
            // align: 'left',
            left: 0,
            itemGap: 15,
            itemWidth: 15,
            itemHeight: 15,
            textStyle: {
              color: '#A8A8A8'
            }
          },
          series: [{
            type: 'graph',
            layout: 'force',
            animation: false,
            symbol: 'squareRatio',
            label: {
              normal: {
                show: true,
                position: 'right',
              },
            },
            color: ["#6d9eeb"],
            draggable: true,
            data: webkitDep.nodes.map(function (node, idx) {
              node.id = idx;
              return node;
            }),
            categories: webkitDep.categories,
            force: {
              edgeLength: 105,//连线的长度
              repulsion: 120  //子节点之间的间距
            },
            edges: webkitDep.links
          }]
        };
        myChart.setOption(option);
      },
      toEdit: function () {
        var vm = this;
        vm.$router.push({
          path: '/patent_edit',
          name: 'PatentEdit',
          query: {
            patent_id: vm.patentId,
          },
        });
      },
      getRelatedPatent: function () {
        var vm = this;
        layui.jquery.ajax({
          url: vm.host + '/patent/patent/family',
          type: 'POST',
          dataType: 'json',
          xhrFields: {
            withCredentials: true
          },
          data: {id: vm.patentId},
          success: function (data) {
            if (data['success']) {
              vm.relatedPatentObj = data['ret_obj'];
              vm.unionCharts();
            } else {
              console.log(data['ret_msg']);
              vm.unionCharts();
            }
          },
          error: function () {
            vm.unionCharts();
            console.log('请求失败')
          }
        });

      },
    },
    filters: {
      sizeCompute: function (size) {
        return (size / 1024).toFixed(2);
      },
      firstFilling: function (flog) {
        switch (flog) {
          case 0:
            return '否';
            break;
          case 1:
            return '是';
            break;
        }
      }
    }
  }
</script>

<style scoped>
  [v-cloak] {
    display: none;
  }


  .head {
    height: auto;
    /*margin-top: 10px;*/
  }

  .bgc {
    margin-top: 20px;
    padding: 10px 15px 20px 15px;
    background-color: #F2F2F2;
    box-shadow: 1px 0px 1px #A8A8A8
  }

  .big-div {
    background-color: white;
    padding: 5px 15px 20px 15px;
    border-radius: 8px;
    border-top: 1px #E6E6E6 solid;
    border-bottom: 1px #E6E6E6 solid;
    box-shadow: 0px 0px 1px #A8A8A8
  }

  .logo-name {
    position: relative;
    width: 30%;
    top: 10px;
    bottom: 0;
    font-size: 24px;
    font-weight: bold;
    color: #408cd3;
  }

  .all-button {
    width: 80px;
    height: 30px;
    border-radius: 3px;
  }
  .layui-btn-normal {
    background-color: #408cd3;
  }
  .kong-xin {
    color: #1E9FFF;
    border: 1px #408cd3 solid;
  }

  .right {
    float: right;
  }
  .margin-10 {
    margin-top: -20px;
  }

  .margin15 {
    margin-top: 15px;
  }

  .content {
    height: auto;
    margin-top: 15px;
  }

  .content-top {
    /*margin-top: -20px;*/
    height: auto;
    width: 100%;
    /*text-align: right;*/
    /*background-color: #00F7DE;*/
  }

  .content-bottom {
    margin-top: 50px;
  }

  .content-col-one {
    /*background-color: #00F7DE;*/
    padding-top: 30px;
    display: inline-block;
    width: 19.7%;
    height: 30px;
    line-height: 30px;
  }

  .content-col-one label {
    display: inline-block;
    text-align: left;
    width: 52%;
    font-size: 14px;
    color: #6B6B6B;
  }

  .content-col-one span {
    display: inline-block;
    color: #A8A8A8;
    width: 46%;
    font-size: 14px;
  }

  .layui-tab-brief > .layui-tab-title .layui-this {
    color: #408cd3;
    font-weight: bolder;

  }

  .layui-tab-brief > .layui-tab-title .layui-this:after {
    border: none;
    border-radius: 0;
    border-bottom: 2px solid #1E9FFF;
  }

  .layui-tab-title li {
    /*padding-left: 0;*/
    /*text-align: left;*/
    font-size: 24px;
    color: #6d9eeb;
  }
  .layui-table tbody  td {
    font-size: 14px;
  }
  .hide {
    display: none;
  }

  #items label {
    color: #555555;
  }

  #items a {
    color: #40AFFE;
    display: block;
  }
  label {
    font-weight: bolder;
  }

  .content-ellipsis {
    padding-top: 5px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    line-height: 15px;
    cursor: pointer;
  }

  .content-ellipsis:hover {
    text-overflow: inherit;
    overflow: visible;
    background-color: black;
    color: white;
    position: absolute;
    width: auto;
    cursor: pointer;
    padding: 2px 4px 2px 4px;
    /*line-height: normal;*/
    /*white-space: normal;*/
    /*word-break: break-all;*/
    /*height: auto;*/
    /*height: 15px;*/
  }
</style>
