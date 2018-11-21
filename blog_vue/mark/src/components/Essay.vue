<template>
  <div class="content-wrap">
    <div class="scroll-wrap" v-if="content">
      <div class="content-text" id="content-text" v-html="content"></div>
    </div>
    <loading v-else></loading>
  </div>
</template>

<script>
import { request } from "../service";
import colorList from "../util";
import loading from './SecondLoading'

export default {
  name: "essay",
  data() {
    return {
      content: ""
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
  mounted() {
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
        },
        fail: data => {
          this.content = data;
        }
      });
    }
  },
  deactivated() {
    this.$destroy();
  }
};
</script>

<style scoped>
.content-wrap {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background: #fff;
}

.content-text {
  padding-bottom: 30px;
}
/* .content-text:before,.content-text:after {
  display: table;
  content: '';
} */

.scroll-wrap {
  height: 100vh;
  margin: 0 5vw;
  overflow: auto;
}

.percent-num {
  width: 5vw;
  line-height: 2vh;
}

</style>
