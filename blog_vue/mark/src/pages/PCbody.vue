<template>
  <div class="profile_pc">
    <!-- essay -->
    <div :class="['content-profile']">
      <essay v-if="hackReset" @swap="swapCatalog" @closeSwap="catalogSwap=false"></essay>
    </div>
    <!-- <div :class="{'catalog-profile_pc':true, 'float': isCatalogFloat, }"> -->
    <div :class="['catalog-profile_pc',  catalogSwap ? 'swapleft' : 'swapright' ]">
      <!-- arrow -->
      <div v-show="!catalogSwap" class="catalog-arrow_pc" @click="swapCatalog"></div>
      <!-- tag -->
      <div class="catalog-search_pc">
        <input
          :class="[catalogSearchFocus ? 'catalog-search_pc_focus': '']"
          @focus="handlerFocusSearch"
          @blur="handlerLeaveSearch"
          v-model.trim="searchKeyword"
        />
        <div class="catalog-search-icon_pc">
          <svg id="icon-search" viewBox="0 0 24 24">
            <title>search</title>
            <path
              d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"
            />
          </svg>
        </div>
      </div>
      <!-- <div class="flexbox catalog-title_pc"> -->
      <!-- <div class="flexbox"> -->
      <!-- <div
          v-for="(item,index) in typeList"
          :key="index"
          :class="{ deactive: activeArr.type != item.typeName }"
          @click="selectByType(item.typeName, index)"
        >
          <span>{{item.typeName}}</span>
      </div>-->
      <!-- </div> -->
      <!-- </div> -->
      <!-- catalog -->
      <div
        :class="{'catalog-body_pc': true, 'before-transformed': beforeChange.index > activeArr.typeIndex, 'after-transformed': beforeChange.index < activeArr.typeIndex }"
      >
        <div
          v-for="(item, index) in showCatalogList"
          :key="index"
          :class="{'catalog-body_pc-block flexbox': true, active: activeArr.essayId == item.id}"
          @click="toEssay(item)"
        >
          <div class="catalog-body_pc-title">
            <span>{{item.name}}</span>
          </div>
          <div class="catalog-body_pc-date">
            <span>{{item.date}}</span>
          </div>
        </div>
      </div>
      <!-- tag -->
      <div class="flexbox catalog-tag_pc">
        <div
          v-for="(item,index) in tagList"
          :key="index"
          :class="{ deactive: activeArr.tag != item.tagName }"
          @click="selectByTag(item)"
        >
          <span>{{item.tagName}}({{item.tagTotal}})</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { fetch } from "@/service";
import essay from "@/components/Essay";
import { commonMixin } from "@/util/mixin.js";

export default {
  name: "PCbody",
  components: {
    essay: essay
  },
  mixins: [commonMixin],
  data() {
    return {
      hackReset: true,
      beforeChange: {
        index: 0,
        locked: false
      },
      catalogSwap: true,
      // isCatalogFloat: false,
      tagList: [],
      catalogList: [],
      showCatalogList: [],
      activeArr: {
        tag: "",
        typeIndex: 0,
        type: "",
        essayId: ""
      },
      searchKeyword: "",
      catalogSearchFocus: false
    };
  },
  computed: {
    // tagList() {
    //   return (
    //     (this.catalogList &&
    //       Array.from(
    //         new Set(
    //           [].concat(
    //             this.catalogList.reduce((a, b) => a.tag.concat(b.tag), [])
    //           )
    //         )
    //       )) ||
    //     []
    //   );
    // }
  },
  watch: {
    searchKeyword(val) {
      const reg = new RegExp(`${val}`, "ig");
      this.showCatalogList = this.catalogList.filter(e => reg.test(e.file));
      return val;
    }
  },
  methods: {
    swapCatalog() {
      this.catalogSwap = !this.catalogSwap;
    },
    selectByTag(i) {
      this.activeArr.tag = i.tagName;
      this.showCatalogList = this.catalogList.filter(e => {
        return e.tag.includes(i.tagName);
      });
      this.searchKeyword = "";
    },
    toEssay(item) {
      this.$router.push(`/code/${item.id}`);
      this.activeArr.essayId = item.id;
      this.hackReset = false;
      this.$nextTick(() => {
        this.hackReset = true;
      });
    },
    handlerFocusSearch() {
      this.catalogSearchFocus = true;
    },
    handlerLeaveSearch() {
      this.catalogSearchFocus = false;
    }
  },
  created() {
    fetch({
      url: "/catalog",
      method: "GET"
    }).then(res => {
      this.showCatalogList = this.catalogList = res.reverse().map(e => {
        return {
          file: e.name,
          name: e.title,
          date: e.date,
          number: e.number,
          id: e.date + e.number,
          tag: e.tag || []
        };
      });
      if (!this.$route.params.filename) {
        this.$router.push(`/code/${this.showCatalogList[0].id}`);
      }
      const obj = {};
      Array.from(
        new Set(
          this.catalogList.reduce((a, b) => {
            return { tag: [...a.tag, ...b.tag] };
          }).tag
        )
      ).forEach(element => {
        obj[element] = 0;
      });

      res.forEach(e => {
        e.tag.forEach(se => {
          obj[se]++;
        });
      });
      this.tagList = Object.keys(obj).map(e => {
        return {
          tagTotal: obj[e],
          tagName: e
        };
      });
    });
  },
  mounted() {}
};
</script>

<style>
.wrapper {
  width: 100%;
  height: 100%;
}

.flexbox {
  display: flex;
}

.profile_pc {
  display: flex;
  /* background-image: url(../assets/saber.jpg); */

  background-color: var(--background-color);
}

.swapleft {
  right: 0;
}

.swapright {
  right: -30vw;

  transition: right 0.5s;
}

