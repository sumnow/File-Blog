<template>
  <div class="mob-scroll-wrap">
    <div class="mob-content-wrap">
      <div class="mob-content-left" @click="goBack"></div>
      <div class="mob-content-inner-text" v-html="content"></div>
      <div class="mob-content-right" @click="goBack"></div>
    </div>
  </div>
</template>

<script>
import { request } from "@/service";
import colorList from "@/util";
import { commonMixin } from "../util/mixin.js";

export default {
  name: "MEssay",
  mixins: [commonMixin],
  data() {
    return {
      content: ""
    };
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    nextEssay(){

    }
  },
  mounted() {

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
          filename: this.$route.params.filename
        },
        success: data => {
          data = data[0];
          this.title = { title: data.title, tag: data.tag };
          this.dateInfo = this.handleDate(data.date);

          data = this.changeImgURL(data.content);

          this.content = this.handleKeyword(this.marked(data));
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
.mob-content-wrap {
  display: flex;
  height: 90vh;
  /* padding: 0 10vw; */
  justify-content: space-between;
overflow: auto;
}
.mob-scroll-wrap {
  /* width: 90vw; */
  overflow: hidden;
}
.mob-content-left {
  height: 90vh;
  width: 10vw;
}
.mob-content-right {
  height: 90vh;
  width: 10vw;
}
.mob-content-inner-text {
  width: 80vw;
}
</style>
