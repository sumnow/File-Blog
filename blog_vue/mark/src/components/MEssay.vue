<template>
  <div class="mob-scroll-wrap">
    <div class="mob-content-wrap" ref="content">
      <div :class=" [isBack? 'mob-back-now' : '','mob-back-icon']">
        <svg
          class="icon mob-content-left"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="1794"
        >
          <path
            d="M706.2 1005.6L395 705.2c-24-23.1-24.7-61.8-1.5-85.7 23.1-24 61.8-24.7 85.7-1.5l311.1 300.5c24 23.1 24.7 61.8 1.5 85.7-23 24-61.7 24.7-85.6 1.4z m-389-460.2l456-440.3c24-23.1 24.7-61.8 1.5-85.7-23.1-24-61.8-24.7-85.7-1.5L233 458.1c-24 23.1-24.7 61.8-1.5 85.7 23.1 24 61.7 24.7 85.7 1.6z m0 0"
            fill
            p-id="1795"
          />
        </svg>
      </div>
      <div class="mob-content-inner-text" v-html="content"></div>
      <div class="mob-content-right" @click="goBack"></div>
    </div>
  </div>
</template>

<script>
import { request } from "@/service";
// import colorList from "@/util/colorList";
import { commonMixin } from "../util/mixin.js";
import AlloyFingerVue from "alloyfinger";

export default {
  name: "MEssay",
  mixins: [commonMixin],
  data() {
    return {
      content: "",
      isBack: false
    };
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    nextEssay() {}
  },
  mounted() {
    //
    const self = this;
    var af = new AlloyFingerVue(this.$refs.content, {
      swipe: function(evt) {
        console.log(evt);
        if (evt.srcElement.nodeName === "PRE") {
          return;
        }
        if (evt.direction === "Right") {
          self.isBack = true;
          setTimeout(() => {
            self.$router.go(-1);
          }, 300);
        }
        console.log("swipe" + evt.direction);
      }
    });
    function changeKeyWord(color, data) {
      const regs = color.keyword.reduce((a, b) => {
        return `${a}|${b}`;
      });
      const reg = new RegExp(`\\b(${regs})\\b`, "g");
      return data.replace(reg, `<font style="color: ${color.color}">$1</font>`);
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
  /* height: 90vh; */
  /* padding: 0 10vw; */
  justify-content: space-between;
  /* overflow: auto; */
}

.mob-scroll-wrap {
  overflow: auto;
  /* width: 90vw; */

  height: 90vh;
}

.mob-content-left {
  overflow: hidden;
  /* height: 90vh; */
  /* width: 1em; */
  /* height: 1em; */

  width: 10vw;
  height: 10vw;

  vertical-align: middle;

  fill: currentColor;
}

.mob-back-icon {
  position: absolute;
  top: 50%;
  left: 0;

  width: 10vw;
  height: 10vw;
  margin-top: -5vw;

  transition: transform .25s ease-out;
  transform: translateX(-100%);
}

.mob-back-now {
  transform: translateX(0%);
}

.mob-content-right {
  /* height: 90vh; */
  /* width: 10vw; */
}

.mob-content-inner-text {
  width: 80vw;
  margin: 0 10vw;
}

</style>
