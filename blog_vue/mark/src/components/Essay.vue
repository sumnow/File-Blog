<template>
  <div class="content-wrap">
    <div class="ul-content-href">
      <div class="li-content-href" v-for="item in hrefList" :key="item.href">
        <a :href="item.href" :style="{fontSize: 26-item.level*3+'px' }">{{item.name}}</a>
      </div>
    </div>
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
          this.hrefList = this.content.match(_reg).map(e => {
            return {
              level: e.replace(_reg, '$1'),
              href: e.replace(_reg, "#$2"),
              name: e.replace(_reg, "$3")
            };
          });
          // this.hrefList = this.content.match(reg1).map(e => e.replace(reg1, '$1_$2'));
          console.log(this.hrefList)
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
  width: 200px;
}

.li-content-href {
}

.li-content-href a {
  display: block;
  color: inherit;
  text-decoration: none;
}
.content-text {
  padding-bottom: 30px;
}
/* .content-text:before,.content-text:after {
  display: table;
  content: '';
} */

.scroll-wrap {
  flex: 1;
  height: 100vh;
  padding: 0 5vw;
  overflow: auto;
}

.percent-num {
  width: 5vw;
  line-height: 2vh;
}
</style>
