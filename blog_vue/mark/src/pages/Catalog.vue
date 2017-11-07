<template>
  <div class="catalog">
    <div class="flexbox">
      <div>Title</div>
      <div>Time</div>
    </div>
    <div class="entry-wrap">
      <div class="catalog-entry" v-for="item in title[entryNum]" :key="item">
        <a @click="showContent(item)">
          <div class="flexbox">
            <div>
              <svg aria-hidden="true" class="icon-file" height="16" version="1.1" viewBox="0 0 12 16" width="12"><path d="M6 5H2V4h4v1zM2 8h7V7H2v1zm0 2h7V9H2v1zm0 2h7v-1H2v1zm10-7.5V14c0 .55-.45 1-1 1H1c-.55 0-1-.45-1-1V2c0-.55.45-1 1-1h7.5L12 4.5zM11 5L8 2H1v12h10V5z"></path></svg>
              <span>{{item.slice(...filename)}}</span>
            </div>
            <div>
              <span>{{item.slice(...filedate)}}</span>
            </div>
          </div>
        </a>
      </div>
    </div>
    <div class="entry-num">
      <div v-for="(v, i) in title" :key="i" @click="toNum(i)" :class="{active: i === entryNum}">{{i+1}}</div>
    </div>
  </div>
</template>

<script>
import request from '../service'

export default {
  data() {
    return {
      titleArr: [],
      title: [],
      entryNum: 0,
      filename: [11,-3],
      filedate: [0,10],
    }
  },
  methods : {
    showContent(item) {
      this.$router.push(`catalog/${item}`);
    },
    toNum(i) {
      this.entryNum = i;
    },
  },
  computed: {

  },
  mounted() {
    request({
      url: '/code/catalog',
      method: 'GET',
      success: (data) => {
        this.titleArr = data.reverse();
        for(let i = 0 ; i < this.titleArr.length/8 ; i++) {
          this.title.push(this.titleArr.slice(i*8,i*8+8));
        }
      },
    })
  },
  activated () {
    console.log(this.$route)
  },

}
</script>

<style scoped>

.catalog {
  height: 80vh;
  padding: 2vh 5vw;
  /* test */
  /* background-color: blue; */
}

.flexbox {
  display: flex;
  justify-content: space-between;
}

.catalog-entry {
  height: 6vh;
  line-height: 6vh;
  margin-bottom: 2vh;
  overflow: hidden;
  color: rgba(255, 255, 255, 0.2);
}

.catalog-entry .icon-file {
  display: inline-block;
  fill: rgba(3,47,98,0.55);
  vertical-align: -3px;
}

.catalog-entry a {
  width: 100%;
  display: inline-block;
  color: #4183C4;
}
.catalog-entry a .flexbox{
}

.entry-wrap {
  height: 64vh;
}

.entry-num {
  display: flex;
  overflow-y: auto;
  justify-content: space-around;
  height: 8vh;
  padding: 2vh 0;
  line-height: 8vh;
  /* background: #ccc; */
}

.entry-num>div{
  position: relative;
  z-index: 2;
  width: 4vh;
  height: 4vh;
  margin: 0 1vw;
  /* min-width: 20px; */
  color: #4183C4;
  text-align: center;
  line-height: 4vh;
  border-radius: 50%;
  /* border: 1px solid #000;  */
}

.entry-num>div:before {
  position: absolute;
  left: 0;
  top: 0;
  z-index: -1;
  content: '';
  display: block;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background-color: #ccc;
  transform: scale(0);
  transition: transform 1s;
}

.entry-num>div:after {
  position: absolute;
  left: 0;
  top: 0;
  z-index: -1;
  content: '';
  display: block;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  box-shadow: 0 0 1px #000;
  transform: scale(1);
  transition: transform 1s;
}

.entry-num>div.active:before {
  color: #fff;
  transform: scale(1);
}

.entry-num>div.active:after {
  transform: scale(0);
}
</style>
