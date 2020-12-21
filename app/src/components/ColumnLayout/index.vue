<template>
  <div>
    <el-row :gutter="10">
      <el-col
        ref="cols"
        v-for="(percent, index) in percentArray"
        :key="index"
        style="min-height: 100px;"
        :style="{ width: `${percent * 100}%` }">
        <module-card
          v-for="(module, index) in columnModules[index]"
          :key="index"
          :name="module.name"
          :color="module.color"
          :style="{ height: module.height + 'px' }" />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import layout from '../mixins/layout'
import Sortable from 'sortablejs'

export default {
  mixins: [layout],
  props: {
    columns: {
      type: [String, Array],
      default: '1:3:1'
    }
  },
  computed: {
    columnArray() {
      return (typeof this.columns === 'string' ? this.columns.split(/[:：]/g) : this.columns).map(value => parseInt(value))
    },
    percentArray() {
      const sum = this.columnArray.reduce((sum, value) => sum + value, 0)
      return this.columnArray.map(value => value / sum)
    },
    columnModules() {
      const map = {}
      this.modules.forEach(module => {
        let modules = map[module.in]
        if (!modules) {
          modules = []
          map[module.in] = modules
        }
        modules.push(module)
      })
      return map
    }
  },
  mounted() {
    this.resetSortable()
  },
  updated() {
    this.resetSortable()
  },
  methods: {
    resetSortable() {
      this.$refs.cols.forEach(el => {
        new Sortable(el.$el, {
          group: 'module',
          sort: false,
          animation: 150,
          swapThreshold: 1,
          onEnd: evt => {
            console.log(evt)
            this.modules[0].in = 2
          }
        })
      })
    }
  }
}
</script>

<style>

</style>
