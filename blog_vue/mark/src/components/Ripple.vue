<template>
  <div class="ripple-wrap">
    <canvas id="ripple" v-show="boolRipple" ref="ripple"></canvas>
  </div>
</template>

<script>
export default {
  name: "Ripple",
  data() {
    return {
      boolRipple: false,
      canvasObj: {}
    };
  },
  methods: {
    hello(target) {
      console.log(this, target);
      this.boolRipple = true;
      let { x, y } = target;
      const { canvas, width, height } = this.canvasObj;
      const max = 200;
      let r = 10;
      let v = 2;
      function render() {
        r += Math.log((v = v + 1000));
        console.log(r);
        canvas.clearRect(0, 0, width, height);
        canvas.beginPath();
        canvas.arc(100, 75, r, 0, 2 * Math.PI);
        canvas.stroke();
        requestAnimationFrame(render);
      }
      requestAnimationFrame(render);
    }
  },
  mounted() {
    const canvas = document.getElementById("ripple");
    const WINDOW_WIDTH = window.isComputer
      ? document.body.offsetWidth
      : screen.width;
    const WINDOW_HEIGHT = window.isComputer
      ? document.body.offsetHeight
      : screen.height;
    canvas.width = WINDOW_WIDTH;
    canvas.height = WINDOW_HEIGHT;

    const canvasObj = {
      canvas: canvas.getContext("2d"),
      width: WINDOW_WIDTH,
      height: WINDOW_HEIGHT
    };
    this.canvasObj = canvasObj;
  }
};
</script>

<style>
.ripple-wrap {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
}
</style>
