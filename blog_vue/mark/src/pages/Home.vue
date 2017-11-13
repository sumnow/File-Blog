<template>
  <div>
    <div v-if="computer">
      <canvas id="canvas"></canvas>
    </div>
    <div v-else>
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
    if (document.body.clientWidth - document.body.clientHeight < 0) {
      console.log("mobile");
    } else {
      console.log("computer");
    }
    const canvas = document.getElementById('canvas');
    const HEIGHT = document.body.clientHeight;
    const WIDTH = document.body.clientWidth;
    canvas.width = WIDTH;
    canvas.height = HEIGHT;
    const ctx = canvas.getContext('2d');
    ctx.font = "48px monaco";
    // ctx.strokeStyle = "yellow"
    // ctx.strokeText("helloworld",10,50)
    ctx.fillRect(0,0,WIDTH,HEIGHT);

    // ctx.beginPath()
    // ctx.arc(100,100,100,0,2*Math.PI,true);
    // ctx.clip();



    function drawCircle(alph,x,y,r) {
      if (alph <= 0) {
        alph = 0;
      } else {
        ctx.beginPath();
        ctx.strokeStyle=`rgba(255,255,255,${alph/100})`;
        ctx.arc(x,y,r,0,2*Math.PI,true);
        ctx.stroke();
        ctx.closePath();
      }
    }
    let n = 0;
    const arrDot = new Array();
    const arrDotRef = new Array();

    //  plus radius and drawCircle
    function everyCircle(circle) {
      
      drawCircle(...circle);
      circle[0]= circle[0] - .25;
      circle[3]++;
    }


    //draw
    function draw () {
      ctx.fillRect(0,0,WIDTH,HEIGHT);
      arrDot.map(c=>{
        everyCircle(c);
      })
      window.requestAnimationFrame(draw);
    }

    window.requestAnimationFrame(draw);
    const self = this;
    console.log(self.$router)
    canvas.addEventListener('click',function(e){
      console.log(e)
      if(arrDot.length > 10) {
        self.$router.push({path: '/code'})
      } else {
        let arr = [100,e.clientX,e.clientY,0]
        arrDot.push(arr);
      }
      // drawCircle(100, ...arr, 0)
    })
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

</style>
