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
      <DateInfo :dateInfo="dateInfo" />
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
import loading from "./SecondLoading";
import Directory from "./Directory";
import DateInfo from "./DateInfo";
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
    Directory,
    DateInfo
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

          // directory
          this.hrefList = this.handleHrefList(this.content);
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
    // this.$destroy();
  }
};
</script>

<style scoped>
.content_wrap {
  position: relative;
  height: 100vh;
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
  padding: 10px 3vw;
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
