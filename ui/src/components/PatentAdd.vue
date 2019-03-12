<template>
  <div id="patent" v-cloak>
    <div class="layui-row bgc">
      <div class="layui-row table-col">
        <div class="content layui-form">
          <div class="clear-float">
            <div class="add-title">
              <span style="color: #3F90DF">Patent </span> - <span> New Patent</span>
            </div>
            <div>
              <div class="number fl">1</div>
              <div class="fl input-group">
                <label class="layui-form-label">Patent Title</label>
                <input lay-verify="required" type="text" name="title" placeholder="" autocomplete="off"
                       class="layui-input" style="width: 400px">
              </div>
              <div class="fl input-group">
                <label class="layui-form-label">Patent ID</label>
                <div style="display: inline-block">
                  <input type="text" name="fullSerial" placeholder="" class="layui-input" style="width: 250px"
                         id="fullSerial">
                </div>
              </div>
            </div>
          </div>

          <hr class="split-hr"/>

          <div class="clear-float layui-row">
            <div class="number fl">2</div>
            <div class="fl input-group">
              <label class="layui-form-label">Invention ID</label>
              <div style="display: inline-block;">
                <input fillin="false" lay-verify="" type="text" name="inventionFullSerial" placeholder=""
                       autocomplete="off" class="layui-input" id="inventionId">
              </div>
            </div>
            <div class="fl input-group">
              <label class="layui-form-label">First Inventor</label>
              <div style="display: inline-block">
                <input type="text" lay-verify="required"
                       name="" fillin="false" placeholder="Name" autocomplete="off"
                       :data-patent-first="firstInventor.login_name"
                       :data-patent-second="firstInventor.real_name"
                       :value="firstInventor.real_name!= undefined ? firstInventor.real_name : ''"
                       class="layui-input" style="width: 150px;margin-left: 10px;"
                       id="firstInventor">
              </div>
            </div>
            <div class="fl input-group">
              <input type="text" name="firstInventorNo" lay-verify="required|identity" placeholder="ID Number"
                     autocomplete="off" class="layui-input"
                     :value="firstInventor.identity_no !=undefined ? firstInventor.identity_no : ''">
            </div>
          </div>
          <div class="clear-float layui-row">
            <div class="fl input-group margin-left">
              <label class="layui-form-label">Other Inventors</label>
              <div class="fl input-group" v-for="(item,index) in otherInventor">
                <input type="text" name="" fillin="true" placeholder="" autocomplete="off"
                       :data-patent-first="item.login_name"
                       :data-patent-second="item.real_name" :value="item.real_name!=undefined ? item.real_name : ''"
                       class="layui-input inventor" style="width: 150px;margin-left: 5px;"
                       :id="'otherInventors'+index">
              </div>
              <i class="layui-icon layui-icon-add-circle add-inventor" @click="addInventor"></i>
            </div>

          </div>

          <hr class="split-hr"/>

          <div class="clear-float layui-row">
            <div class="number fl">3</div>
            <div class="fl input-group">
              <label class="layui-form-label">Application No.</label>
              <input type="text" name="applicationNo" placeholder="" lay-verify="required" autocomplete="off"
                     class="layui-input">
            </div>

            <div class="fl input-group">
              <label class="layui-form-label">Application Type</label>
              <div class="layui-input-inline">
                <select name="applicationTypeKey" lay-verify="required" lay-ignore="" class="layui-input">
                  <option :value="item['key_id']" v-for="item in applicationTypeList"> {{item['key_value']}}</option>
                </select>
              </div>
            </div>

            <div class="fl input-group">
              <label class="layui-form-label">Country</label>
              <div class="layui-input-inline">
                <select name="applicationCountryKey" lay-verify="required" lay-ignore="" class="layui-input">
                  <option :value="item['id']" v-for="item in countryList"> {{item['name']}}</option>
                </select>
              </div>
            </div>

            <div class="fl input-group margin-left">
              <label class="layui-form-label">Applicant</label>
              <div class="layui-input-inline">
                <select name="applicantId" lay-verify="required" class="layui-input" lay-ignore="">
                  <option :value="item['id']" v-for="item in applicantList"> {{item['name']}}</option>
                </select>
              </div>
            </div>
            <div class="fl input-group">
              <label class="layui-form-label">Application Date</label>
              <input name="applicationDate" type="text" autocomplete="off" class="layui-input" style="width: 100px" id="applicationDate"
                     lay-verify="required">
            </div>
            <div class="fl input-group">
              <label class="layui-form-label">Patent No.</label>
              <input type="text" name="patentNo" placeholder="" autocomplete="off" class="layui-input" lay-verify="">
            </div>
            <div class="fl input-group margin-left">
              <label class="layui-form-label">Current Patentee</label>
              <div class="layui-input-inline">
                <select name="currentPatenteeId" lay-verify="" lay-ignore="" class="layui-input">
                  <option value=" ">--------</option>
                  <option :value="item['id']" v-for="item in applicantList"> {{item['name']}}</option>
                </select>
              </div>
            </div>
            <div class="fl input-group">
              <label class="layui-form-label">Patent Status</label>
              <div class="layui-input-inline">
                <select name="status" lay-verify="" class="layui-input" lay-ignore="" lay-filter="status"
                        @change="bindStatus()">
                  <option value=" ">---------</option>
                  <option :value="item['key_id']" v-for="item in statusList">
                    {{item['key_value']}}
                  </option>
                </select>
              </div>
            </div>
            <div class="fl input-group hide" id="concreteStatus">
              <label class="layui-form-label">Concrete Status</label>
              <div class="layui-input-inline">
                <select name="concreteStatus" lay-verify="" class="layui-input" lay-ignore="">
                  <option value=" ">---------</option>
                  <option :value="item['key_id']" v-for="item in concreteStatusList">
                    {{item['key_value']}}
                  </option>
                </select>
              </div>
            </div>
            <!--<div class="fl input-group">-->
            <!--<label>Patent Issue Date</label>-->
            <!--<input name="issueDate" type="text" class="layui-input " style="width: 100px" id="issueDate" lay-verify="">-->
            <!--</div>-->
          </div>

          <hr class="split-hr"/>

          <div class="clear-float layui-row">
            <div class="number fl">4</div>
            <div class="fl input-group">
              <label class="layui-form-label">Project ID</label>
              <input type="text" name="projectNo" placeholder="" autocomplete="off" class="layui-input " lay-verify=''>
            </div>
            <div class="fl input-group">
              <label class="layui-form-label" style="width: 120px">Project Status</label>
              <div class="layui-input-block" style="margin-left: 150px">
                <select name="projectStatusKey" lay-verify="required" class="layui-input" lay-ignore="">
                  <option :value="item['key_id']" v-for="item in projectStatusList"> {{item['key_value']}}</option>
                </select>
              </div>
            </div>
            <div class="fl input-group">
              <label class="layui-form-label">Related Tech</label>
              <div style="display: inline-block">
                <input type="text" lay-verify="required" name="relatedTechnology" placeholder="" autocomplete="off"
                       class="layui-input" id="relatedTech">
              </div>
            </div>
            <div class="fl input-group margin-left">
              <label class="layui-form-label">Related Feature</label>
              <div style="display: inline-block">
                <input type="text" name="relatedFeature" lay-verify="required" placeholder="" autocomplete="off"
                       class="layui-input " style="width: 250px" id="relatedFeature">
              </div>
            </div>
            <div class="fl input-group">
              <label class="layui-form-label" style="width: 150px;">Responsible Person</label>
              <div style="display: inline-block">
                <input type="text" name="responsiblePerson" lay-verify="required" placeholder="" autocomplete="off"
                       class="layui-input ">
              </div>
            </div>
          </div>

          <hr class="split-hr"/>
          <div class="clear-float layui-row">
            <div class="number fl">5</div>
            <div class="fl input-group">
              <label class="layui-form-label">First Filing</label>
              <input type="checkbox" name="firstFilling" lay-skin="primary" lay-ignore=""
                     v-model="firstFiling" id="firstFiling" lay-filter="firstFiling"
                     style="margin-top: 10px;margin-left: 15px"/>
            </div>
            <div class="fl input-group" v-show="!firstFiling">
              <label class="layui-form-label">Priority Patent ID</label>
              <div style="display: inline-block;">
                <input fillin="false" type="text" name="parentId" placeholder="" autocomplete="off" class="layui-input "
                       style="width: 200px;margin-left: 10px;" id="priorityPatentId">
              </div>
            </div>
            <div class="fl input-group" v-show="!firstFiling">
              <label class="layui-form-label" style="width: 120px">Relationship</label>
              <div class="layui-input-block" style="margin-left: 150px">
                <select name="relationship" lay-verify="required" class="layui-input" lay-ignore="">
                  <option :value="item['key_id']" v-for="item in relationShipList"> {{item['key_value']}}</option>
                </select>
              </div>
            </div>
          </div>

          <hr class="split-hr"/>

          <div class="clear-float">
            <div class="number fl">6</div>
            <div class="fl input-group">
              <label class="layui-form-label">Law Firm</label>
              <div class="layui-input-inline">
                <select name="lawFirmId" lay-verify="required" class="layui-input" lay-ignore="" style="width: 500px">
                  <option :value="item['id']" v-for="item in lawFirmList"> {{item['name']}}</option>
                </select>
              </div>
            </div>
            <div class="fl input-group" style="margin-top: 60px;margin-left: -685px">
              <label class="layui-form-label">Law Firm No.</label>
              <input type="text" name="patentLawFirmNo" placeholder="" lay-verify="required" autocomplete="off"
                     class="layui-input " style="width: 200px;margin-left: 15px;">
            </div>
          </div>

          <hr class="split-hr"/>

          <div class="clear-float">
            <div class="number fl">7</div>
            <div class="fl input-group">
              <label class="layui-form-label">文件类型</label>
              <div class="layui-input-inline">
                <select name="" lay-verify="required" class="layui-input" lay-ignore="" lay-filter="uploadFileType">
                  <option :value="item['key_id']" v-for="item in fileTypeList"> {{item['key_value']}}</option>
                </select>
              </div>
            </div>
            <button type="button" class="layui-btn" id="upload"
                    style="background-color: white;color: #408cd3;margin-top: 10px">
              <i class="layui-icon">&#xe67c;</i>上传文件
            </button>
            <div style="margin: 5px 50px;font-size: 18px;padding-bottom: 10px;" v-for="(item, index) in uploadFileList">
              <span>{{item.origin_name}}</span>
              <span style="margin-left: 30px;">{{item.upload_type_value}}</span>
              <span style="margin-left: 30px;">{{item.file_size|toKB}} KB</span>
              <i class="layui-icon layui-icon-delete" style="font-size: 25px;margin-left: 30px;"
                 @click="deleteUploadFile(index)"></i>
            </div>
          </div>

          <hr class="split-hr"/>

          <div>
            <button class="layui-btn layui-btn-primary layui-btn-xs all-button customize" @click="cancel">Cancel
            </button>
            <button class="layui-btn layui-btn-normal layui-btn-xs all-button search" lay-submit lay-filter="*">Save
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="fl input-group" style="display: none" id="inventorCopy">
      <input type="text" name="" fillin="false"
             class="layui-input  inventor" style="width: 100px;margin-left: 10px;">
    </div>

  </div>


