<template>
  <div class="content-wrap">
    <ul class="ul-content-href" v-if="content">
      <li class="li-catalog" @click="$emit('swap')">Catalog</li>
      <li
        class="li-content-href"
        v-for="item in hrefList"
        :key="item.href"
        :style="{marginLeft: item.level*10+'px'}"
      >
        <div
          :href="item.href"
          :style="{  fontSize: 22 - item.level*2+'px' }"
          @click="gotoActive(item)"
        >{{item.name}}</div>
      </li>
    </ul>
    <div class="scroll-wrap" v-if="content" @scroll="handleScroll" @click="$emit('closeSwap')">
      <div class="content-text" id="content-text" v-html="content"></div>
    </div>
    <loading v-else></loading>
  </div>
</template>

<script>
import { request } from "../service";
import colorList from "../util";
import loading from "./SecondLoading";

export default {
  name: "essay",
  data() {
    return {
      content: "",
      hrefList: [],
      scorllMark: 0
    };
  },
  components: {
    loading
  },
  methods: {
    back() {
      this.$router.go(-1);
    },
    gotoActive(item) {
      this.hrefList.map(e => {
        var x = document.querySelector(e.href);
        e.scrollTop = x.offsetTop;
      });
      document.querySelector(".scroll-wrap").scrollTo({
        top: item.scrollTop,
        left: 0,
        behavior: "smooth"
      });
    },
    handleScroll(e) {
      window.location.hash = `${(Math.ceil(e.target.scrollTop).toString(32))}`;
    }
  },
  created() {
    const changeImgURL = data => {
      const reg = /!\[(\S+)\]\(\.\.\/\.\.(\/img\/\w+\.(png|jpg|bmp|gif|svg|webp))\)/g;
      return data.replace(reg, "![$1](../../markdown/knowledge$2)");
    };

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
    if (this.$route.params.filename) {
      request({
        url: `/catalog`,
        method: "GET",
        params: {
          type: this.$route.params.type,
          filename: this.$route.params.filename
        },
        success: data => {
          data = changeImgURL(data);

          let markdata = this.marked(data);

          markdata = markdata.replace(/<code>[\s\S]*?<\/code>/g, function(w) {
            colorList.forEach((e, i) => {
              w = changeKeyWord(colorList[i], w);
            });
            return w;
          });

          this.content = changeAnnnotationReg(markdata);
          const _reg = /<h(\d) id="([\w-]+)">([\s\S]+?)<\/h\d>/g;
          this.hrefList = this.content.match(_reg).map(e => {
            return {
              level: e.replace(_reg, "$1"),
              href: e.replace(_reg, "#$2"),
              name: e.replace(_reg, "$3")
            };
          });
          // this.$nextTick(() => {
          //   this.hrefList.map(e => {
          //     var x = document.querySelector(e.href);
          //     e.scrollTop = x.offsetTop;
          //   });
          // });
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
      document.querySelector(".scroll-wrap").scrollTo({
        top: parseInt(window.location.hash.slice(1),32) || 0,
        left: 0,
        behavior: "smooth"
      });
      window.MathJax.Hub.Queue(["Typeset", MathJax.Hub, document.getElementById('app')]);
    }, 800);
    // this.$refs.wrapper.scrollTo(0)
    // this.$nextTick(() => {
    // console.log(document.querySelector(".scroll-wrap"))
    // });
  },
  deactivated() {
    this.$destroy();
  }
};
</script>

<style scoped>
.content-wrap {
  position: relative;
  display: flex;
  height: 100vh;
}

.ul-content-href {
  width: 20vw;
  height: 100vh;
  padding-right: 2vw;
  overflow-y: auto;
  margin: 0;
  border-right: 1px solid #eee;
}

.li-catalog:nth-child(1) {
  font-weight: bold;
}
.li-catalog {
  font-size: 20px;
  list-style: none;
}

.li-content-href {
  list-style-type: none;
  word-wrap: none;
  word-break: break-all;
}

.li-content-href a {
  display: block;
  color: inherit;
  text-decoration: none;
}
.content-text {
  padding-bottom: 30px;
}

.scroll-wrap {
  flex: 1;
  height: 100vh;
  padding: 0 7vw 0 3vw;
  overflow: auto;
}

.percent-num {
  width: 5vw;
  line-height: 2vh;
}
</style>
