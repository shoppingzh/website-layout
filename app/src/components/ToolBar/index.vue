<template>
  <div>
    <div
      class="tool-bar"
      :class="{ 'is-hide': !show }"
      @mouseenter="show = true"
      @mouseleave="show = false">
      <div class="tool-bar__item">
        <el-button
          @click="handleAddModule">添加模块</el-button>
      </div>
      <div class="tool-bar__item">
        <el-button
          @click="handleUpdateColumns">调整列数</el-button>
      </div>
      <div class="tool-bar__item">
        <el-button
          type="danger"
          @click="handleClearModules">清空模块</el-button>
      </div>
    </div>
    <el-dialog
      :visible.sync="dialog.add"
      title="添加模块"
      width="500px">
      <add-module :module="module" @ok="handleAddModuleEnd" />
    </el-dialog>
    <el-dialog
      :visible.sync="dialog.updateColumns"
      title="调整列数"
      width="400px">
      <el-input v-model="strColumns" />
    </el-dialog>
  </div>
</template>

<script>
import AddModule from './AddModule'

export default {
  components: {
    AddModule
  },
  props: {
    modules: {
      type: Array,
      required: true
    },
    columns: {
      type: [String, Array],
      default: () => []
    }
  },
  data() {
    return {
      show: true,
      module: null,
      dialog: {
        add: false,
        updateColumns: false
      }
    }
  },
  computed: {
    strColumns: {
      get() {
        return typeof this.columns === 'string' ? this.columns : this.columns.join(':')
      },
      set(newVal) {
        this.$emit('update:columns', newVal)
      }
    }
  },
  mounted() {
    setTimeout(() => {
      this.show = false
    }, 1000)
  },
  methods: {
    handleAddModule() {
      this.module = {
        name: '模块',
        in: null,
        index: null,
        x: null,
        y: null,
        width: 0,
        height: 0,
        color: null
      }
      this.dialog.add = true
    },
    handleAddModuleEnd() {
      this.dialog.add = false
      this.modules.push(Object.assign({}, this.module))
    },
    handleUpdateColumns() {
      this.dialog.updateColumns = true
    },
    handleClearModules() {
      this.$confirm('确定清空所有模块？').then(() => {
        localStorage.removeItem('_modules')
        this.modules.splice(0, this.modules.length)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .tool-bar {
    position: fixed;
    z-index: 3;
    left: 0;
    top: 0;
    bottom: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px 0;
    width: 120px;
    box-shadow: 0 0 4px rgba(0, 0, 0, .1), 3px 0 8px rgba(0, 0, 0, .15);
    background-color: #fff;
    transition: transform .3s;
    &.is-hide {
      transform: translateX(-95%);
      &:after {
        content: "";
      }
    }
    &__item {
      margin-bottom: 20px;
    }
  }
</style>
