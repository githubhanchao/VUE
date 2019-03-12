<template>
  <div id="patent" v-cloak>
    <div class="layui-row bgc">
      <div class="layui-row table-col">
        <div class="content layui-form">
          <div class="clear-float">
            <div class="add-title">
              <span style="color: #3F90DF">Invention - </span> <span>{{invention.full_serial}}</span>
            </div>
            <div>
              <div class="number fl">1</div>
              <div class="fl input-group">
                <label class="layui-form-label">Invention Title</label>
                <input lay-verify="required" type="text" name="title" placeholder="" v-model="invention.title" autocomplete="off" class="layui-input" style="width: 400px">
              </div>
            </div>
          </div>

          <hr class="split-hr"/>

          <div class="clear-float">
            <div class="number fl">2</div>
            <div class="fl input-group">
              <label class="layui-form-label">First Inventor</label>
              <input type="text" lay-verify="required"
                     :value="invention.first_inventor != undefined ? invention.first_inventor.real_name : ''" name="" fillin="false" placeholder="Name"
                     :data-patent-first="invention.first_inventor != undefined ? invention.first_inventor.login_name : ''"
                     :data-patent-second="invention.first_inventor != undefined ? invention.first_inventor.real_name : ''"
                     autocomplete="off" class="layui-input" style="width: 100px;margin-left: 15px;" id="firstInventor">
            </div>
            <div class="fl input-group">
              <input type="text" name="firstInventorNo"
                     :value="invention.first_inventor != undefined ? invention.first_inventor.identity_no : ''"
                     lay-verify="required|identity" placeholder="ID Number" autocomplete="off" class="layui-input">
            </div>
            </div>
          <div class="clear-float layui-row">
            <div class="fl input-group margin-left">
              <label class="layui-form-label">Other Inventors</label>
            </div>
            <div class="fl input-group" v-for="(item,index) in invention.inventor_list" >
              <input type="text" name="" fillin="false" placeholder="" autocomplete="off" class="layui-input inventor"
                     v-model="item.real_name"
                     :data-patent-first="item.login_name"
                     :data-patent-second="item.real_name"
                     style="width: 100px;margin-left: -5px;" :id="'otherInventors'+index">
            </div>

            <i class="layui-icon layui-icon-add-circle add-inventor" @click="addInventor"></i>
          </div>

          <hr class="split-hr"/>

          <div class="clear-float">
            <div class="number fl">3</div>

            <div class="fl input-group">
              <label class="layui-form-label">Application Type</label>
              <div class="layui-input-inline">
                <select name="applicationTypeKey" lay-verify="required" style="border: 0;margin-top: 5px" disabled class="layui-input" lay-ignore="" v-model="invention.application_type_key">
                  <option :value="item['key_id']" v-for="item in applicationTypeList"> {{item['key_value']}} </option>
                </select>
              </div>
            </div>

            <div class="fl input-group">
              <label class="layui-form-label">Country</label>
              <div class="layui-input-inline">
                <select name="applicationCountryKey" lay-verify="required" style="border: 0;margin-top: 5px" disabled class="layui-input" lay-ignore="" v-model="invention.application_country_key">
                  <option :value="item['id']" v-for="item in countryList"> {{item['name']}} </option>
                </select>
              </div>
            </div>

            <div class="fl input-group">
              <label class="layui-form-label">conclusion</label>
              <div class="layui-input-inline">
                <select name="conclusion" lay-verify="required" lay-ignore="" class="layui-input" v-model="invention.conclusion">
                  <option :value="item['key_id']" v-for="item in conclusionList"> {{item['key_value']}} </option>
                </select>
              </div>
            </div>
          </div>

          <hr class="split-hr"/>

          <div class="clear-float">
            <div class="number fl">4</div>
            <div class="fl input-group">
              <label class="layui-form-label">Project ID</label>
              <input type="text" name="projectNo" placeholder="" autocomplete="off" class="layui-input" lay-ignore="" v-model="invention.project_no">
            </div>
            <div class="fl input-group">
              <label class="layui-form-label">Project Status</label>
              <div class="layui-input-inline">
                <select name="projectStatusKey" lay-verify="required" class="layui-input" lay-ignore="" v-model="invention.project_status_key">
                  <option :value="item['key_id']" v-for="item in projectStatusList"> {{item['key_value']}} </option>
                </select>
              </div>
            </div>
            <div class="fl input-group">
              <label class="layui-form-label" style="width: 200px">Expected Disclosure Time</label>
              <input name="expectDisclosureTime" type="text" class="layui-input" style="width: 100px" id="expectDisclosureTime" v-model="invention.expect_disclosure_time">
            </div>
            <div class="fl input-group margin-left">
              <label class="layui-form-label">Related Tech</label>
              <div style="display: inline-block">
                <input type="text" name="relatedTechnology" placeholder="" autocomplete="off" class="layui-input" style="width: 250px" id="relatedTech" v-model="invention.related_technology">
              </div>
            </div>
            <div class="fl input-group">
              <label class="layui-form-label">Related Feature</label>
              <div style="display: inline-block">
                <input type="text" name="relatedFeature" placeholder="" autocomplete="off" class="layui-input" style="width: 250px" id="relatedFeature" v-model="invention.related_feature">
              </div>
            </div>

            <div class="fl input-group margin-left">
              <label class="layui-form-label">explanation</label>
              <input name="explanation" type="text" class="layui-input" v-model="invention.explanation">
            </div>
          </div>

          <hr class="split-hr"/>

          <div class="clear-float">
            <div class="number fl">5</div>

            <div class="fl input-group">
              <label class="layui-form-label">priority</label>
              <div class="layui-input-inline">
                <select name="priorityKey" lay-verify="required" lay-ignore="" class="layui-input" v-model="invention.priority_key">
                  <option :value="item['key_id']" v-for="item in inventionPriority"> {{item['key_value']}} </option>
                </select>
              </div>
            </div>

            <div class="fl input-group">
              <label class="layui-form-label">progress</label>
              <div class="layui-input-inline">
                <select name="progressKey" lay-verify="required" lay-ignore="" class="layui-input" v-model="invention.progress_key">
                  <option :value="item['key_id']" v-for="item in inventionProgress"> {{item['key_value']}} </option>
                </select>
              </div>
            </div>
          </div>

          <hr class="split-hr"/>

          <div>
            <button class="layui-btn layui-btn-primary layui-btn-xs all-button customize" @click="cancel">Cancel</button>
            <button class="layui-btn layui-btn-normal layui-btn-xs all-button search" lay-submit lay-filter="*">Save</button>
          </div>
        </div>
      </div>
    </div>

    <div class="fl input-group"  style="display: none" id="inventorCopy">
      <input type="text" name="" fillin="false"
             class="layui-input inventor" style="width: 100px;margin-left: 10px;">
    </div>
  </div>
