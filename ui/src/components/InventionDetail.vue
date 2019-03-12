<template>
  <div v-cloak>
    <div class="layui-row bgc">
      <div class="big-div layui-row">
        <div class="head">
          <div class="logo-name">
            Invention - <span style="display: inline-block;color: black">{{invention.full_serial}}</span>
          </div>
          <button class="layui-btn layui-btn-primary layui-btn-xs all-button kong-xin right margin-10"
                  v-if="inventionUpdate"
                  @click="toEdit()">Edit
          </button>
        </div>
        <div class="content">
          <div class="content-top">

            <div class="content-col-one">
              <label>Invention Tile</label>
              <span class="content-ellipsis">{{invention.title}}</span>
            </div>
            <div class="content-col-one" v-if="progressUpdate">
              <label>Progress</label>
              <select v-model="invention.progress_key" class="layui-input layui-select-new"
                      style="display: inline-block;width: 80px;" id="inventionProgressChange" @change="changProgress()">
                <option :value="item['key_id']" v-for="item in inventionProgress"> {{item['key_value']}}</option>
              </select>
            </div>
            <div class="content-col-one" v-else>
              <label>Progress</label>
              <span>{{invention.progress_name}}</span>
            </div>

            <div class="content-col-one">
              <label>Priority</label>
              <span>{{invention.priority_name}}</span>
            </div>
            <div class="content-col-one">
              <label>Application Type</label>
              <span>{{invention.application_type}}</span>
            </div>
            <div class="content-col-one">
              <label>Application Country</label>
              <span>{{invention.application_country}}</span>
            </div>
            <div class="content-col-one">
              <label>Project No</label>
              <span>{{invention.project_no}}</span>
            </div>


            <div class="content-col-one">
              <label>Project Status</label>
              <span>{{invention.project_status}}</span>
            </div>
            <div class="content-col-one">
              <label>Exp Disclosure Time</label>
              <span>{{invention.expect_disclosure_time}}</span>
            </div>
            <div class="content-col-one">
              <label>Related Technology</label>
              <span>{{invention.related_technology}}</span>
            </div>
            <div class="content-col-one">
              <label>Related Feature</label>
              <span>{{invention.related_feature}}</span>

            </div>
            <div class="content-col-one">
              <label>Conclusion</label>
              <span>{{invention.conclusion_name}}</span>
            </div>
            <div class="content-col-one">
              <label>First Inventor</label>
              <span>{{invention.first_inventor ? invention.first_inventor.real_name : ''}}</span>
            </div>
            <div class="content-col-one">
              <label>First Inventor No.</label>
              <span
                class="content-ellipsis">{{invention.first_inventor ? invention.first_inventor.identity_no : ''}}</span>
            </div>
            <div class="content-col-one">
              <label>Other Inventor</label>
              <span class="content-ellipsis">{{invention.inventor_list|otherInventorJoint}}</span>
            </div>

          </div>
          <div class="content-bottom">
            <div class="layui-tab layui-tab-brief" lay-filter="docDemoTabBrief">
              <ul class="layui-tab-title">
                <li class="layui-this">Files</li>
                <li>log</li>
              </ul>
              <div class="layui-tab-content">
                <div class="layui-tab-item layui-show">
                  <table class="layui-table" lay-skin="nob" lay-size="sm" id="fileList">
                    <tbody>
                    <template v-for="(item,index) in inventionFileList">
                      <tr>
                        <td>{{index+1}}</td>
                        <td>{{item.origin_name}}</td>
                        <td>{{item.file_size |sizeCompute}}kB</td>
                        <td>{{item.create_time}}</td>
                        <td>
                          <span style="display: inline-block">
                            <a :href="host + '/patent/inventionFile/downloadFile?inventionFileId=' + item.id"
                               target="_blank">
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
                  <table class="layui-table" lay-skin="nob" lay-size="normal">
                    <tbody>
                    <template v-for="(item,index) in inventionLogList">
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
        <a class="" id="upload_file">Upload</a>
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
  import $ from 'jquery'

  export default {
    name: "InventionDetail",
    data() {
      return {
        host: window.host,
        inventionId: this.$route.query.invention_id,
        invention: {},
        fileType: '',
        inventionFileList: [],
        inventionLogList: [],
        inventionUpdate: false,
        progressUpdate: false,
        inventionProgress: [],
        fileTypeOptions: [],
      }
    },
    mounted: function () {
      var vm = this;
      vm.getFileTypeOptions();
      vm.fileType = vm.fileTypeOptions[0]['key_id'];
      vm.bindUpload();

    },
    created: function () {
      var vm = this;
      vm.getFileList();
      vm.getInvention();
      vm.getInventionLog();
    },
    methods: {
      getInvention: function () {
        var vm = this;
        layui.jquery.ajax({
          type: "get",
          xhrFields: {
            withCredentials: true
          },
          dataType: "json",
          url: window.host + '/patent/invention/view',
          data: {id: vm.inventionId},
          success: function (data) {
            if (data['success']) {
              console.log(data);
              vm.invention = data['ret_obj']['data'];
              console.log(vm.invention)
              vm.inventionUpdate = data['ret_obj']['vo']['invention_update'];
              vm.progressUpdate = data['ret_obj']['vo']['progress'];
            } else {
              layer.alert('更新失败');
            }
          },
          error: function () {
            console.log("异常！");
          }
        });

        layui.jquery.ajax({
          type: "get",
          xhrFields: {
            withCredentials: true
          },
          dataType: "json",
          url: window.host + '/patent/list_field',
          data: {filedName: 'Invention Progress'},
          success: function (data) {
            if (data['success']) {
              vm.inventionProgress = data['ret_obj'];
            }
          },
          error: function () {
            console.log("异常！");
          }
        });
      },
      getFileList: function () {
        var vm = this;

        layui.jquery.ajax({
          type: "get",
          xhrFields: {
            withCredentials: true
          },
          dataType: "json",
          url: window.host + '/patent/inventionFile/list',
          data: {inventionId: vm.inventionId},
          success: function (data) {
            if (data['success']) {
              vm.inventionFileList = data['ret_obj'];
            } else {
              // 弹窗提示失败
            }
          },
          error: function () {
            console.log("异常！");
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
              type: "POST",
              xhrFields: {
                withCredentials: true
              },
              dataType: "json",
              url: window.host + '/patent/inventionFile/delete',
              data: {id: fileId},
              success: function (data) {
                if (data['success']) {
                  layer.msg('已删除');
                  vm.getFileList();
                } else {
                  layer.alert(data['ret_msg']);
                }
              },
              error: function () {
                console.log("异常！");
              }
            });
          }, function () {
            layer.closeAll();
          }
        );


        // layer.open({
        //   type: 1,
        //   title: false,
        //   closeBtn: 0,
        //   shadeClose: true,
        //   // skin: 'yourclass',
        //   content: '自定义HTML内容'
        // });

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
      bindUpload: function () {
        var vm = this;
        var upload = layui.upload;
        var layer = layui.layer;
        upload.render({
          elem: '#upload_file',
          url: vm.host + '/patent/inventionFile/save',
          data: {
            inventionId: vm.inventionId,
            uploadType: vm.fileType
          },
          accept: 'file',
          auto: false,
          bindAction: '#fileSave',
          done: function (res) {
            console.log(res);
            //上传完毕回调
            layer.msg(res['ret_msg']);
            $('#items').addClass('hide');
            vm.getFileList();
          },
          error: function () {
            console.log('上传异常')
            //请求异常回调
          }
        });
        // layui.use(['upload', 'layer'], function () {
        //
        // });
      },
      getSelect: function () {
        var vm = this;
        vm.fileType = layui.jquery("#fileType").val();
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
          data: {filedName: 'Invention Upload Files Type'},
          success: function (data) {
            if (data['success']) {
              vm.fileTypeOptions = data['ret_obj'];
            } else {
              console.log('获取失败');
            }
          }
        })
      },
      closeModal: function () {
        layui.layer.closeAll();
      },
      getInventionLog: function () {
        var vm = this;
        layui.jquery.ajax({
          url: vm.host + '/patent/inventionChangeLog/list',
          type: 'POST',
          dataType: 'json',
          async: false,
          xhrFields: {
            withCredentials: true
          },
          data: {inventionId: vm.inventionId},
          success: function (data) {
            if (data['success']) {
              vm.inventionLogList = data['ret_obj'];
            } else {
              console.log('专利日志信息获取失败')
            }
          },
          error: function (res) {
            console.log('请求失败！');
          }
        })
      },
      toEdit: function () {
        var vm = this;
        vm.$router.push({
          path: '/invention_edit',
          name: 'InventionEdit',
          query: {
            invention_id: vm.inventionId,
          },
        });
      },
      changProgress: function () {
        var vm = this;
        var select = layui.jquery('#inventionProgressChange');
        layui.jquery.ajax({
          type: "post",
          xhrFields: {
            withCredentials: true
          },
          dataType: "json",
          url: window.host + '/patent/invention/update_progress',
          data: {id: vm.inventionId, progressKey: select.val()},
          success: function (data) {
            if (data.success) {
              layer.alert('更新成功');
              console.log(12313)
            } else {
              layer.alert('更新失败');
            }
          },
          error: function () {
            console.log("异常！");
          }
        });
      }
    },
    filters: {
      sizeCompute: function (size) {
        return (size / 1024).toFixed(2);
      },
      otherInventorJoint(otherInventorList) {
        var result = '';
        for (var i = 0; otherInventorList && i < otherInventorList.length; i++) {
          result = result + otherInventorList[i].real_name;
          if (i != otherInventorList.length - 1) {
            result = result + ",";
          }
        }
        return result;
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
  label {
    font-weight: bolder;
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
    width: 53%;
    font-size: 14px;
    color: #6B6B6B;
  }

  .content-col-one span {
    display: inline-block;
    color: #A8A8A8;
    width: 45%;
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

  .layui-table tbody  td {
    font-size: 14px;
  }
  .layui-tab-title li {
    /*padding-left: 0;*/
    /*text-align: left;*/
    font-size: 24px;
    color: #6d9eeb;
  }

  .layui-select-new {
    height: 20px;
    color: #8D8D8D;
    border: 1px #555555 dot-dash;
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

  /*.content-ellipsis {*/
  /*overflow: hidden;*/
  /*white-space: nowrap;*/
  /*text-overflow: ellipsis;*/
  /*}*/

  /*.content-ellipsis:hover {*/
  /*text-overflow: inherit;*/
  /*overflow: visible;*/
  /*white-space: normal;*/
  /*word-break:break-all;*/
  /*height: auto;*/
  /*}*/
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
    /*line-height: 13px;*/
    /*height: 15px;*/
  }
</style>
