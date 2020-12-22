<template>
  <div id="app">
    <div class="app__inner" :style="{ height: currentContainerHeight }">
      <column-layout v-if="config.type === 'column'" :modules="modules" :columns="config.columns" />
      <free-layout
        v-else-if="config.type === 'free'"
        :modules="modules"
        @change="handleContainerHeightChange" />
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
      containerHeight: null,
      config: null,
      modules: []
    }
  },
  computed: {
    currentContainerHeight() {
      if (!this.config) return null
      if (!this.containerHeight) return null
      return this.config.type === 'free' ? `${this.containerHeight}px` : null
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
  },
  methods: {
    handleContainerHeightChange(height) {
      this.containerHeight = height
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
      margin: auto;
    }
  }
</style>
