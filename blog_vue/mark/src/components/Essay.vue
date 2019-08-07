<template>
  <div class="content_wrap">
    <div class="module-header-top" v-if="content">
      <div class="module-header_wrap">
        <div
          :class="['module-title_wrap',showCatalog? '':'display_title']"
          @click="showCatalog=!showCatalog"
        >
          <div :class="['module-title_inner',showCatalog?'' : 'display_title']">{{title.title}}</div>
        </div>
        <!-- <div class="module-tag">{{dateInfo[5]}}</div> -->
      </div>
      <div class="module-date_wrap">
        <div class="module-date_date">{{dateInfo[3]}}</div>
        <div class="module-date_line">
          <svg width="100%" height="100%" version="1.1">
            <line x1="20" y1="0" x2="0" y2="70" style="stroke:rgb(160,165,175);stroke-width:1" />
          </svg>
        </div>
        <div class="module-date_month">{{dateInfo[2]}}/{{dateInfo[1]}}</div>
        <div class="module-date_day">{{currentDay}}</div>
      </div>
    </div>
    <div class="module-bottom_wrap" v-if="content" @click="$emit('closeSwap')">
      <div :class="['module-catalog-href_wrap', content && showCatalog ? '' : 'display_catalog']">
        <Directory :hrefList="hrefList" />
      </div>
      <div class="module-content-scroll_wrap" @scroll="handleScroll">
        <div class="module-content-text" id="module-content-text" v-html="content"></div>
      </div>
    </div>
    <loading v-else></loading>
  </div>
</template>

<script>
import { request } from "../service";
import colorList from "../util";
import loading from "./SecondLoading";
import Directory from "./Directory";
import { commonMixin } from "../util/mixin.js";

export default {
  name: "essay",
  mixins: [commonMixin],
  data() {
    return {
      content: "",
      title: {},
      showCatalog: true,
      hrefList: [],
      hrefListActive: undefined,
      scorllMark: 0,
      dateInfo: [],
      HEADERHEIGHT: 90
    };
  },
  components: {
    loading,
    Directory
  },
  computed: {
    currentDay() {
      return [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
      ][this.dateInfo[4]];
    }
  },
  methods: {
    back() {
      this.$router.go(-1);
    },
    // Directory component
    gotoActive(item) {
      this.hrefList.forEach(e => {
        var x = document.querySelector(e.href);
        e.scrollTop = x.offsetTop;
        e.active = false;
      });
      document.querySelector(".module-content-scroll_wrap").scrollTo({
        top: item.scrollTop - this.HEADERHEIGHT,
        left: 0,
        behavior: "smooth"
      });
      item.active = true;
    },
    handleScroll(e) {
      window.location.hash = `${Math.ceil(e.target.scrollTop).toString(32)}`;
    }
  },
  created() {
    //
    function changeKeyWord(color, data) {
      const regs = color.keyword.reduce((a, b) => {
        return `${a}|${b}`;
      });
      const reg = new RegExp(`\\b(${regs})\\b`, "g");
      return data.replace(reg, `<font style="color: ${color.color}">$1</font>`);
    }

    function changeAnnnotationReg(mark) {
      const reg2 = /[^:|>](\/\/.+\n)/g;
      return mark.replace(reg2, `<font style="color: #608b4e">$1</font>`);
    }
    function handleDate(str) {
      return str.match(/(\d{4})(\d{2})(\d{2})/);
    }
    if (this.$route.params.filename) {
      request({
        url: `/catalog`,
        method: "GET",
        params: {
          filename: this.$route.params.filename
        },
        success: data => {
          if (true) {
            data = data[0];
            this.title = { title: data.title, tag: data.tag };
            this.dateInfo = handleDate(data.date);
            this.dateInfo.push(
              new Date(
                `${this.dateInfo[1]}/${this.dateInfo[2]}/${this.dateInfo[3]}`
              ).getDay()
            );
          }
          data = data.content;
          data = this.changeImgURL(data);

          let markdata = this.marked(data);

          markdata = markdata.replace(/<code>[\s\S]*?<\/code>/g, function(w) {
            colorList.forEach((e, i) => {
              w = changeKeyWord(colorList[i], w);
            });
            return w;
          });

          this.content = changeAnnnotationReg(markdata);
          const _reg = /<h(\d) id="([\w-]+)">([\s\S]+?)<\/h\d>/g;
          var obj = {};
          this.hrefList = this.content.match(_reg).map((e, i) => {
            return {
              order: i,
              no: `${e.replace(_reg, "$1")}.`,

              level: e.replace(_reg, "$1"),
              href: e.replace(_reg, "#$2"),
              name: e.replace(_reg, "$3"),
              active: false
            };
          });
          const _list = new Object();
          this.hrefList.forEach(e => {
            if (_list.hasOwnProperty(e.level)) {
              _list[e.level]++;
            } else {
              _list[e.level] = 1;
            }
            e.no += _list[e.level];
          });
        },
        fail: data => {
          this.content = data;
        }
      });
    }
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
    setTimeout(() => {
      if (document.querySelector(".module-content-scroll_wrap")) {
        document.querySelector(".module-content-scroll_wrap").scrollTo({
          top: parseInt(window.location.hash.slice(1), 32) || 0,
          left: 0,
          behavior: "smooth"
        });
      }
      window.MathJax.Hub.Queue([
        "Typeset",
        MathJax.Hub,
        document.getElementById("app")
      ]);
    }, 800);
  },
  deactivated() {
    this.$destroy();
  }
};
</script>

