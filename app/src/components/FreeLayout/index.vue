<template>
  <div ref="container" class="free-layout">
    <moveable-card
      v-for="(module) in modules"
      :key="module.id"
      ref="modules"
      :module="module"
      :name="module.name"
      :color="module.color"
      :style="styles(module)" />
  </div>
</template>

<script>
import layout from '../mixins/layout'
import MoveableCard from './MoveableCard'

export default {
  mixins: [layout],
  components: {
    MoveableCard
  },
  computed: {
    styles() {
      return module => {
        return {
          width: `${module.width}px`,
          height: `${module.height}px`,
          left: `${module.x}px`,
          top: `${module.y}px`
        }
      }
    }
  },
  updated() {
    this.handleCalcBottom()
  },
  mounted() {
    this.handleCalcBottom()
  },
  methods: {
    handleCalcBottom() {
      let bottom = 0
      this.$refs.modules.forEach(module => {
        const el = module.$el
        const currBottom = el.offsetTop + el.offsetHeight
        if (currBottom > bottom) {
          bottom = currBottom
        }
      })
      this.$emit('change', bottom)
    }
  }
}
</script>

<style lang="scss" scoped>
  .free-layout {
    position: relative;
    .module-card {
      position: absolute;
    }
  }
</style>
