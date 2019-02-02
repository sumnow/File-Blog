<template>
    <div>
        <canvas id="canvas"></canvas>
    </div>
</template>

<script>
import zhaoyun from "@/assets/zhaoyun.png";

export default {
  name: "noFound",
  computed: {
    isComputer() {
      return !/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/.test(
        navigator.userAgent
      );
    }
  },
  mounted() {
    const WINDOW_WIDTH = this.isComputer
      ? document.body.offsetWidth
      : screen.width;
    const WINDOW_HEIGHT = this.isComputer
      ? document.body.offsetHeight
      : screen.height;

    const canvas = document.querySelector("#canvas");
    canvas.width = WINDOW_WIDTH;
    canvas.height = WINDOW_HEIGHT;
    const ctx = canvas.getContext("2d");
    class ZhaoYun {
      constructor(obj) {
        this.w = obj.w;
        this.h = obj.h;
        this.imgSrc = obj.imgSrc;
        this.x = obj.x * w + WINDOW_WIDTH / 2 - 7 * w + (w - (48 * w) / 64) / 2;
        this.y = obj.y + WINDOW_HEIGHT / 2 - 2 * w;
        this.imgX = obj.imgX;
        this.imgY = obj.imgY;
        this.scale = obj.scale || 1;
        this.local = obj.local || [];
        this.speed = obj.speed || 1;
      }

      render() {
        const img = new Image();
        img.src = this.imgSrc;
        ctx.drawImage(
          img,
          this.imgX,
          this.imgY,
          this.w,
          this.h,
          this.x,
          this.y,
          this.w * this.scale,
          this.h * this.scale
        );
      }
      setXandY(x, y) {
        this.local = [x, y]
        this.x = x * w + WINDOW_WIDTH / 2 - 7 * w + (w - (48 * w) / 64) / 2;
        this.y = y + WINDOW_HEIGHT / 2 - 2 * w;
      }
      update() {
        if (this.imgX > 2 * this.w) {
          this.imgX = 0;
        } else {
          this.imgX = this.imgX + this.w;
        }
      }
      change(direction) {
        switch (parseInt(direction) % 4) {
          case 0:
            this.imgY = 0 * this.h;
          case 1:
            this.imgY = 1 * this.h;
          case 2:
            this.imgY = 2 * this.h;
          case 3:
            this.imgY = 3 * this.h;
        }
      }
    }
    const arr = [
      {
        arr: [1, 0, 0, 1, 0, 1, 1, 1, 1, 1, 1, 0, 0, 1]
      },
      {
        arr: [1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1]
      },
      {
        arr: [1, 1, 1, 1, 0, 1, 0, 0, 1, 0, 1, 1, 1, 1]
      },
      {
        arr: [0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]
      },
      {
        arr: [0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1]
      }
    ];

    let l = 0;
    let t = 0;
    const w = WINDOW_WIDTH / 20;
    const zhaoyun1 = new ZhaoYun({
      x: 0,
      y: 0,
      imgSrc: zhaoyun,
      w: 48,
      h: 64,
      imgX: 0,
      imgY: 0,
      scale: w / 64,
      local: [0, 0],
      speed: 0.5,
    });
    function render() {
      ctx.clearRect(0, 0, WINDOW_WIDTH, WINDOW_HEIGHT);
      t++;
      arr.forEach((el, i) => {
        el.arr.forEach((e, j) => {
          if (e) {
            ctx.fillStyle = `hsla(${(l += 0.01)},100%,50%,${0.5 + i * 0.05})`;
            ctx.fillRect(
              WINDOW_WIDTH / 2 - 7 * w + j * w,
              WINDOW_HEIGHT / 2 - 2 * w + i * w,
              w,
              w
            );
          }
        });
      });
      if (zhaoyun1)
      zhaoyun1.setXandY(0, 0 + zhaoyun1.speed * t);
      zhaoyun1.render();
      // 缩短刷新速率
      if (!(t % 10)) {
        zhaoyun1.update();
        // if (!(t % 800)) {
        //   zhaoyun1.change(0.1 * t % 4);
        //   t = 0;
        // }
      }
      window.requestAnimationFrame(render);
    }

    window.requestAnimationFrame(render);
  }
};
</script>

<style>
#canvas {
  background: #000;
}
</style>
