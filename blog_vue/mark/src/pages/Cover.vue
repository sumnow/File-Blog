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
        function qqBg(l) {
          var d = 6,
            s = l.canvas.getContext("2d"),
            a = typeof Float32Array === "function" ? Float32Array : Array,
            u = [],
            r = [],
            b = Math.PI * 2,
            q,
            m,
            i,
            e,
            w = 0.018,
            y = 0.015,
            z = 100,
            k = 0.6,
            c = 0.2,
            f,
            h = 0;
          window.raf =
            window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            function(A) {
              return setTimeout(A, 1000 / 60);
            };
          function j(B, D, C, A) {
            this.x = B;
            this.y = D;
            this.z = C;
            this.cx = B;
            this.cy = D;
            this.radius = A;
          }
          j.prototype.move = function() {
            this.x = this.cx + this.cx * 0.5 * Math.cos(h * 0.08);
            this.y = this.cy + this.cy * 0.5 * Math.sin(h * 0.07);
          };
          function v(B, A, C) {
            this.a = B;
            this.b = A;
            this.c = C;
            this._depth = Math.max(B[2], A[2], C[2]);
            this.lightness = Math.random() * 10 + 30;
          }
          v.prototype.getNormalAngle = function() {
            var I = this.a[5] - this.b[5],
              H = this.a[6] - this.b[6],
              G = this.a[2] - this.b[2],
              D = this.a[5] - this.c[5],
              B = this.a[6] - this.c[6],
              A = this.a[2] - this.c[2],
              F = H * A - G * B,
              E = A * D - I * D,
              C = I * B - H * D,
              J = Math.sqrt(F * F + E * E + C * C);
            return C / J;
          };
          v.prototype.getColor = function(F, C) {
            var D = (this.a[0] + this.b[0] + this.c[0]) / 3 - C.x,
              B = (this.a[1] + this.b[1] + this.c[1]) / 3 - C.y,
              E = Math.sqrt(D * D + B * B),
              A = E > C.radius ? 0 : 1 - E / C.radius;
            return "hsl(200,100%," + (this.lightness + 30 * A) + "%)";
          };
          v.prototype.getDepth = function() {
            return this._depth;
          };
          v.prototype.draw = function(B, A) {
            var C = this.getNormalAngle();
            if (C < 0) {
              return;
            }
            B.fillStyle = B.strokeStyle = this.getColor(C, A);
            B.beginPath();
            B.moveTo(this.a[5], this.a[6]);
            B.lineTo(this.b[5], this.b[6]);
            B.lineTo(this.c[5], this.c[6]);
            B.closePath();
            B.stroke();
            B.fill();
          };
          function t() {
            var B,
              C,
              H,
              I,
              G,
              E,
              J,
              F,
              D,
              A = l.canvas.getBoundingClientRect();
            l.canvas.width = q = G = l.width;
            l.canvas.height = m = E = l.height;
            G *= 1.5;
            E *= 1.5;
            if (G > E) {
              J = d;
              F = (G / E * d) | 0;
              D = m * 0.4;
            } else {
              J = (m / G * d + 0.5) | 0;
              F = d;
              D = q * 0.4;
            }
            i = G / F;
            e = E / J;
            f = new j(q / 2, m / 2, 100, D);
            u.length = 0;
            F += 2;
            J += 2;
            B = J;
            while (B--) {
              C = F;
              while (C--) {
                H = new a(7);
                H[0] = i * (C - 1);
                H[1] = e * (B - 1);
                H[2] = Math.random() * z;
                H[3] = Math.random() * b;
                H[4] = Math.random() * 0.8 + 0.2;
                u[B * F + C] = H;
              }
            }
            for (B = 1; B < J; B++) {
              for (C = 1; C < F; C++) {
                I = B * F + C;
                r.push(new v(u[I], u[I - 1], u[I - 1 - F]));
                r.push(new v(u[I], u[I - 1 - F], u[I - F]));
              }
            }
            r.sort(function(L, K) {
              return K.getDepth() - L.getDepth();
            });
            o();
          }
          function p() {
            var C = u.length,
              B,
              A,
              D;
            while (C--) {
              B = u[C];
              B[5] = B[0] + i * Math.cos(B[3] + h * B[4] * w) * k;
              B[6] = B[1] + e * Math.sin(B[3] + h * B[4] * y) * c;
            }
            f.move();
          }
          function o() {
            var A = r.length;
            h += 0.1;
            p();
            while (A--) {
              r[A].draw(s, f);
            }
            raf(o);
          }
          t();
        },
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
    isComputer() {
      return !/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/.test(
        navigator.userAgent
      );
    }
  },
  created() {},
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
