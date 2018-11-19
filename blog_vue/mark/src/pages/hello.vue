<template>
  <div class="gridbox catelog-profile_pc">
    <div class="flexbox catelog-title_pc" >
      <div class="flexbox">
        <div v-for="(item,index) in typeList" :key="index" :class="{ active: activeArr.type == item.typeName }" @click="selectByType(item.typeName, index)">
          {{item.typeName}}
        </div>
      </div>
    </div>
    <div :class="{'catalog-body_pc': true, 'before-transformed': beforeChange.index > activeArr.typeIndex, 'after-transformed': beforeChange.index < activeArr.typeIndex }">
      <div v-for="(item, index) in showCatalogList" :key="index" class="catalog-body_pc-block flexbox">
        <div>{{item.name}}</div>
        <div>{{item.date}}</div>
      </div>
    </div>
    <div class="flexbox catelog-tag_pc">
      <div v-for="(item,index) in tagList" :key="index" :class="{ active: activeArr.tag == item }" @click="selectByTag(item)">
        {{item}}
      </div>
    </div>
  </div>
</template>

<script>
import { fetch } from "../service";

export default {
  name: "hello",
  data() {
    return {
      beforeChange: {
        index: 0,
        locked: false
      },
      typeList: [],
      catalogList: [],
      showCatalogList: [],
      activeArr: {
        tag: "",
        typeIndex: 0,
        type: ""
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
      console.log(`set ${o}=>${n}`);
      this.catalogList = this.showCatalogList = this.typeList.filter(
        e => e.typeName == this.activeArrType
      )[0].data;
    }
  },
  methods: {
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
        console.log(res);
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
.gridbox {
  display: grid;
}
.flexbox {
  display: flex;
}
.catelog-profile_pc {
  grid-template: 1fr 300px 1fr / auto;
}
.catelog-title_pc {
  height: 50px;
  line-height: 50px;
  justify-content: space-between;
  align-items: stretch;
}
.catelog-title_pc div {
  flex: 1;
  text-align: center;
}
.catelog-title_pc .active {
  background: lightgreen;
}
.catalog-body_pc {
  line-height: 30px;
  overflow: auto;
}
@keyframes beforeTransformed {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(0%);
  }
}
@keyframes afterTransformed {
  0% {
    transform: translateX(100%);
  }
  100% {
    transform: translateX(0%);
  }
}
.catalog-body_pc-block {
  height: 12.5%;
  box-sizing: border-box;
  padding: 0 10px;
  justify-content: space-between;
  transform: translateX(0px);
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
.catelog-tag_pc {
  height: 50px;
  line-height: 50px;
  justify-content: space-between;
  align-items: stretch;
}
.catelog-tag_pc div {
  flex: 1;
  text-align: center;
}
.catelog-tag_pc .active {
  background: lightblue;
}
</style>
