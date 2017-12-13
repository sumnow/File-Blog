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
    const canvas = document.getElementById('canvas');
    const HEIGHT = document.body.clientHeight;
    const WIDTH = document.body.clientWidth;
    canvas.width = WIDTH;
    canvas.height = HEIGHT;
    const ctx = canvas.getContext('2d');

    if (document.body.clientWidth - document.body.clientHeight < 0) {
      // draw circle
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
      // circle = [apl ,x ,y ,radius]

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
      console.log("mobile");
    } else {
      let time = 1,
      cos = Math.cos,
      sin = Math.sin,
      PI = Math.PI;

      setInterval(()=>{
        ctx.clearRect(0,0,WIDTH,HEIGHT);
        ctx.fillStyle="rgba(0,255,255,0.5)";
        ctx.globalCompositeOperation = 'lighter';
        time += .1;

        let i = 10000;

        while (i--) {
          let r = ((WIDTH+HEIGHT)*.4)*(cos((time+i)*(.05+((sin(time * 0.00002)/PI)* .2)))/PI);
          ctx.fillRect(sin(i) * r + (WIDTH/2),cos(i)*r+(HEIGHT/2),2,2);
        }
      },16);
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
  background: black;
  /* width: 100vw; */
  /* height: 100vh; */

}

</style>
