<template>
  <div>
    <div v-if="!computer">
      <div class="bg">
        <div class="logo">
          I AM GOD
        </div>
        <div class="wrap">

        </div>
      </div>
    </div>
    <div v-else>
      <div class="bser">
        <canvas id="canvas"></canvas>
        <div class="model one">
        </div>
        <div class="model two">
        </div>
        <div class="model three">
        </div>
      </div>
    </div>
  </div>

</template>

<script>
export default {
  data() {
    return {
      computer: true
    };
  },
  mounted() {
    const canvas = document.getElementById('canvas');
    canvas.width = document.body.clientWidth;
    canvas.height = document.body.clientHeight;
    if (document.body.clientWidth - document.body.clientHeight < 0) {
      console.log("mobile");
    } else {
      console.log("computer");
    }
    // console.log(document.body.clientWidth,document.body.clientHeight)
  }
};
</script>

<style scoped>
canvas {
  position: absolute;
  z-index: 2;
  /* width: 100vw; */
  /* height: 100vh; */

}
.bser {
  width: 100vw;
  height: 100vh;
  background: linear-gradient(rgba(255, 255, 255, 0.7), rgba(0, 0, 0, 0.7));
  /* background: linear-gradient(rgba(0, 235, 235, .7),rgba(0, 5, 255, .7)); */
}
.logo {
  position: fixed;
  z-index: 10;
  left: 50%;
  top: 50%;
  transform: translate3d(-50%, -50%, 0);
  width: 50vw;
  height: 10vh;
  color: #000;
  text-align: center;
  line-height: 10vh;
  background: #fff;
}
.wrap {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
}
.wrap:before {
  display: block;
  content: "";
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate3d(-50%, -50%, 0);
  width: 60vw;
  height: 20vh;
  background: red;
  mix-blend-mode: darken;
}
.bg {
  width: 100vw;
  height: 100vh;
  background: green;
}
.model {
  height: 30vh;
}
.model:before {
  display: block;
  width: 100vw;
  height: 30vh;
  content: "";
  background: rgba(0, 215, 215, 0.7);
  transform: skewY(20deg);
}

.two:before {
  transform: skewY(160deg);
}
</style>
