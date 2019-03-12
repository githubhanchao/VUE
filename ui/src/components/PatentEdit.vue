<template>
  <div id="patent" v-cloak>
    <div class="layui-row bgc">
      <div class="layui-row table-col">
        <div class="content layui-form">
          <div class="clear-float">
            <div class="add-title">
              <span style="color: #3F90DF">Patent - </span> <span> {{patent.full_serial}}</span>
            </div>
            <div>
              <div class="number fl">1</div>
              <div class="fl input-group">
                <label class="layui-form-label">Patent Title</label>
                <input lay-verify="required" type="text" name="title" placeholder="" autocomplete="off"
                       class="layui-input" style="width: 400px" v-model="patent.title">
              </div>
            </div>
          </div>

          <hr class="split-hr"/>

          <div class="clear-float">
            <div class="number fl">2</div>
            <div class="fl input-group">
              <label class="layui-form-label">Invention ID</label>
              <div style="display: inline-block;">
                <input type="text" name="inventionFullSerial" fillin="false" style="border: 0" readonly lay-verify=""
                       :data-patent-first="patent.invention_id" placeholder="" autocomplete="off" class="layui-input"
                       id="inventionId" v-model="patent.invention_full_serial">
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
                       class="layui-input" style="width: 100px;margin-left: 10px;"
                       id="firstInventor">
              </div>
            </div>
            <div class="fl input-group">
              <input type="text" name="firstInventorNo" id="firstInventorID" lay-verify="required|identity"
                     placeholder="ID Number" autocomplete="off" class="layui-input"
                     :value="firstInventor.identity_no !=undefined ? firstInventor.identity_no : ''">
            </div>
            </div>
          <div class="clear-float layui-row">
            <div class="fl input-group margin-left">
              <label class="layui-form-label">Other Inventors</label>
            </div>
            <div class="fl input-group" v-for="(item,index) in otherInventor">
              <input type="text" name="" fillin="false" placeholder="" autocomplete="off"
                     :data-patent-first="item.login_name"
                     :data-patent-second="item.real_name" :value="item.real_name!=undefined ? item.real_name : ''"
                     class="layui-input inventor" style="width: 100px;margin-left: 5px;" :id="'otherInventors'+index">
            </div>

            <i class="layui-icon layui-icon-add-circle add-inventor" @click="addInventor"></i>
          </div>

          <hr class="split-hr"/>

          <div class="clear-float">
            <div class="number fl">3</div>
            <div class="fl input-group">
              <label class="layui-form-label">Application No.</label>
              <input type="text" name="applicationNo" placeholder="" lay-verify="required" autocomplete="off"
                     class="layui-input" v-model="patent.application_no">
            </div>

            <div class="fl input-group">
              <label class="layui-form-label">Application Type</label>
              <div class="layui-input-inline">
                <select name="applicationTypeKey" lay-verify="" disabled class="layui-input" lay-ignore=""
                        style="border: 0;margin-top: 5px">
                  <option :value="item['key_id']" v-for="item in applicationTypeList"> {{item['key_value']}}</option>
                </select>
              </div>
            </div>
            <div class="fl input-group">
              <label class="layui-form-label">Application Date</label>
              <input name="applicationDate" lay-verify="required" type="text" autocomplete="off" class="layui-input" style="width: 100px"
                     id="applicationDate" v-model="patent.application_date">
            </div>

            <div class="fl input-group margin-left">
              <label class="layui-form-label">Country</label>
              <div class="layui-input-inline">
                <select name="applicationCountryKey" lay-verify="" style="border: 0;margin-top: 5px" lay-ignore=""
                        disabled class="layui-input" v-model="patent.application_country_key">
                  <option :value="item['id']" v-for="item in countryList"> {{item['name']}}</option>
                </select>
              </div>
            </div>
            <!--<div class="fl input-group">-->
            <!--<label class="layui-form-label">Type</label>-->
            <!--<div class="layui-input-block">-->
            <!--<select name="patentTypeKey" lay-verify="required" class="pantent-select" v-model="patent.patent_type_key">-->
            <!--<option :value="item['key_id']" v-for="item in typeList"> {{item['key_value']}} </option>-->
            <!--</select>-->
            <!--</div>-->
            <!--</div>-->
            <div class="fl input-group">
              <label class="layui-form-label">Applicant</label>
              <div class="layui-input-inline">
                <select name="applicantId" lay-verify="required" class="layui-input" lay-ignore=""
                        v-model="patent.applicant_id" style="width: 170px">
                  <option :value="item['id']" v-for="item in applicantList"> {{item['name']}}</option>
                </select>
              </div>
            </div>

            <div class="fl input-group">
              <label class="layui-form-label">Patent No.</label>
              <input type="text" name="patentNo" placeholder="" lay-verify="required" autocomplete="off"
                     class="layui-input" v-model="patent.application_no">
            </div>
            <div class="fl input-group margin-left">
              <label class="layui-form-label">Current Patentee</label>
              <div class="layui-input-inline">
                <select name="currentPatenteeId" lay-ignore="" lay-verify="required" class="layui-input"
                        v-model="patent.current_patentee_id">
                  <option :value="item['id']" v-for="item in applicantList"> {{item['name']}}</option>
                </select>
              </div>
            </div>
            <div class="fl input-group">
              <label class="layui-form-label">Patent Status</label>
              <div class="layui-input-inline">
                <select name="status" lay-verify="" class="layui-input" v-model="patent.status" lay-ignore=""
                        lay-filter="status" @change="bindStatus()">
                  <option value=" ">----------</option>
                  <option :value="item['key_id']" v-for="item in statusList"> {{item['key_value']}}</option>
                </select>
              </div>
            </div>
            <div class="fl input-group hide" id="concreteStatus">
              <label class="layui-form-label" style="width: 130px">Concrete Status</label>
              <div class="layui-input-inline">
                <select name="concreteStatus" lay-verify="" lay-ignore="" class="layui-input hide"
                        v-model="patent.concrete_status">
                  <option value=" ">---------</option>
                  <option :value="item['key_id']" v-for="item in concreteStatusList">
                    {{item['key_value']}}
                  </option>
                </select>
              </div>
            </div>
            <div class="fl input-group margin-left">
              <label class="layui-form-label">Patent Issue Date</label>
              <input name="issueDate" lay-verify="" type="text" autocomplete="off" class="layui-input" style="width: 100px" id="issueDate"
                     v-model="patent.issue_date">
            </div>
          </div>

          <hr class="split-hr"/>

          <div class="clear-float">
            <div class="number fl">4</div>
            <div class="fl input-group">
              <label class="layui-form-label">Project ID</label>
              <input type="text" name="projectNo" placeholder="" lay-verify="" autocomplete="off" class="layui-input"
                     v-model="patent.project_no">
            </div>
            <div class="fl input-group">
              <label class="layui-form-label">Project Status</label>
              <div class="layui-input-inline">
                <select name="projectStatusKey" lay-verify="required" lay-ignore="" class="layui-input"
                        v-model="patent.project_status_key">
                  <option :value="item['key_id']" v-for="item in projectStatusList"> {{item['key_value']}}</option>
                </select>
              </div>
            </div>
            <!--<div class="fl input-group">-->
            <!--<label>Expected Disclosure Time</label>-->
            <!--<input name="expectDisclosureTime" lay-verify="" type="text" class="layui-input pantent-input" style="width: 100px" id="expectDisclosureTime" v-model="patent.expect_disclosure_time">-->
            <!--</div>-->
            <div class="fl input-group">
              <label class="layui-form-label">Related Tech</label>
              <div style="display: inline-block">
                <input type="text" name="relatedTechnology" lay-verify="required" placeholder="" autocomplete="off"
                       class="layui-input" style="width: 250px" id="relatedTech" v-model="patent.related_technology">
              </div>
            </div>
            <div class="fl input-group margin-left">
              <label class="layui-form-label">Related Feature</label>
              <div style="display: inline-block">
                <input type="text" name="relatedFeature" lay-verify="required" placeholder="" autocomplete="off"
                       class="layui-input" style="width: 250px" id="relatedFeature" v-model="patent.related_feature">
              </div>
            </div>

            <div class="fl input-group">
              <label class="layui-form-label" style="width: 150px">Responsible Person</label>
              <div style="display: inline-block">
                <input type="text" name="responsiblePerson" lay-verify="required" placeholder="" autocomplete="off"
                       class="layui-input" v-model="patent.responsible_person">
              </div>
            </div>
          </div>

          <hr class="split-hr"/>

          <div class="clear-float">
            <div class="number fl">5</div>
            <div class="fl input-group" style="margin: 20px 10px;">
              <label class="layui-form-label">First Filing</label>
              <input type="checkbox" name="firstFilling" lay-skin="primary" lay-ignore="" checked v-model="firstFiling"
                     id="firstFiling" disabled lay-filter="firstFiling" style="margin-top: 10px;margin-left: 15px"/>

            </div>
            <div class="fl input-group" v-show="!firstFiling">
              <label class="layui-form-label">Priority Patent ID</label>
              <div style="display: inline-block;">
                <input type="text" name="parentId" placeholder=""
                       autocomplete="off" class="layui-input" style="width: 200px;margin-left: 10px;border: 0"
                       id="priorityPatentId"
                       :data-patent-first="patent.parent_id" v-model="patent.parent_full_serial" readonly>
              </div>
            </div>
            <div class="fl input-group" v-show="!firstFiling">
              <label class="layui-form-label">Relationship</label>
              <div class="layui-input-inline">
                <select name="relationship" lay-verify="required" class="layui-input" lay-ignore=""
                        v-model="patent.relationship">
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
                <select name="lawFirmId" lay-verify="required" lay-ignore="" class="layui-input"
                        v-model="patent.law_firm_id" style="width: 500px">
                  <option :value="item['id']" v-for="item in lawFirmList"> {{item['name']}}</option>
                </select>
              </div>
            </div>
            <div class="fl input-group" style="margin-top: 60px;margin-left: -685px">
              <label class="layui-form-label">Law Firm No.</label>
              <input type="text" name="patentLawFirmNo" lay-verify="required" placeholder="" autocomplete="off"
                     class="layui-input" style="width: 200px;margin-left: 15px;" v-model="patent.patent_law_firm_no">
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
             class="layui-input inventor" style="width: 100px;margin-left: 10px;">
    </div>

  </div>
