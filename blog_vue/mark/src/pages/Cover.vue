<template>
  <div class="canvas_wrapper">
      <canvas id="canvas"></canvas>
  </div>
</template>

<script>
export default {
  name: "cover",
  data() {
    return {
      arrMobCanvas: [
        function starsRd(obj) {
          var num = 500;
          var stars = [];
          var rnd;
          const { canvas, width, height } = obj;

          // canvas = document.getElementById("canvas");
          var context = canvas.getContext("2d");

          addStar();

          // setInterval(render,33);
          requestAnimationFrame(render);

          // render();

          function render() {
            context.fillStyle = "rgba(0,0,0,0.8)";
            context.clearRect(0, 0, width, height);
            for (var i = 0; i < num; i++) {
              var star = stars[i];
              star.alpha += star.ra;
              if (star.alpha <= 0) {
                star.alpha = 0;
                star.ra = -star.ra;
                star.vx = Math.random() * 0.2 - 0.1;
                star.vy = Math.random() * 0.2 - 0.1;
              } else if (star.alpha > 1) {
                star.alpha = 1;
                star.ra = -star.ra;
              }
              star.x += star.vx;
              if (star.x >= width) {
                star.x = 0;
              } else if (star.x < 0) {
                star.x = width;
                star.vx = Math.random() * 0.2 - 0.1;
                star.vy = Math.random() * 0.2 - 0.1;
              }
              star.y += star.vy;
              if (star.y >= height) {
                star.y = 0;
                star.vy = Math.random() * 0.2 - 0.1;
                star.vx = Math.random() * 0.2 - 0.1;
              } else if (star.y < 0) {
                star.y = height;
              }
              context.beginPath();
              var bg = context.createRadialGradient(
                star.x,
                star.y,
                0,
                star.x,
                star.y,
                star.r
              );
              bg.addColorStop(0, "rgba(255,255,255," + star.alpha + ")");
              bg.addColorStop(1, "rgba(255,255,255,0)");
              context.fillStyle = bg;
              context.arc(star.x, star.y, star.r, 0, Math.PI * 2, true);
              context.fill();
              context.closePath();
            }
            requestAnimationFrame(render);
          }

          function addStar() {
            for (var i = 0; i < num; i++) {
              var aStar = {
                x: Math.round(Math.random() * width),
                y: Math.round(Math.random() * height),
                r: Math.random() * 3,
                ra: Math.random() * 0.02,
                alpha: Math.random(),
                vx: Math.random() * 0.2 - 0.1,
                vy: Math.random() * 0.2 - 0.1
              };
              stars.push(aStar);
            }
          }
        }
      ],
      arrPCCanvas: [
        function ballRd(obj) {
          let time = 1,
            cos = Math.cos,
            sin = Math.sin,
            PI = Math.PI;

          const { canvas, width, height } = obj;
          const ctx = canvas.getContext("2d");
          setInterval(() => {
            ctx.clearRect(0, 0, width, height);
            ctx.fillStyle = "rgba(0,255,255,0.2)";
            ctx.globalCompositeOperation = "lighter";
            time += 0.1;

            let i = 10000;

            while (i--) {
              let r =
                (width + height) *
                0.8 *
                (cos((time + i) * (0.05 + sin(time * 0.00002) / PI * 0.2)) /
                  PI);
              ctx.fillRect(
                sin(i) * r + width / 2,
                cos(i) * r + height / 2,
                2,
                2
              );
            }
          }, 16);
        }
      ]
    };
  },
  computed: {
    isComputer () {
      return !/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/.test(navigator.userAgent)
    }
  },
  created() {
  },
  mounted() {
    const canvas = document.getElementById("canvas");
    const WINDOW_WIDTH = this.isComputer
      ? document.body.offsetWidth
      : screen.width;
    const WINDOW_HEIGHT = this.isComputer
      ? document.body.offsetHeight
      : screen.height;
    canvas.width = WINDOW_WIDTH;
    canvas.height = WINDOW_HEIGHT;

    const canvasObj = {
      canvas,
      width: WINDOW_WIDTH,
      height: WINDOW_HEIGHT
    };

    if (!this.isComputer) {
      this.arrMobCanvas[0](canvasObj);
    } else {
      this.arrPCCanvas[0](canvasObj);
    }
    // console.log(document.body.clientWidth,document.body.clientHeight)
  }
};
</script>

<style scoped>
#canvas {
  background: black;
}
.canvas_wrapper {
  position: absolute;
  z-index: 1;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
}
</style>