.catalog-profile_pc {
  position: absolute;

  display: grid;

  width: 30vw;

  transition: right 0.5s;

  background-color: var(--primary-color);

  grid-template: 40px 1fr 80px/ 1fr;
  grid-template-areas:
    "search" "catalog"
    "tag";
}

.catalog-search_pc {
  position: relative;

  background: var(--primary-color);

  grid-area: search;
}

.catalog-search_pc input {
  width: 100%;
  height: 40px;
  padding: 0 20px 0 50px;

  font-size: 18px;

  transition: background 0.25s;

  border: none;
  outline: none;
  background: var(--primary-color);
}

.catalog-search_pc .catalog-search_pc_focus {
  background: var(--background-color);
}

.catalog-search-icon_pc {
  position: absolute;
  top: 5px;
  left: 10px;

  width: 30px;
  height: 30px;
}

.catalog-arrow_pc {
  position: absolute;
  bottom: 0;
  left: -2vw;

  width: 2vw;
  height: 100vh;

  background: var(--primary-color);
  /* var(--primary-color); */
  /* border-radius: 0 0 0 8px;
  border-left: 1px solid var(--primary-color);
  border-bottom: 1px solid var(--primary-color); */
}

.catalog-title_pc {
  align-items: stretch;
  justify-content: space-between;

  background: var(--primary-color);

  grid-area: title;
}

.catalog-title_pc div {
  display: flex;
  align-items: center;
  flex: 1;

  height: 80px;

  text-align: center;

  background: var(--background-color);
}

.catalog-title_pc span {
  width: 100%;
}

.catalog-title_pc .deactive {
  background: var(--primary-color);
}

.catalog-body_pc {
  overflow: auto;

  height: calc(100vh - 120px);

  line-height: 30px;

  grid-area: catalog;
}

@keyframes beforeTransformed {
  0% {
    transform: translateX(-100%);

    opacity: 0;
  }

  100% {
    transform: translateX(0%);

    opacity: 1;
  }
}

@keyframes afterTransformed {
  0% {
    transform: translateX(100%);

    opacity: 0;
  }

  100% {
    transform: translateX(0%);

    opacity: 1;
  }
}

.catalog-body_pc-block {
  justify-content: space-between;

  box-sizing: border-box;
  width: calc(30vw - 30px);
  height: 12.5%;
  min-height: 30px;
  padding: 0 10px;

  font-size: 12px;
  line-height: 18px;

  transition: transform 0.25s ease-in;
  transform: translateX(30px);

  background-color: var(--primary-color);
  /* background: var(--background-color); */
}

.active.catalog-body_pc-block {
  transform: translateX(0px);

  background: var(--background-color);
}

.catalog-body_pc-title {
  display: table;

  width: 70%;
  height: 100%;
}

.catalog-body_pc-title span {
  display: table-cell;

  vertical-align: middle;
}

.catalog-body_pc-date {
  display: table;

  width: 30%;
  height: 100%;
}

.catalog-body_pc-date span {
  display: table-cell;

  text-align: center;
  vertical-align: middle;
}

.before-transformed > .catalog-body_pc-block {
  animation: beforeTransformed 0.5s;

  animation-fill-mode: forwards;
}

.before-transformed > .catalog-body_pc-block:nth-of-type(2) {
  animation-delay: 0.05s;
}

.before-transformed > .catalog-body_pc-block:nth-of-type(3) {
  animation-delay: 0.1s;
}

.before-transformed > .catalog-body_pc-block:nth-of-type(4) {
  animation-delay: 0.15s;
}

.before-transformed > .catalog-body_pc-block:nth-of-type(5) {
  animation-delay: 0.2s;
}

.before-transformed > .catalog-body_pc-block:nth-of-type(6) {
  animation-delay: 0.25s;
}

.before-transformed > .catalog-body_pc-block:nth-of-type(7) {
  animation-delay: 0.3s;
}

.before-transformed > .catalog-body_pc-block:nth-of-type(8) {
  animation-delay: 0.35s;
}

.before-transformed > .catalog-body_pc-block:nth-of-type(9) {
  animation-delay: 0.4s;
}

.after-transformed > .catalog-body_pc-block {
  animation: afterTransformed 0.5s;

  animation-fill-mode: forwards;
}

.after-transformed > .catalog-body_pc-block:nth-of-type(2) {
  animation-delay: 0.05s;
}

.after-transformed > .catalog-body_pc-block:nth-of-type(3) {
  animation-delay: 0.1s;
}

.after-transformed > .catalog-body_pc-block:nth-of-type(4) {
  animation-delay: 0.15s;
}

.after-transformed > .catalog-body_pc-block:nth-of-type(5) {
  animation-delay: 0.2s;
}

.after-transformed > .catalog-body_pc-block:nth-of-type(6) {
  animation-delay: 0.25s;
}

.after-transformed > .catalog-body_pc-block:nth-of-type(7) {
  animation-delay: 0.3s;
}

.after-transformed > .catalog-body_pc-block:nth-of-type(8) {
  animation-delay: 0.35s;
}

.after-transformed > .catalog-body_pc-block:nth-of-type(9) {
  animation-delay: 0.4s;
}

.catalog-tag_pc {
  overflow-x: auto;
  align-items: stretch;
  justify-content: space-between;

  grid-area: tag;
}

.catalog-tag_pc > div {
  display: flex;
  align-items: center;
  flex: 1;

  height: 80px;
  padding: 0 10px;

  text-align: center;

  background-color: var(--background-color);
}

.catalog-tag_pc .deactive {
  background: var(--primary-color);
}

.catalog-tag_pc > div > span {
  width: 100%;
}

.content-profile {
  width: 100vw;
}
</style>
