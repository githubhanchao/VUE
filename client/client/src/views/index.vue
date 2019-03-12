/**
 * Created by alex on 2017/9/23.
 */

<template>
  <div id="app">
    <!--这里放置系统顶层-->
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'app',
  };
</script>
<style>
  .el-date-editor--datetimerange .el-input__icon {
    width: 10%;
  }
  .el-date-editor--datetimerange .el-range-separator {
    width: 4%;
  }
  .content .el-date-editor--datetimerange .el-icon-time, .content .el-date-editor--datetimerange .el-range__close-icon {
    display: none;
  }
  .content .el-date-editor--daterange .el-icon-date, .content .el-date-editor--daterange .el-range__close-icon {
    display: none;
  }
  .content .el-date-editor--datetimerange .el-range-input {
    width: 44%;
    font-size: 13px;
  }
  .el-dialog__headerbtn .el-dialog__close {
    font-weight: 700;
    color: #777;
  }
  @media screen and (max-width: 768px) {
    .el-date-range-picker {
      width: 100%;
    }
  }
  .el-button+.el-button {
    margin-left: 0;
  }
  .el-button--mini {
    padding: 7px 10px;
  }
  .el-form-item.is-success .el-input__inner, .el-form-item.is-success .el-input__inner:focus, .el-form-item.is-success .el-textarea__inner, .el-form-item.is-success .el-textarea__inner:focus {
    border-color: #d8dce5!important;
  }
  .el-card {
    border: none!important;
    box-shadow: 0 1px 4px rgba(0,0,0,.13)!important;
  }
  .el-table__fixed, .el-table__fixed-right {
    box-shadow: none !important;
  }
  .el-picker-panel__icon-btn, .el-picker-panel__link-btn {
    font-weight: 700;
  }
  .el-range-editor.is-active, .el-range-editor.is-active:hover {
    border-color: #409EFF!important;
  }
</style>