</template>

<script>

  export default {
    name: "PatentEdit",
    data() {
      return {
        countryList: [],
        typeList: [],
        applicantList: [],
        statusList: [],
        status: ' ',
        concreteStatus: ' ',
        concreteStatusList: [],
        projectStatusList: [],
        lawFirmList: [],
        relationShipList: [],
        firstFiling: false,
        patentId: this.$route.query.patent_id,
        patent: '',
        firstInventor: {},
        otherInventor: [],
        applicationTypeList: [],
        requestCount: 0,
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
      // concreteStatusList: function () {
      //   this.$nextTick(function () {
      //     var form = layui.form;
      //     form.render('select');
      //   });
      // }
    },
    created: function () {
      this.initData();
    },
    mounted: function () {
      var vue = this;
      var laydate = layui.laydate;
      vue.bindStatus();
      vue.bindChange();
      vue.getPatent();
      console.log(vue.status);
      if (vue.status) {
        layui.jquery('#concreteStatus').removeClass('hide');
        layui.jquery.ajax({
          url: window.host + '/patent/list_field',
          type: 'GET',
          dataType: 'json',
          xhrFields: {
            withCredentials: true
          },
          data: {filedName: 'Concrete Status', value: vue.status},
          success: function (data) {
            if (data['success']) {
              vue.concreteStatusList = data['ret_obj'];
            }
          }
        });
      }
      laydate.render({
        elem: '#applicationDate',
        theme: '#2D93CA',
        format: 'yyyy-MM-dd',
        done: function (value) {

        }
      });
      laydate.render({
        elem: '#issueDate',
        theme: '#2D93CA',
        format: 'yyyy-MM-dd',
        done: function (value) {

        }
      });
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
          var temp = layui.jquery(this).attr('data-patent-first');
          if (temp != '' && typeof (temp) != "undefined" && temp != 0) {
            inventors = inventors + temp + ',';
          }
        })
        content['firstInventorLoginName'] = layui.jquery('#firstInventor').attr('data-patent-first');
        content['parentId'] = layui.jquery('#priorityPatentId').attr('data-patent-first');
        content['inventorsLoginName'] = inventors;
        content['firstFilling'] = vue.firstFiling ? 1 : 0;
        content['id'] = vue.patent.id;
        console.log(content);
        layui.jquery.ajax({
          type: "POST",
          xhrFields: {
            withCredentials: true
          },
          dataType: "json",
          url: window.host + "/patent/patent/edit",
          data: content,
          success: function (res) {
            if (res.success) {
              layui.layer.msg("更新成功");
              vue.$router.push({
                path: '/patent_detail',
                name: 'PatentDetail',
                query: {
                  p_id: vue.patentId
                },
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
              console.log(res);
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
      getPatent: function () {
        var vue = this;
        layui.jquery.ajax({
          type: "post",
          async: false,
          xhrFields: {
            withCredentials: true
          },
          dataType: "json",
          url: window.host + '/patent/patent/view',
          data: {id: vue.patentId},
          success: function (res) {
            if (res['success']) {
              vue.patent = res['ret_obj']['data'];
              vue.firstFiling = vue.patent.first_filling;
              vue.firstInventor = vue.patent.first_inventor;
              vue.otherInventor = vue.patent.inventor_list;
              vue.status = res['ret_obj']['data']['status'];
              vue.concreteStatus = res['ret_obj']['data']['concrete_status'];
              if (vue.otherInventor.length < 1) {
                vue.otherInventor.push({});
              }
              vue.requestCount++;
            }

          },
          error: function () {
            console.log("异常！");
          }
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
        vue.$router.push({
          path: '/patent_detail',
          name: 'PatentDetail',
          query: {
            p_id: vue.patentId
          },
        });
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

      },
      bindChange: function () {
        var vue = this;
        layui.jquery('#firstInventor').on('change', '', function () {
          vue.firstInventor.real_name = layui.jquery(this).val();
          console.log(vue.firstInventor.real_name);
        });
        layui.jquery('#firstInventorID').on('change', '', function () {
          vue.firstInventor.identity_no = layui.jquery(this).val();
        });
      }
    },
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

  label {
    display: inline-block;
    width: 130px;
    font-size: 16px;
    text-align: left;
    color: #6B6B6B;
    height: 30px;
    /*line-height:30px;*/
  }

  .add-title {
    font-size: 20px;
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
