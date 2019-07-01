<template>
  <div>
    <canvas id="bgcanvas" style="position:absolute;z-index:2"></canvas>
    <canvas id="fgcanvas" style="position:absolute;z-index:4"></canvas>
    <div class="bg_black">
      <div>
        <div class="profile-pic">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { commonMixin } from "@/util/mixin";

export default {
  name: "noFound",
  mixin: [commonMixin],
  methods: {
    ready() {}
  },
  mounted() {
    this.$nextTick(() => {
      let bgflakes = new Array();
      let fgflakes = new Array();
      let bgFlakeCount = 200;
      let fgFlakeCount = 50;
      let frameCount = 0;
      let wind = 0;
      let dwidth;
      let dheight;
      let mouseX, mouseY, orientation, orientX;
      let bgcanvas = document.getElementById("bgcanvas");
      let fgcanvas = document.getElementById("fgcanvas");
      function init() {
        dwidth = window.innerWidth;
        dheight = window.innerHeight;
        bgcanvas.width = dwidth;
        bgcanvas.height = dheight;
        fgcanvas.width = dwidth;
        fgcanvas.height = dheight;
        let ctx = fgcanvas.getContext("2d");
        if (!bgcanvas.getContext) return; // bye IE!
        for (let i = 0; i < bgFlakeCount; i++) {
          bgflakes.push(new Flake(bgcanvas.width, bgcanvas.height, 0, 3, ctx));
        }
        for (let i = 0; i < fgFlakeCount; i++) {
          fgflakes.push(
            new Flake(fgcanvas.width, fgcanvas.height, 0.2, 4, ctx)
          );
        }
        setInterval(draw, 50);
      }

      function setWind() {
        if (!orientation) {
          let mx = mouseX - dwidth / 2;
          wind = (mx / dwidth) * 3;
        } else {
          wind = parseFloat(orientX) * 3;
        }
        if (isNaN(wind)) {
          wind = 0;
        }
      }

      function draw() {
        frameCount += 1;
        let g = bgcanvas.getContext("2d");
        let h = fgcanvas.getContext("2d");
        g.clearRect(0, 0, bgcanvas.width, bgcanvas.height);
        h.clearRect(0, 0, fgcanvas.width, fgcanvas.height);
        setWind();
        for (let i = 0; i < bgFlakeCount; i++) {
          bgflakes[i].move(frameCount, wind);
          bgflakes[i].draw(g);
        }
        for (let i = 0; i < fgFlakeCount; i++) {
          fgflakes[i].move(frameCount, wind);
          fgflakes[i].draw(h);
        }
      }

      function Flake(w, h, a, s, ctx) {
        this.canvasWidth = w;
        this.canvasHeight = h;
        this.x = Math.random() * dwidth;
        this.y = Math.random() * -1 * h;
        this.alfa = Math.random() * 0.5 + a;

        this.speed = Math.random();
        this.size = (s - this.speed - this.alfa) * 2;
        // let grad = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size) //创建一个渐变色线性对象
        // grad.addColorStop(0, "#fff");                  //定义渐变色颜色
        // grad.addColorStop(1, "rgba(255,255,255," + this.alfa + ")");
        this.color = "rgba(255,255,255," + this.alfa + ")";
        // this.color = grad
        this.amp = Math.random() * 2;
        this.shift = Math.random() * 25 + 25;
        if (Math.random() > 0.5) this.shift *= -1;
        this.drift = Math.random() - 0.5;

        this.draw = function(g) {
          let grad = ctx.createRadialGradient(
            this.x,
            this.y,
            0,
            this.x,
            this.y,
            this.size * 1
          ); //创建一个渐变色线性对象
          grad.addColorStop(0, "#fff"); //定义渐变色颜色
          grad.addColorStop(1, "rgba(255,255,255, 0)");
          // grad.addColorStop(1, "#000");
          // g.fillStyle = this.color;
          g.fillStyle = grad;
          g.beginPath();
          g.arc(this.x, this.y, this.size, 0, Math.PI * 2, true);
          g.closePath();
          g.fill();
        };

        this.move = function(f, wind) {
          this.y += this.speed;
          this.x += Math.cos(f / this.shift) * this.amp + this.drift + wind;
          if (this.y > this.canvasHeight) {
            this.restart();
          }
        };

        this.restart = function() {
          this.y = -20;
          this.shift = Math.random() * 25 + 25;
          this.x = 200;
        };
      }

      init();
    });
  }
};
</script>

