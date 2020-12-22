<template>
  <module-card
    v-bind="$attrs"
    v-on="$listeners">
    <slot />
  </module-card>
</template>

<script>
import Moveable from 'moveable'
import _ from 'lodash'

export default {
  props: {
    module: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      cloneModule: Object.assign({}, this.module)
    }
  },
  created() {
    this.$watch('cloneModule', _.debounce(newVal => {
      Object.assign(this.module, newVal)
    }, 100), {
      deep: true
    })
  },
  mounted() {
    const moveable = new Moveable(this.$parent.$el, {
      target: this.$el,
      origin: false,
      draggable: true,
      resizable: true,
      zoom: .6,
      throttleDrag: 0,
      throttleResize: 0,
      scrollable: true,
      scrollContainer: document.body,
      scrollThreshold: 0,
      snappable: true,
      bounds: {
        left: 0,
        right: 1200,
        top: 0
      }
    })
    moveable.on('drag', e => {
      const delta = e.beforeDelta
      this.cloneModule.x += delta[0]
      this.cloneModule.y += delta[1]

      this.$el.style.left = this.cloneModule.x + 'px'
      this.$el.style.top = this.cloneModule.y + 'px'
    })
    moveable.on('resize', e => {
      // 以下写法会有问题：vue的更新速率导致宽高设置时出现跳动
      this.cloneModule.width += e.delta[0]
      this.cloneModule.height += e.delta[1]

      this.$el.style.width = this.cloneModule.width + 'px'
      this.$el.style.height = this.cloneModule.height + 'px'
    })
  }
}
</script>

<style>

</style>
