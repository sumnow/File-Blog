<template>
  <div class="content-wrap">
    <div class="content-top">
      <div class="scroll-bar">
        <div class="bar" id="bar">
          <div class="bar-inner"></div>
        </div>
      </div>
    </div>
    <div class="scroll-wrap">
      <div class="content" id="content">
        <div class="content-text" id="content-text" v-html="content"></div>
      </div>
    </div>
  </div>
</template>

<script>
import request from '../service'
import colorList from '../util'

export default {
  data() {
    return {
      content: '',
    }
  },
  methods: {
    back() {
      this.$router.go(-1);
    },
    handleScroll() {
      let scroll = document.getElementById('content');
      let scrolltxt = document.getElementById('content-text').offsetHeight;
      let scrolltop = scroll.scrollTop;
      let scrollhgt = scroll.offsetHeight;
      document.getElementById('bar').style.transform = 'translateX(-'+ Math.floor((1 - scrolltop / (scrolltxt - scrollhgt)) * 100) +'%)'
    },
  },
  mounted() {
    // 绑定上滚动时间
    document.getElementById('content').addEventListener('scroll', this.handleScroll);

    const changeImgURL = data =>{
      const reg = /!\[(\w+)\]\(\.\.(\/img\/\w+\.(png|jpg))\)/g;
      return data.replace(reg,'![$1](markdown$2)')
    }

    //
    function changeKeyWord(color,data) {
      const regs = color.keyword.reduce((a,b)=>{
        return `${a}|${b}`
      })
      const reg = new RegExp(`\\b(${regs})\\b`,'g')
      return data.replace(reg, `<font style="color: ${color.color}">$1</font>`)
    }

    function changeAnnnotationReg (mark) {
      const reg2 = /[^:](\/\/.+\n)/g
      return mark.replace(reg2,`<font style="color: #608b4e">$1</font>`)
    }
    
    request({
      url: `/code`,
      method: 'GET',
      params: {
        filename: this.$route.params.id,
      },
      success: (data) => {
        data = changeImgURL(data)
        let markdata = this.marked(data)

        markdata = markdata.replace(/<code>[\s\S]*?<\/code>/g,function (w) {
          colorList.forEach((e,i)=>{
            w = changeKeyWord(colorList[i],w)
          })
          return w
        })

        this.content = changeAnnnotationReg(markdata)
      },
      fail: (data) => {
        this.content = data;
      },
    })
  },
  deactivated () {
    this.$destroy()
  }
}
</script>

<style scoped>
.content-wrap {
  display: flex;
  flex-direction: column;
  height: 80vh;
}

.content-top {
  display: flex;
  height: 2vh;
  margin: 1.5vh 0;
  background-color: transparent;
  justify-content: space-around;
}

.content {
  height: 75vh;
  width: 90vw;
  padding: 0 5vw 0 4vw;
  overflow: auto;
}
.content-text {
  overflow: hidden;

}
/* .content-text:before,.content-text:after {
  display: table;
  content: '';
} */

.scroll-wrap {
  width: 90vw;
  margin: 0 5vw;
  overflow: hidden;
}

.scroll-bar {
  width: 90vw;
  height: 1vh;
  margin: 0.5vh 0;
  background-color: #000;
  border-radius: 5px;
  overflow: hidden;
}

.backbtn {
  width: 5vw;
  text-align: center;
}

.percent-num {
  width: 5vw;
  line-height: 2vh;
}

.bar {
  background-color: #81d8d0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  border-radius: 2px;
  transform: translateX(-100%)
  /* overflow: hidden; */
  /* box-shadow: inset 0px 4px 40px rgba(255,255,255,0.2), 0 10px 10px -5px #79aa1e, 0 7px 0 #628c14; */
}

.bar-inner {
  width: 200%;
  background: url(../assets/lines.svg) repeat-x;
  height: 120%;
  text-align: center;
  overflow: hidden;
  border-radius: 50px;
  animation: moveBars 1s linear infinite;
  font-weight: bold;
  color: #fff;
  color: 1px;
  font-size: 18px;
  text-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);
}

@keyframes moveBars {
  100% {
    margin-left: -180px;
  }
}
</style>
