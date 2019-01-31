<template>
  <div class="content-wrap">
    <ul class="ul-content-href">
      <li class="li-catalog">Catalog 目录</li>
      <li
        class="li-content-href"
        v-for="item in hrefList"
        :key="item.href"
        :style="{marginLeft: item.level*10+'px'}"
      >
        <div
          :href="item.href"
          :style="{  fontSize: 30 - item.level*4+'px' }"
          @click="gotoActive(item)"
        >{{item.name}}</div>
      </li>
    </ul>
    <div class="scroll-wrap" v-if="content">
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
      hrefList: []
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
      console.log(item);
      document.querySelector(".scroll-wrap").scrollTo(0, item.scrollTop);
    }
  },
  created() {
    const changeImgURL = data => {
      const reg = /!\[(\w+)\]\(\.\.\/\.\.(\/img\/\w+\.(png|jpg))\)/g;
      return data.replace(reg, "![$1](markdown/knowledge$2)");
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
          // console.log(document.querySelector())
          this.hrefList = this.content.match(_reg).map(e => {
            return {
              level: e.replace(_reg, "$1"),
              href: e.replace(_reg, "#$2"),
              name: e.replace(_reg, "$3")
            };
          });
          this.$nextTick(() => {
            this.hrefList.map(e => {
              console.log(e.name);
              var x = document.querySelector(e.href);
              console.dir(x);
              e.scrollTop = x.offsetTop;
              console.log(x);
            });
          });
        },
        fail: data => {
          this.content = data;
        }
      });
    }
  },
  mounted() {},
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
  overflow-y: auto;
  margin: 0;
  border-right: 1vw solid #eee;
}

.li-catalog {
  font-size: 32px;
  font-weight: bold;
  list-style: none;
}

.li-content-href {
  list-style-type: square;
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
  padding: 0 5vw 0 3vw;
  overflow: auto;
}

.percent-num {
  width: 5vw;
  line-height: 2vh;
}
</style>
