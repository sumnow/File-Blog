<template>
	<div class="catalog">
		<div class="header flexbox">
			<div @click="changeTheme">Title</div>
			<div class="mod-search" :class="{searchshow: iptClass}">
				<span @click="searchCatalog">Search</span>
				<input type="text" v-model.trim="searchMessage" ref="input_search"/>
			</div>
			<div @click="sortReserve">Time</div>
		</div>
		<div class="entry-wrap">
			<div class="catalog-entry" v-for="item in title[entryNum]" :key="item">
				<a @click="showContent(item)">
					<div class="flexbox">
						<div>
							<svg aria-hidden="true" class="icon-file" height="16" version="1.1" viewBox="0 0 12 16" width="12">
								<path d="M6 5H2V4h4v1zM2 8h7V7H2v1zm0 2h7V9H2v1zm0 2h7v-1H2v1zm10-7.5V14c0 .55-.45 1-1 1H1c-.55 0-1-.45-1-1V2c0-.55.45-1 1-1h7.5L12 4.5zM11 5L8 2H1v12h10V5z"></path>
							</svg>
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
			<div class="down" @click="toNum('down')">
        <svg class="icon" style="width: 1em; height: 1em;vertical-align: middle;fill: currentColor;overflow: hidden;" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="777"><path d="M65.582671 288.791335l446.417329 446.41733 446.417329-446.41733z" p-id="778"></path></svg>
      </div>
			<div class="decade">{{parseInt((entryNum+1)/10)}}</div>

      <div class="up" @click="toNum('up')">
        <svg class="icon" style="width: 1em; height: 1em;vertical-align: middle;fill: currentColor;overflow: hidden;" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="757"><path d="M65.582671 735.208665l446.417329-446.41733 446.417329 446.41733z" p-id="758"></path></svg>
      </div>
			<div class="left" @click="toNum('left')">
        <svg class="icon" style="width: 1em; height: 1em;vertical-align: middle;fill: currentColor;overflow: hidden;" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="817"><path d="M735.208665 65.582671l-446.41733 446.417329 446.41733 446.417329z" p-id="818"></path></svg>
      </div>
			<div class="unit">{{(entryNum+1)%10}}</div>
			<div class="right" @click="toNum('right')">
        <svg class="icon" style="width: 1em; height: 1em;vertical-align: middle;fill: currentColor;overflow: hidden;" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="797"><path d="M288.791335 65.582671l446.41733 446.417329-446.41733 446.417329z" p-id="798"></path></svg>
      </div>

			<!-- <div @click="backtoFirst"> -->
        <!-- <svg class="icon" style="width: 1em; height: 1em;vertical-align: middle;fill: currentColor;overflow: hidden;" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="427"><path d="M460.8 486.4 486.4 486.4 486.4 460.8 486.4 243.2C486.4 108.884349 377.51565 0 243.2 0 108.884349 0 0 108.884349 0 243.2 0 377.51565 108.884349 486.4 243.2 486.4L460.8 486.4ZM51.2 243.2C51.2 137.161328 137.161328 51.2 243.2 51.2 349.238671 51.2 435.2 137.161328 435.2 243.2L435.2 460.8 460.8 435.2 243.2 435.2C137.161328 435.2 51.2 349.238671 51.2 243.2ZM460.8 588.8 435.2 563.2 435.2 780.8C435.2 886.838671 349.238671 972.8 243.2 972.8 137.161328 972.8 51.2 886.838671 51.2 780.8 51.2 674.761329 137.161328 588.8 243.2 588.8L460.8 588.8ZM0 780.8C0 915.11565 108.884349 1024 243.2 1024 377.51565 1024 486.4 915.11565 486.4 780.8L486.4 563.2 486.4 537.6 460.8 537.6 243.2 537.6C108.884349 537.6 0 646.48435 0 780.8ZM563.2 435.2 588.8 460.8 588.8 243.2C588.8 137.161328 674.761329 51.2 780.8 51.2 886.838671 51.2 972.8 137.161328 972.8 243.2 972.8 349.238671 886.838671 435.2 780.8 435.2L563.2 435.2ZM1024 243.2C1024 108.884349 915.11565 0 780.8 0 646.48435 0 537.6 108.884349 537.6 243.2L537.6 460.8 537.6 486.4 563.2 486.4 780.8 486.4C915.11565 486.4 1024 377.51565 1024 243.2ZM1024 780.8C1024 646.48435 915.11565 537.6 780.8 537.6L563.2 537.6 537.6 537.6 537.6 563.2 537.6 780.8C537.6 915.11565 646.48435 1024 780.8 1024 818.513163 1024 855.051123 1015.390662 888.179087 999.065099 900.861235 992.815296 906.075682 977.467919 899.825882 964.785773 893.576079 952.103625 878.228702 946.889178 865.546554 953.138978 839.420429 966.014014 810.620764 972.8 780.8 972.8 674.761329 972.8 588.8 886.838671 588.8 780.8L588.8 563.2 563.2 588.8 780.8 588.8C886.838671 588.8 972.8 674.761329 972.8 780.8 972.8 799.469549 970.142607 817.755731 964.968006 835.279443 960.963957 848.839106 968.71031 863.07731 982.269973 867.081361 995.829636 871.085412 1010.06784 863.339057 1014.071891 849.779394 1020.63305 827.560122 1024 804.391296 1024 780.8Z" p-id="428"></path></svg> -->
      <!-- </div> -->
			<div @click="backtoFirst">{{title.length}}</div>
			<!-- <div v-for="(v, i) in title" :key="i" @click="toNum(i)" :class="{active: i === entryNum}">{{i+1}}</div> -->
		</div>
	</div>
