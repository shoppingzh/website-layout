<template>
  <div id="app">
    <div class="app__inner">
      <column-layout :modules="modules" :columns="columns" />
    </div>
    <tool-bar :modules="modules" :columns.sync="columns" />
  </div>
</template>

<script>
import ColumnLayout from '@/components/ColumnLayout'
import ToolBar from '@/components/ToolBar'


export default {
  name: 'App',
  components: {
    ColumnLayout,
    ToolBar
  },
  data() {
    return {
      modules: [],
      columns: '1:3:1'
    }
  },
  watch: {
    modules() {
      localStorage.setItem('_modules', JSON.stringify(this.modules))
    }
  },
  created() {
    const str = localStorage.getItem('_modules')
    if (str) {
      this.modules = JSON.parse(str)
    }
  }
}
</script>

<style lang="scss" scoped>
  #app {
    min-height: 100vh;
    .app__inner {
      width: 1200px;
      background-color: #fff;
      padding-bottom: 80px;
      margin: auto;
    }
  }
</style>
