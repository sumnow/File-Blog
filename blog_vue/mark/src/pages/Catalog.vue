<template>
  <div class="catalog">
    <div class="flexbox">
      <div>Title</div>
      <div class="mod-search" :class="{searchshow: iptClass}">
        <span @click="searchCatalog" >Search</span>
        <input type="text" v-model.trim="searchMessage"/>
      </div>
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
  create: {
  },
  data() {
    return {
      titleArr: [],
      title: [],
      entryNum: 0,
      filename: [11,-3],
      filedate: [0,10],
      iptClass: false,
      searchMessage: '',
    }
  },
  watch:{
    searchMessage: function (val, oldval){


    }
  },
  methods : {
    showContent(item) {
      this.$router.push(`catalog/${item}`);
    },
    searchCatalog(){
      console.log(this.iptClass)
      this.iptClass = !this.iptClass;
    },
    toNum(i) {
      this.entryNum = i;
    },
  },
  computed: {
  },
  mounted() {
    const pageSize = 8;
    if(!this.titleArr.length) {
      request({
        url: '/code/catalog',
        method: 'GET',
        success: (data) => {
          this.titleArr = data.reverse();
          for(let i = 0 ; i < this.titleArr.length/pageSize ; i++) {
            this.title.push(this.titleArr.slice(i*pageSize,i*pageSize+pageSize));
          }
        },
      })
    }
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

.mod-search span{
  position: relative;
  left: 5vw;
  transition: all 1s;
}

.mod-search  input{
  width: 10vw;
  padding: 0 1vw;
  transform: scaleX(0);
  transition: all 1s;
  border: none;
  border-bottom: 1px solid #ccc;
  transform-origin: 100% 0;
}

.searchshow span {
  left: 0;
}

.searchshow input {
  transform: scaleX(1);
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