</template>

<script>
import request from "../service";
import changeTheme from "../util/theme";
export default {
  create: {},
  data() {
    return {
      titleArr: [],
      currentTheme: 0,
      title: [],
      entryNum: 0,
      filename: [11, -3],
      filedate: [0, 10],
      iptClass: false,
      searchMessage: "",
      filterTitleArr: []
    };
  },
  watch: {
    searchMessage: function(val) {
      this.filterTitleArr = this.titleArr.filter(e => e.includes(val));
      this.title = this.catalogPage(this.filterTitleArr);
      this.backtoFirst();
    }
  },
  methods: {
    changeTheme() {
      changeTheme(++this.currentTheme);
    },
    showContent(item) {
      this.$router.push(`catalog/${item}`);
    },
    searchCatalog() {
      this.iptClass = !this.iptClass;
      if (!this.iptClass) {
        this.searchMessage = "";
      }
      this.$refs.input_search.focus();
    },
    toNum(i) {
      const titleLength = this.title.length - 1;
      const isinRange = (i, min, max, plus) => {
        if (max >= i + plus && i + plus >= min) {
          console.log(i + plus);
          return i + plus;
        } else {
          return i;
        }
      };
      switch (i) {
        case "up":
          this.entryNum = isinRange(this.entryNum, 0, titleLength, 10);
          break;
        case "down":
          this.entryNum = isinRange(this.entryNum, 0, titleLength, -10);
          break;
        case "left":
          this.entryNum = isinRange(this.entryNum, 0, titleLength, -1);
          break;
        case "right":
          this.entryNum = isinRange(this.entryNum, 0, titleLength, 1);
          break;
        case "home":
          this.entryNum = 0;
          break;
      }
    },
    backtoFirst() {
      this.toNum("home")
    },
    sortReserve() {
      this.titleArr = this.titleArr.reverse();
      this.title = this.catalogPage(this.titleArr);
    },
    catalogPage(arrayBefore, pageSize = 8) {
      const arrayAfter = [];
      for (let i = 0; i < arrayBefore.length / pageSize; i++) {
        arrayAfter.push(
          arrayBefore.slice(i * pageSize, i * pageSize + pageSize)
        );
      }
      return arrayAfter;
    }
  },
  mounted() {
    if (!this.titleArr.length) {
      request({
        url: "/code/catalog",
        method: "GET",
        success: data => {
          this.titleArr = data.reverse();
          this.title = this.catalogPage(this.titleArr);
        }
      });
    }
  },
  activated() {
  }
};
</script>

<style scoped>
.catalog {
  height: 80vh;
  padding: 2vh 5vw;
}

.mod-search span {
  position: relative;
  left: 20vw;
  transition: all 1s;
  cursor: pointer;
}

.mod-search input {
  width: 20vw;
  padding: 0 1vw;
  color: var(--text-color);
  background-color: transparent;
  border: none;
  border-bottom: 1px solid #ccc;
  outline: none;
  transform: scaleX(0);
  transition: all 1s;
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

.header div {
  color: var(--text-color);
  cursor: pointer;
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
  fill: rgba(3, 47, 98, 0.55);
  vertical-align: -3px;
}

.catalog-entry a {
  width: 100%;
  display: inline-block;
  color: #4183c4;
}

.catalog-entry a .flexbox {
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

.entry-num > div {
  position: relative;
  z-index: 2;
  width: 4vh;
  height: 4vh;
  margin: 0 1vw;
  /* min-width: 20px; */
  color: #4183c4;
  text-align: center;
  line-height: 4vh;
  border-radius: 50%;
  /* border: 1px solid #000;  */
}

.entry-num > div:before {
  position: absolute;
  left: 0;
  top: 0;
  z-index: -1;
  content: "";
  display: block;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background-color: #ccc;
  transform: scale(0);
  transition: transform 1s;
}

.entry-num > div:after {
  position: absolute;
  left: 0;
  top: 0;
  z-index: -1;
  content: "";
  display: block;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  box-shadow: 0 0 1px #000;
  transform: scale(1);
  transition: transform 1s;
}

.entry-num > div.active:before {
  color: #fff;
  transform: scale(1);
}

.entry-num > div.active:after {
  transform: scale(0);
}
</style>