<style>
.bg_black {
  grid-template-rows: 100px 1fr 100px;
  width: 100vw;
  height: 100vh;
  background: #000;
  color: #fff;
  text-align: center;
}
.profile-pic {
  display: grid;
  grid-template: repeat(6, 1fr) / repeat(8, 1fr);
  margin: 0 auto;
  width: 100vw;
  height: 100vh;
  background-image: url(../assets/saber.jpg);
  background-size: cover;
  background-color: #000;
}
.profile-pic div {
  width: calc(100vw / 8);
  height: calc(100vh / 6);
}
@keyframes fade {
  50% {
    background-color: rgba(0, 0, 0, 100%);
  }
}
.profile-pic div {
  outline: 2px solid #000;
  background-color: rgba(0, 0, 0, 0);
  animation: fade 24s infinite;
}

.profile-pic div:nth-of-type(1) {
  animation-delay: 0.25s;
}
.profile-pic div:nth-of-type(2) {
  animation-delay: 0.5s;
}
.profile-pic div:nth-of-type(3) {
  animation-delay: 0.75s;
}
.profile-pic div:nth-of-type(4) {
  animation-delay: 1s;
}
.profile-pic div:nth-of-type(5) {
  animation-delay: 1.25s;
}
.profile-pic div:nth-of-type(6) {
  animation-delay: 1.5s;
}
.profile-pic div:nth-of-type(7) {
  animation-delay: 1.75s;
}
.profile-pic div:nth-of-type(8) {
  animation-delay: 2s;
}
.profile-pic div:nth-of-type(9) {
  animation-delay: 2.25s;
}
.profile-pic div:nth-of-type(10) {
  animation-delay: 2.5s;
}
.profile-pic div:nth-of-type(11) {
  animation-delay: 2.75s;
}
.profile-pic div:nth-of-type(12) {
  animation-delay: 3s;
}
.profile-pic div:nth-of-type(13) {
  animation-delay: 3.25s;
}
.profile-pic div:nth-of-type(14) {
  animation-delay: 3.5s;
}
.profile-pic div:nth-of-type(15) {
  animation-delay: 3.75s;
}
.profile-pic div:nth-of-type(16) {
  animation-delay: 4s;
}
.profile-pic div:nth-of-type(17) {
  animation-delay: 4.25s;
}
.profile-pic div:nth-of-type(18) {
  animation-delay: 4.5s;
}
.profile-pic div:nth-of-type(19) {
  animation-delay: 4.75s;
}
.profile-pic div:nth-of-type(20) {
  animation-delay: 5s;
}
.profile-pic div:nth-of-type(21) {
  animation-delay: 5.25s;
}
.profile-pic div:nth-of-type(22) {
  animation-delay: 5.5s;
}
.profile-pic div:nth-of-type(23) {
  animation-delay: 5.75s;
}
.profile-pic div:nth-of-type(24) {
  animation-delay: 6s;
}
.profile-pic div:nth-of-type(25) {
  animation-delay: 6.25s;
}
.profile-pic div:nth-of-type(26) {
  animation-delay: 6.5s;
}
.profile-pic div:nth-of-type(27) {
  animation-delay: 6.75s;
}
.profile-pic div:nth-of-type(28) {
  animation-delay: 7s;
}
.profile-pic div:nth-of-type(29) {
  animation-delay: 7.25s;
}
.profile-pic div:nth-of-type(30) {
  animation-delay: 7.5s;
}
.profile-pic div:nth-of-type(31) {
  animation-delay: 7.75s;
}
.profile-pic div:nth-of-type(32) {
  animation-delay: 8s;
}
.profile-pic div:nth-of-type(33) {
  animation-delay: 8.25s;
}
.profile-pic div:nth-of-type(34) {
  animation-delay: 8.5s;
}
.profile-pic div:nth-of-type(35) {
  animation-delay: 8.75s;
}
.profile-pic div:nth-of-type(36) {
  animation-delay: 9s;
}
.profile-pic div:nth-of-type(37) {
  animation-delay: 9.25s;
}
.profile-pic div:nth-of-type(38) {
  animation-delay: 9.5s;
}
.profile-pic div:nth-of-type(39) {
  animation-delay: 9.75s;
}
.profile-pic div:nth-of-type(40) {
  animation-delay: 10s;
}
.profile-pic div:nth-of-type(41) {
  animation-delay: 10.25s;
}
.profile-pic div:nth-of-type(42) {
  animation-delay: 10.5s;
}
.profile-pic div:nth-of-type(43) {
  animation-delay: 10.75s;
}
.profile-pic div:nth-of-type(44) {
  animation-delay: 11s;
}
.profile-pic div:nth-of-type(45) {
  animation-delay: 11.25s;
}
.profile-pic div:nth-of-type(46) {
  animation-delay: 11.5s;
}
.profile-pic div:nth-of-type(47) {
  animation-delay: 11.75s;
}
.profile-pic div:nth-of-type(48) {
  animation-delay: 12s;
}
</style>
