
<template>
  <div id="ft-table">
    <el-table :data="dataSource">
      <el-table-column v-for="header in tableHeaders" :label="header.name" :prop="header.code">
        <template slot-scope="scope" >
          <span :style="'color: ' + header.color" v-if="header.flag">{{ header.code }}</span>
          <span v-else>{{ header.code }}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  export default {
    name: 'ft-table',
    props: {
      dataSource: {
        type: Array,
        default: [],
      },
      tableHeaders: {
        type: Array,
        default: [],
      },
    },
    data() {
      return {

      };
    },
    computed: {

    },
    methods: {
      edit(currentIndex) {
        this.$emit('edit', currentIndex);
      },
      remove(currentIndex) {
        this.$emit('edit', currentIndex);
      },
    },
  };
</script>

<style>

</style>