</template>

<script>


  export default {
    name: "PatentAdd",
    data() {
      return {
        status: '',
        countryList: [],
        // typeList: [],
        applicantList: [],
        statusList: [],
        concreteStatusList: [],
        projectStatusList: [],
        lawFirmList: [],
        relationShipList: [],
        fileTypeList: [],
        firstFiling: true,
        patentFileTypeList: [],
        uploadFileType: 1,
        uploadFileList: [],
        requestCount: 0,
        applicationTypeList: [],
        firstInventor: {},
        otherInventor: [],
        identID: '',
      }
    },
    watch: {
      otherInventor: function () {
        this.$nextTick(function () {
          for (var i = 0; i < this.otherInventor.length; i++) {
            layui.autocomplete.render({
              elem: '#otherInventors' + i,
              url: window.host + '/patent/list_field?filedName=User',
              cache: false,
              template_val: '{{d.real_name}}',
              template_txt: '<span class=\'layui-badge layui-bg-gray\'>{{d.real_name}}</span>',
              onselect: function (resp) {

              }
            })
          }
        })
      },
      requestCount: function () {
        if (this.requestCount == 9) {
          setTimeout(function () {
            layui.form.render();
          }, 20)
        }
      },
      concreteStatusList: function () {
        // this.$nextTick(function () {
        //   var form = layui.form;
        //   form.render('select')
        // });
      }
    },
    created: function () {
      this.initData();
      this.otherInventor.push('');
    },
    mounted: function () {
      var vue = this;
      var laydate = layui.laydate;
      vue.bindStatus();
      laydate.render({
        elem: '#applicationDate',
        theme: '#2D93CA',
        format: 'yyyy-MM-dd',
        done: function (value) {

        }
      });
      // laydate.render({
      //   elem: '#issueDate',
      //   theme: '#2D93CA',
      //   format: 'yyyy-MM-dd',
      //   done: function (value) {
      //
      //   }
      // });
      // laydate.render({
      //   elem: '#expectDisclosureTime',
      //   theme: '#2D93CA',
      //   format: 'yyyy-MM-dd',
      //   done: function (value) {
      //
      //   }
      // })

      var form = layui.form;
      form.on('submit(*)', function (data) {
        var content = data.field;
        content['inventionId'] = layui.jquery('#inventionId').attr('data-patent-first');
        var inventors = '';
        layui.jquery('.inventor').each(function () {
          var temp = layui.jquery(this).val();
          if (temp != '' && typeof (temp) != "undefined" && temp != 0) {
            inventors = inventors + temp + ',';
          }
        })
        var fileIds = '';
        for (var i = 0; i < vue.uploadFileList.length; i++) {
          fileIds = fileIds + vue.uploadFileList[i].id + ',';
        }
        content['firstInventorLoginName'] = layui.jquery('#firstInventor').attr('data-patent-first')
        content['parentId'] = layui.jquery('#priorityPatentId').attr('data-patent-first');
        content['inventorsLoginName'] = inventors;
        content['fileIds'] = fileIds;
        content['firstFilling'] = vue.firstFiling ? 1 : 0;
        console.log(content);
        layui.jquery.ajax({
          type: "POST",
          xhrFields: {
            withCredentials: true
          },
          dataType: "json",
          url: window.host + "/patent/patent/add",
          data: content,
          success: function (res) {
            if (res.success) {
              layui.layer.msg('添加成功');
              vue.$router.push({
                path: '/patent_list',
                name: 'PatentList',
                query: {},
              });
            } else {
              layui.layer.msg(res.ret_msg);
            }
          },
          error: function () {
            console.log("异常！");
          }
        });
        return false;
      });
      form.on('checkbox(firstFiling)', function (data) {
        vue.firstFiling = data.elem.checked
      });
      form.on('select(uploadFileType)', function (data) {
        vue.uploadFileType = data.value
      });

      var autocomplete = layui.autocomplete;
      autocomplete.render({
        elem: '#inventionId',
        url: window.host + '/patent/list_field?filedName=Done Inventions',
        cache: false,
        template_val: '{{d.full_serial}}',
        template_txt: '<span class=\'layui-badge layui-bg-gray\'>{{d.full_serial}}</span>',
        onselect: function (resp) {

        }
      })
      autocomplete.render({
        elem: '#firstInventor',
        url: window.host + '/patent/list_field?filedName=User',
        cache: false,
        template_val: '{{d.real_name}}',
        template_txt: '<span class=\'layui-badge layui-bg-gray\'>{{d.real_name}}</span>',
        onselect: function (resp) {
          var vm = this;
          // vm.identID = '';
        }
      })
      autocomplete.render({
        elem: '#otherInventors0',
        url: window.host + '/patent/list_field?filedName=User',
        cache: false,
        template_val: '{{d.real_name}}',
        template_txt: '<span class=\'layui-badge layui-bg-gray\'>{{d.real_name}}</span>',
        onselect: function (resp) {

        }
      })
      autocomplete.render({
        elem: '#relatedTech',
        url: window.host + '/patent/list_field?filedName=Patent Related Technology',
        cache: false,
        template_val: '{{d.related_technology}}',
        template_txt: '<span class=\'layui-badge layui-bg-gray\'>{{d.related_technology}}</span>',
        onselect: function (resp) {

        }
      })
      autocomplete.render({
        elem: '#relatedFeature',
        url: window.host + '/patent/list_field?filedName=Patent Related Feature',
        cache: false,
        template_val: '{{d.related_feature}}',
        template_txt: '<span class=\'layui-badge layui-bg-gray\'>{{d.related_feature}}</span>',
        onselect: function (resp) {

        }
      })
      autocomplete.render({
        elem: '#priorityPatentId',
        url: window.host + '/patent/list_field?filedName=Patent No',
        cache: false,
        template_val: '{{d.full_serial}}',
        template_txt: '<span class=\'layui-badge layui-bg-gray\'>{{d.full_serial}}</span>',
        onselect: function (resp) {

        }
      })
      var upload = layui.upload;
      upload.render({
        elem: '#upload' //绑定元素
        , url: window.host + '/patent/patentFile/save'
        , accept: 'file'
        , data: {
          uploadType: vue.uploadFileType
        }
        , done: function (res) {
          if (res.success) {
            vue.reloadData();
            vue.uploadFileList.push(res.ret_obj)
          }
        }
        , error: function () {

        }
      });

      layui.jquery('#inventionId').change(function () {
        var v = this;
        setTimeout(function () {
          var inventionId = layui.jquery(v).attr('data-patent-first');
          if (inventionId > 0) {
            layui.jquery.ajax({
              type: "POST",
              xhrFields: {
                withCredentials: true
              },
              dataType: "json",
              url: window.host + "/patent/invention/list_inventor",
              data: {id: inventionId},
              success: function (res) {
                if (res.success) {
                  var result = res.ret_obj;
                  vue.firstInventor = result.first_inventor;
                  vue.identID = result.first_inventor.identity_no;
                  vue.otherInventor = result.inventor_list;
                  if (vue.otherInventor.length < 1) {
                    vue.otherInventor.push('');
                  }
                } else {
                  layui.layer.msg(res.ret_msg);
                }
              },
              error: function () {
                console.log("异常！");
              }
            });
          }

        }, 200)
      })
    },
    methods: {
      initData: function () {
        var vue = this;
        layui.jquery.ajax({
          type: "GET",
          xhrFields: {
            withCredentials: true
          },
          dataType: "json",
          url: window.host + "/patent/list_field",
          data: {filedName: 'Application Country'},
          success: function (res) {
            if (res['success']) {
              vue.countryList = res['ret_obj'];
              vue.requestCount++;
            }
          },
          error: function () {
            console.log("异常！");
          }
        });

        layui.jquery.ajax({
          type: "GET",
          xhrFields: {
            withCredentials: true
          },
          dataType: "json",
          url: window.host + "/patent/list_field",
          data: {filedName: 'Patent Type'},
          success: function (res) {
            if (res['success']) {
              vue.typeList = res['ret_obj'];
              vue.requestCount++;
            }
          },
          error: function () {
            console.log("异常！");
          }
        });

        layui.jquery.ajax({
          type: "GET",
          xhrFields: {
            withCredentials: true
          },
          dataType: "json",
          url: window.host + "/patent/list_field",
          data: {filedName: 'Applicant'},
          success: function (res) {
            if (res['success']) {
              vue.applicantList = res['ret_obj'];
              vue.requestCount++;
            }
          },
          error: function () {
            console.log("异常！");
          }
        });

        layui.jquery.ajax({
          type: "GET",
          xhrFields: {
            withCredentials: true
          },
          dataType: "json",
          url: window.host + "/patent/list_field",
          data: {filedName: 'Patent Status'},
          success: function (res) {
            if (res['success']) {
              vue.statusList = res['ret_obj'];
              vue.requestCount++;
            }
          },
          error: function () {
            console.log("异常！");
          }
        });

        layui.jquery.ajax({
          type: "GET",
          xhrFields: {
            withCredentials: true
          },
          dataType: "json",
          url: window.host + "/patent/list_field",
          data: {filedName: 'Project Status'},
          success: function (res) {
            if (res['success']) {
              vue.projectStatusList = res['ret_obj'];
              vue.requestCount++;
            }
          },
          error: function () {
            console.log("异常！");
          }
        });

        layui.jquery.ajax({
          type: "GET",
          xhrFields: {
            withCredentials: true
          },
          dataType: "json",
          url: window.host + "/patent/list_field",
          data: {filedName: 'Law Firm'},
          success: function (res) {
            if (res['success']) {
              vue.lawFirmList = res['ret_obj'];
              vue.requestCount++;
            }
          },
          error: function () {
            console.log("异常！");
          }
        });

        layui.jquery.ajax({
          type: "GET",
          xhrFields: {
            withCredentials: true
          },
          dataType: "json",
          url: window.host + "/patent/list_field",
          data: {filedName: 'Relation Ship'},
          success: function (res) {
            if (res['success']) {
              vue.relationShipList = res['ret_obj'];
              vue.requestCount++;
            }
          },
          error: function () {
            console.log("异常！");
          }
        });

        layui.jquery.ajax({
          type: "GET",
          xhrFields: {
            withCredentials: true
          },
          dataType: "json",
          url: window.host + "/patent/list_field",
          data: {filedName: 'Patent Upload Files Type'},
          success: function (res) {
            if (res['success']) {
              vue.fileTypeList = res['ret_obj'];
              vue.requestCount++;
            }
          },
          error: function () {
            console.log("异常！");
          }
        });

        layui.jquery.ajax({
          type: "GET",
          xhrFields: {
            withCredentials: true
          },
          dataType: "json",
          url: window.host + "/patent/list_field",
          data: {filedName: 'Application Type'},
          success: function (res) {
            if (res['success']) {
              vue.applicationTypeList = res['ret_obj'];
              vue.requestCount++;
            }
          },
          error: function () {
            console.log("异常！");
          }
        });

      },
      deleteUploadFile: function (delIndex) {
        var vue = this;


        layui.use('layer', function () {
          var layer = layui.layer;
          layer.confirm('确定要删除吗？', {
            btn: ['删除', '取消']
          }, function (index, layero) {
            var ids = vue.uploadFileList[delIndex].id;
            layui.jquery.ajax({
              type: "POST",
              xhrFields: {
                withCredentials: true
              },
              dataType: "json",
              url: window.host + "/patent/inventionFile/cancel",
              data: {ids: ids},
              success: function (res) {
                if (res.success) {
                  vue.reloadData();
                  vue.uploadFileList.splice(delIndex, 1)

                }
              },
              error: function () {
                console.log("异常！");
              }
            });
            layer.close(index);
          }, function (index) {

          });
        });
      },
      addInventor: function () {
        var inventors = layui.jquery('.inventor');
        var temp = inventors[inventors.length - 2].closest('div');
        temp = layui.jquery(temp);
        var copy = layui.jquery('#inventorCopy').clone();
        copy.show();
        temp.after(copy);
        layui.autocomplete.render({
          elem: copy.find('input')[0],
          url: window.host + '/patent/list_field?filedName=User',
          cache: false,
          template_val: '{{d.real_name}}',
          template_txt: '<span class=\'layui-badge layui-bg-gray\'>{{d.real_name}}</span>',
          onselect: function (resp) {

          }
        })
      },
      cancel: function () {
        var vue = this;
        var ids = '';
        for (var i = 0; i < vue.uploadFileList.length; i++) {
          ids = ids + vue.uploadFileList[i].id + ',';
        }
        layui.jquery.ajax({
          type: "POST",
          xhrFields: {
            withCredentials: true
          },
          dataType: "json",
          url: window.host + "/patent/inventionFile/cancel",
          data: {ids: ids},
          success: function (res) {
            if (res.success) {
              vue.$router.push({
                path: '/patent_list',
                name: 'PatentList',
                query: {},
              });
            }
          },
          error: function () {
            console.log("异常！");
          }
        });
      },
      reloadData: function () {
        var vue = this;
        vue.firstInventor.real_name = layui.jquery('#firstInventor').val();
        vue.firstInventor.login_name = layui.jquery('#firstInventor').attr('data-patent-first');
        vue.firstInventor.identity_no = layui.jquery('[name=firstInventorNo]').val();

        var tempList = [];

        layui.jquery('.inventor').each(function () {
          var real_name = layui.jquery(this).val();
          var login_name = layui.jquery(this).attr('data-patent-first');
          tempList.push({'real_name': real_name, 'login_name': login_name});
        })
        tempList.splice(tempList.length - 1, 1)
        console.log(tempList);
        vue.otherInventor = tempList;
      },
      bindStatus: function () {
        var vm = this;
        vm.status = layui.jquery('select[name="status"]').val();
        if (vm.status == ' ') {
          layui.jquery('#concreteStatus').addClass('hide');
        } else {
          layui.jquery('#concreteStatus').removeClass('hide');
        }
        layui.jquery.ajax({
          url: window.host + '/patent/list_field',
          type: 'GET',
          dataType: 'json',
          xhrFields: {
            withCredentials: true
          },
          data: {filedName: 'Concrete Status', value: vm.status},
          success: function (data) {
            if (data['success']) {
              vm.concreteStatusList = data['ret_obj'];
            }
          }
        });
      }
    },
    filters: {
      toKB: function (value) {
        var number = value / 1024;
        return number.toFixed(2);
      }
    }
  }