<style scoped>
.content_wrap {
  position: relative;
  height: 100vh;
  transition-delay: ;
}
.module-date_wrap {
  position: relative;
  display: grid;
  grid-template: 30px 10px 30px/90px 20px 140px;
  grid-template-areas:
    "date line month"
    "date line _"
    "date line day";
  grid-gap: 0px 10px;
  width: 280px;
  height: 70px;
  padding-right: 10px;
  font-weight: 800;
}

.module-date_wrap div {
}
.module-date_date {
  grid-area: date;
  height: 70px;
  color: rgb(0, 23, 44);
  font-size: 84px;
  line-height: 70px;
}
.module-date_month {
  grid-area: month;
  width: 140px;
  height: 30px;
  font-size: 36px;
  line-height: 1;
}
.module-date_day {
  grid-area: day;
  box-sizing: border-box;
  width: 120px;
  padding-top: 8px;
  height: 26px;
  font-size: 26px;
  line-height: 26px;
}
.module-date_line {
  grid-area: line;
  width: 20px;
  height: 70px;
}
.module-header_wrap {
  flex: 1;
}
.module-title_wrap {
  height: 70px;
  font-size: 30px;
  line-height: 70px;
  font-weight: 600;
  transition: all 1s;
  transform: translateX(20%);
  /* letter-spacing: 1vw; */
}
.module-title_wrap.display_title {
  /* letter-spacing: 0px;  */
  transform: translateX(0%);
  transition: transform 0.5s cubic-bezier(0.6, -0.28, 0.735, 0.045);
}
.module-title_inner {
  margin-left: 0;
}
.module-title_inner.display_title {
  /* transform: translateX(-50%);  */
}
.module-title_header {
  height: 40px;
  font-size: 40px;
  text-align: center;
  line-height: 40px;
  font-weight: 600;
}
.module-title_header-high {
  height: 70px;
  font-size: 60px;
  text-align: center;
  line-height: 70px;
  font-weight: 600;
}
.module-tag_wrap {
  display: flex;
  flex-wrap: wrap;
  width: 280px;
  height: 80px;
  justify-content: space-around;
}
.module-title_catalog {
  display: flex;
  justify-content: space-around;
}
.module-header-top {
  display: flex;
  width: 100vw;
  height: 90px;
  margin: 0;
  padding: 10px 2vw;
  box-sizing: border-box;
}
.module-catalog-href_wrap {
  width: 0vw;
  height: calc(100vh - 90px);
  /* background: #fff; */
  background-color: var(--primary-color);
  transition: all 1s 0.45s;
  overflow: auto;
}
.module-catalog-href_wrap.display_catalog {
  width: 20vw;
}

.module-content-text {
  padding-bottom: 30px;
}
.module-bottom_wrap {
  display: flex;
}
.module-content-scroll_wrap {
  flex: 1;
  height: calc(100vh - 90px);
  padding: 0 3vw;
  overflow: auto;
}

.percent-num {
  width: 5vw;
  line-height: 2vh;
}
</style>
