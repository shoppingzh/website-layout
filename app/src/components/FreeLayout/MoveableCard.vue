<template>
  <module-card
    v-bind="$attrs"
    v-on="$listeners">
    <slot />
  </module-card>
</template>

<script>
import Moveable from 'moveable'

export default {
  props: {
    module: {
      type: Object,
      required: true
    }
  },
  data() {
    return {}
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
      this.module.x += delta[0]
      this.module.y += delta[1]
    })
    moveable.on('resize', e => {
      // 以下写法会有问题：vue的更新速率导致宽高设置时出现跳动
      // this.module.width += e.delta[0]
      // this.module.height += e.delta[1]
      this.$el.style.width = e.width + 'px'
      this.$el.style.height = e.height + 'px'
    })
  }
}
</script>

<style>

</style>