</script>

<style scoped>
  .bgc {
    margin-top: 20px;
    padding: 10px 15px 10px 15px;
    background-color: #F2F2F2;
    box-shadow: 1px 0px 1px #A8A8A8
  }

  .table-col {
    margin-top: 15px;
    min-height: 635px;
    background-color: white;
    padding: 10px 15px 10px 15px;
    border-radius: 8px;
    border-top: 1px #E6E6E6 solid;
    border-bottom: 1px #E6E6E6 solid;
    box-shadow: 0px 0px 1px #A8A8A8;
    font-size: 15px;
  }

  .number {
    transition: 5s all ease-out;
    float: left;
    border-radius: 50%;
    width: 30px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    font-size: 20px;
    background: #408CD3;
    color: #fff;
    margin: 10px 0px;
  }

  /*. {*/
  /*display: inline-block;*/
  /*width: 200px;*/
  /*padding-left: 10px;*/
  /*border-radius: 4px;*/
  /*}*/
  .layui-input {
    height: 30px;
    display: inline-block;
    width: 140px;
    color: #A8A8A8;
    font-size: smaller;
    margin-left: 15px;
  }

  .content {
    padding: 10px
  }

  .add-title {
    font-size: 24px;
    margin-bottom: 30px;
  }

  .input-group {
    margin: 10px;
  }

  .split-hr {
    margin: 10px 0px;
  }

  .add-inventor {
    font-size: 30px;
    color: #AFC3D6;
    margin: 10px;
    line-height: 55px;
  }

  .all-button {
    width: 80px;
    height: 30px;
    border-radius: 3px;
    /*z-index: 100000000;*/
  }

  .layui-btn-normal {
    background-color: #408cd3 !important;
  }

  .customize {
    color: #1E9FFF;
    border: 1px #408cd3 solid;
    margin-left: 100px;
  }

  .search {
    color: white;
    border: 1px #408cd3 solid;
    margin-left: 13%;
  }

  .hide {
    display: none;
  }

  label {
    display: inline-block;
    width: 130px;
    font-size: 16px;
    text-align: left;
    color: #6B6B6B;
    height: 30px;
    /*line-height:30px;*/
  }

  /*input[type=checkbox] {*/
  /*!*margin-top: 7px;*!*/
  /*!*width: 20px;*!*/
  /*!*height: 20px;*!*/
  /*visibility: hidden;*/
  /*}*/

  /*.checkboxOne {*/
  /*width: 40px;*/
  /*height: 10px;*/
  /*background: #555;*/
  /*margin: 20px 80px;*/
  /*position: relative;*/
  /*border-radius: 3px;*/

  /*}*/

  /*.checkboxOne label {*/
  /*display: block;*/
  /*width: 16px;*/
  /*height: 16px;*/
  /*border-radius: 50%;*/
  /*-webkit-transition: all .5s ease;*/
  /*-moz-transition: all .5s ease;*/
  /*-o-transition: all .5s ease;*/
  /*transition: all .5s ease;*/
  /*cursor: pointer;*/
  /*position: absolute;*/
  /*top: -3px;*/
  /*left: -3px;*/
  /*background: #cccccc;*/
  /*}*/

  /*.checkboxOne input[type=checkbox]:checked + label {*/
  /*left: 27px;*/
  /*}*/

  .margin-left {
    margin-left: 40px;
  }

</style>
