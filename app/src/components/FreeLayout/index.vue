<template>
  <div ref="container" class="free-layout">
    <moveable-card
      v-for="(module) in modules"
      :key="module.id"
      :ref="`module${module.id}`"
      :module="module"
      :name="module.name"
      :color="module.color"
      :style="styles(module)" />
  </div>
</template>

<script>
import layout from '../mixins/layout'
import MoveableCard from './MoveableCard'
// import Moveable from 'moveable'
// import * as api from '@/api/module'

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
  mounted() {
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