</template>

<script>

  export default {
    name: "InventionEdit",
    data(){
      return {
        countryList: [],
        applicationTypeList: [],
        inventionProgress: [],
        projectStatusList: [],
        conclusionList: [],
        inventionPriority: [],
        requestCount:0,
        invention: {},
        inventorCount: 0,
        inventionId: this.$route.query.invention_id,
      }
    },
    watch:{
      inventorCount: function(newVal, oldVal) {
        this.$nextTick(function(){
          for (var i = 0; i < newVal; i++) {
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
        if (this.requestCount == 7){
          setTimeout(function () {
            layui.form.render();
          },20)
        }
      }
    },
    created: function () {
      this.initData();
    },
    mounted: function(){
      var vue = this;
      var laydate = layui.laydate;
      laydate.render({
        elem: '#expectDisclosureTime',
        theme: '#2D93CA',
        format: 'yyyy-MM-dd',
        done: function (value) {
        }
      })

      var form = layui.form;
      form.on('submit(*)', function(data){
        var content = data.field;
        var inventors = '';
        layui.jquery('.inventor').each(function () {
          var temp = layui.jquery(this).attr('data-patent-first');
          if (temp!='' && typeof(temp)!="undefined" && temp!=0){
            inventors = inventors + temp + ',';
          }
        })
        content['firstInventorLoginName'] = layui.jquery('#firstInventor').attr('data-patent-first');
        content['inventorsLoginName'] = inventors;
        content['id'] = vue.inventionId;
        console.log(content)
        layui.jquery.ajax({
          type: "POST",
          xhrFields: {
            withCredentials: true
          },
          dataType: "json",
          url: window.host + "/patent/invention/edit" ,
          data: content,
          success: function (res) {
            if (res.success) {
              layui.layer.msg('修改成功');
              vue.$router.push({
                path: '/invention_detail',
                name: 'InventionDetail',
                query: {
                  invention_id : vue.inventionId
                },
              });
            }else{
              layui.layer.msg(res.ret_msg);
            }
          },
          error : function() {
            console.log("异常！");
          }
        });
        return false;
      });
      form.on('select(uploadFileType)', function(data){
        vue.uploadFileType = data.value
      });

      var autocomplete = layui.autocomplete;
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
        url: window.host + '/patent/list_field?filedName=Invention Related Technology',
        cache: false,
        template_val: '{{d.related_technology}}',
        template_txt: '<span class=\'layui-badge layui-bg-gray\'>{{d.related_technology}}</span>',
        onselect: function (resp) {

        }
      })
      autocomplete.render({
        elem: '#relatedFeature',
        url: window.host + '/patent/list_field?filedName=Invention Related Feature',
        cache: false,
        template_val: '{{d.related_feature}}',
        template_txt: '<span class=\'layui-badge layui-bg-gray\'>{{d.related_feature}}</span>',
        onselect: function (resp) {

        }
      })
      var upload = layui.upload;
      upload.render({
        elem: '#upload' //绑定元素
        ,url: window.host + '/patent/patentFile/save'
        ,accept: 'file'
        ,data: {
          uploadType: vue.uploadFileType
        }
        ,done: function(res){
          if (res.success){
            vue.uploadFileList.push(res.ret_obj)
            console.log(res.toString())
          }
        }
        ,error: function(){

        }
      });

    },
    methods: {
      initData: function () {
        var vue = this;
        layui.jquery.ajax({
          type: "get",
          xhrFields: {
            withCredentials: true
          },
          dataType: "json",
          url: window.host + '/patent/list_field' ,
          data: { filedName: 'Application Type'},
          success: function (res) {
            if (res.success) {
              vue.applicationTypeList = res['ret_obj'];
              vue.requestCount++;
            }else{
              layui.layer.msg(res.ret_msg);
            }
          },
          error : function() {
            console.log("异常！");
          }
        });

        layui.jquery.ajax({
          type: "get",
          xhrFields: {
            withCredentials: true
          },
          dataType: "json",
          url: window.host + '/patent/list_field' ,
          data: { filedName: 'Application Country'},
          success: function (res) {
            if (res.success) {
              vue.countryList = res['ret_obj'];
              vue.requestCount++;
            }
          },
          error : function() {
            console.log("异常！");
          }
        });

        layui.jquery.ajax({
          type: "get",
          xhrFields: {
            withCredentials: true
          },
          dataType: "json",
          url: window.host + '/patent/list_field' ,
          data: { filedName: 'Application Country'},
          success: function (res) {
            if (res.success) {
              vue.countryList = res['ret_obj'];
              vue.requestCount++;
            }
          },
          error : function() {
            console.log("异常！");
          }
        });

        layui.jquery.ajax({
          type: "get",
          xhrFields: {
            withCredentials: true
          },
          dataType: "json",
          url: window.host + '/patent/list_field' ,
          data: { filedName: 'Project Status'},
          success: function (res) {
            if (res.success) {
              vue.projectStatusList = res['ret_obj'];
              vue.requestCount++;
            }
          },
          error : function() {
            console.log("异常！");
          }
        });

        layui.jquery.ajax({
          type: "get",
          xhrFields: {
            withCredentials: true
          },
          dataType: "json",
          url: window.host + '/patent/list_field' ,
          data: { filedName: 'Invention Priority'},
          success: function (res) {
            if (res.success) {
              vue.inventionPriority = res['ret_obj'];
              vue.requestCount++;
            }
          },
          error : function() {
            console.log("异常！");
          }
        });

        layui.jquery.ajax({
          type: "get",
          xhrFields: {
            withCredentials: true
          },
          dataType: "json",
          url: window.host + '/patent/list_field' ,
          data: { filedName: 'Invention Progress'},
          success: function (res) {
            if (res.success) {
              vue.inventionProgress = res['ret_obj'];
              vue.requestCount++;
            }
          },
          error : function() {
            console.log("异常！");
          }
        });

        layui.jquery.ajax({
          type: "get",
          xhrFields: {
            withCredentials: true
          },
          dataType: "json",
          url: window.host + '/patent/invention/view' ,
          data: { id: vue.inventionId},
          success: function (res) {
            if (res.success) {
              vue.invention = res['ret_obj']['data'];
              if (vue.invention.inventor_list.length<1){
                vue.invention.inventor_list.push({});
              }
              vue.inventorCount = vue.invention.inventor_list.length;
              vue.requestCount++;
            }
          },
          error : function() {
            console.log("异常！");
          }
        });

        layui.jquery.ajax({
          type: "get",
          xhrFields: {
            withCredentials: true
          },
          dataType: "json",
          url: window.host +'/patent/list_field',
          data: { filedName: 'Conclusion'},
          success: function (res) {
            if (res.success) {
              vue.conclusionList = res['ret_obj'];
              vue.requestCount++;
            }
          },
          error : function() {
            console.log("异常！");
          }
        });
      },
      addInventor: function () {
        var inventors = layui.jquery('.inventor');
        var temp = inventors[inventors.length-2].closest('div');
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
        this.$router.push({
          path: '/invention_detail',
          name: 'InventionDetail',
          query: {
            invention_id : this.inventionId
          },
        });
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

  .number{
    transition:5s all ease-out;
    float:left;
    border-radius:50%;
    width:30px;
    height:30px;
    line-height:30px;
    text-align:center;
    font-size:20px;
    background:#408CD3;
    color:#fff;
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


  .content{
    padding: 10px
  }

  .add-title{
    font-size: 20px;
    margin-bottom: 30px;
  }

  .input-group{
    margin: 10px;
  }

  .split-hr{
    margin: 10px 0px;
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
  .add-inventor{
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
  .layui-btn-normal{
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
  .margin-left {
    margin-left: 40px;
  }

</style>
