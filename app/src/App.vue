<template>
  <div id="app">
    <div class="app__inner">
      <column-layout v-if="config.type === 'column'" :modules="modules" :columns="config.columns" />
      <free-layout v-else-if="config.type === 'free'" :modules="modules" />
    </div>
    <tool-bar :modules="modules" :config="config" />
  </div>
</template>

<script>
import ColumnLayout from '@/components/ColumnLayout'
import FreeLayout from '@/components/FreeLayout'
import ToolBar from '@/components/ToolBar'
import * as confApi from '@/api/config'
import * as api from '@/api/module'

export default {
  name: 'App',
  components: {
    ColumnLayout,
    FreeLayout,
    ToolBar
  },
  data() {
    return {
      config: null,
      modules: []
    }
  },
  watch: {
    modules: {
      deep: true,
      handler(newVal) {
        api.save(newVal)
      }
    },
    config: {
      deep: true,
      handler(newVal) {
        confApi.save(newVal)
      }
    }
  },
  created() {
    this.config = confApi.get()
    this.modules = api.list()
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
