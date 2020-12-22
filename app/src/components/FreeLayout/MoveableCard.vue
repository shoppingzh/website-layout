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
      draggable: true,
      resizable: true,
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
      this.module.width += e.delta[0]
      this.module.height += e.delta[1]
    })
  }
}
</script>

<style>

</style>
