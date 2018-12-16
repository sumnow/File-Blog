<template>
  <div class="profile_pc">
    <!-- essay -->
    <div :class="['content-profile']">
      <essay v-if="hackReset"></essay>
    </div>
    <!-- <div :class="{'catalog-profile_pc':true, 'float': isCatalogFloat, }"> -->
    <div :class="['catalog-profile_pc',  catalogSwap ? 'swapleft' : 'swapright' ]">
      <!-- arrow -->
      <div class="catalog-arrow_pc" @click="swapCatalog"></div>
      <!-- tag -->
      <div class="flexbox catalog-title_pc">
        <!-- <div class="flexbox"> -->
          <div
            v-for="(item,index) in typeList"
            :key="index"
            :class="{ deactive: activeArr.type != item.typeName }"
            @click="selectByType(item.typeName, index)"
          >
            <span>{{item.typeName}}</span>
          </div>
        <!-- </div> -->
      </div>
      <!-- catalog -->
      <div
        :class="{'catalog-body_pc': true, 'before-transformed': beforeChange.index > activeArr.typeIndex, 'after-transformed': beforeChange.index < activeArr.typeIndex }"
      >
        <div
          v-for="(item, index) in showCatalogList"
          :key="index"
          :class="{'catalog-body_pc-block flexbox': true, active: activeArr.essay == item.name}"
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
          :class="{ deactive: activeArr.tag != item }"
          @click="selectByTag(item)"
        >
          <span>{{item}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { fetch } from "../service";
import essay from "../components/Essay";

export default {
  name: "hello",
  components: {
    essay: essay
  },
  data() {
    return {
      hackReset: true,
      beforeChange: {
        index: 0,
        locked: false
      },
      catalogSwap: true,
      isCatalogFloat: false,
      typeList: [],
      catalogList: [],
      showCatalogList: [],
      activeArr: {
        tag: "",
        typeIndex: 0,
        type: "",
        essay: ""
      }
    };
  },
  computed: {
    activeArrType() {
      return this.activeArr.type;
    },
    tagList() {
      return (
        (this.catalogList &&
          Array.from(
            new Set([].concat(...this.catalogList.map(e => e.tags)))
          )) ||
        []
      );
    }
  },
  watch: {
    activeArrType(n, o) {
      log.blue(`set ${o}=>${n}`);
      // setTimeout(() => {
      this.catalogList = this.showCatalogList = this.typeList.filter(
        e => e.typeName == this.activeArrType
      )[0].data;

      // }, 300);
    }
  },
  methods: {
    swapCatalog() {
      this.isCatalogFloat = true;
      this.catalogSwap = !this.catalogSwap;
    },
    selectByTag(i) {
      this.activeArr.tag = i;
      this.showCatalogList = this.catalogList.filter(e => {
        return e.tags.includes(i);
      });
    },
    selectByType(e, i) {
      if (this.beforeChange.locked) {
        return;
      } else {
        this.beforeChange.locked = true;
        setTimeout(() => {
          this.beforeChange.index = i;
          this.beforeChange.locked = false;
        }, 1000);
        this.activeArr.type = e;
        this.activeArr.tag = "";
        this.activeArr.typeIndex = i;
        this.$router.push(`/body/${e}`);
      }
    },
    toEssay(item) {
      this.$router.push(
        `/body/${this.$route.params.type}/${encodeURI(
          encodeURI(item.input.slice(0, -3))
        )}`
      );
      this.activeArr.essay = item.name;
      this.hackReset = false;
      this.$nextTick(() => {
        this.hackReset = true;
      });
    }
  },
  created() {
    fetch({
      url: "/catalog",
      method: "GET"
    }).then(res => {
      this.typeList = res.map((e, i) => {
        return {
          index: i,
          typeName: e
        };
      });

      Promise.all(
        this.typeList.map(e => {
          return fetch({
            url: "/catalog",
            method: "GET",
            params: {
              type: e.typeName
            }
          });
        })
      ).then(res => {
        const reg = /^(\d{4}-(0[0-9]|1[0-2])-(3[0-1]|[0-2][0-9]))_([\S\s]+)\[([\S\s]+)\]/;
        this.typeList.forEach((e, i) => {
          this.typeList[i].data = res[i].reverse().map(el => {
            const _arr = el.match(reg);
            return _arr
              ? {
                  date: _arr[1] || "",
                  name: _arr[4] || "",
                  tags: _arr[5].split(",") || "",
                  input: _arr["input"] || ""
                }
              : {
                  date: "null_time",
                  name: "null_name",
                  tags: "null_tag",
                  input: "null_input"
                };
          });
        });
        this.activeArr["type"] = this.$route.params.type;
      });
    });
  },
  mounted() {}
};
</script>

<style>
.wrapper {
  height: 100%;
  width: 100%;
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
  grid-template: 100px 1fr 100px/100%;
  grid-template-areas:
    "title"
    "catalog"
    "tag";
  width: 30vw;
  background-color: var(--primary-color);
  transition: right 0.5s;
}
.catalog-arrow_pc {
  position: absolute;
  left: -10px;
  width: 12px;
  grid-area: arrow;
  height: 100px;
  background-color: var(--background-color);
  border-radius: 0 0 0 8px;
  border-left: 1px solid var(--primary-color);
  border-bottom: 1px solid var(--primary-color);
}
.catalog-title_pc {
  grid-area: title;
  justify-content: space-between;
  align-items: stretch;
  background: var(--primary-color);
}
.catalog-title_pc div {
  display: flex;
  flex: 1;
  align-items: center;
  height: 100px;
  text-align: center;
  background: var(--background-color);
}
.catalog-title_pc span {
  width: 100%;
}
.catalog-title_pc div {

}
.catalog-title_pc .deactive {
  background: var(--primary-color);
}
.catalog-body_pc {
  grid-area: catalog;
  height: calc(100vh - 200px);
  line-height: 30px;
  overflow: auto;
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
  height: 12.5%;
  min-height: 30px;
  line-height: 18px;
  font-size: 12px;
  box-sizing: border-box;
  padding: 0 10px;
  justify-content: space-between;
  transform: translateX(0px);
  opacity: 1;
  background-color: var(--primary-color);
}

.active.catalog-body_pc-block {
  background: var(--background-color);
}

.catalog-body_pc-title {
  width: 70%;
  display: table;
  height: 100%;
}
.catalog-body_pc-title span {
  display: table-cell;
  vertical-align: middle;
}
.catalog-body_pc-date {
  width: 30%;
  display: table;
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
  grid-area: tag;
  justify-content: space-between;
  align-items: stretch;
  overflow-x: auto;
}
.catalog-tag_pc > div {
  height: 100px;
  flex: 1;
  display: flex;
  text-align: center;
  align-items: center;
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
