
import Vue from 'vue';

function makeDialog() {
  const dom = document.createElement('div');
  document.getElementsByTagName('body')[0].appendChild(dom);
  const tpl = '<el-dialog :visible.sync="true"  ><span>test</span></el-dialog>';
  const vue = new Vue({
    el: dom,
    data() {
      return {

      };
    },
    template: tpl,
    computed: {

    },
    methods: {

    },
    components: {

    },
  });
  return vue;
}

export default {
  open() {
    return makeDialog();
  },
};
