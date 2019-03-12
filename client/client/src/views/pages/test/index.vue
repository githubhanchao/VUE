<template>
  <div class="test-table">
    <ft-table-comp :tableHeaders="tableHeaders" :dataSource="dataSource"></ft-table-comp>
  </div>
</template>

<script>
  import ftTableComp from '@components/ft-table';

  export default {
    name: 'test',
    components: {
      ftTableComp,
    },
    data() {
      return {
        payTradeUrl: '',
        accountDetailData: null,
        tableLoading: false,
        tableHeaders: [
          {
            code: 'a',
            name: '创建时间',
            flag: false,
          },
          {
            code: 'b',
            name: '批次交易号',
            flag: false,
          },
          {
            code: 'c',
            name: '创建时间',
            flag: true,
            color: '#ff3366',
          },
          {
            code: 'd',
            name: '批次交易号',
            flag: false,
          },
          {
            code: '',
            name: '操作',
            flag: false,
          },
        ],
        dataSource: [
          {
            a: '2013-12-12',
            b: '2121',
            c: '2013-12-12',
            d: '2121',
          },
          {
            a: '2013-12-11',
            b: 'fsafdsa',
            c: '2013-12-12',
            d: '2121',
          },
        ],
      };
    },
    created: function () {

    },
    computed: {

    },
    methods: {

    },
  };
</script>

<style>

</style>
