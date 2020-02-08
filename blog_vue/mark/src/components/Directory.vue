<template>
  <div>
    <div class="ul-content-href">
      <div
        :class="['li-content-href', hrefListActiveName == item.no ? 'active' : '']"
        v-for="item in hrefList"
        :key="item.href"
        :style="{ paddingLeft: `${item.level*10}px`}"
        @click="gotoActive(item)"
      >
        <div :href="item.href">{{ `${item.no}. ${item.name}`}}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Directory",
  props: ["hrefList", "hrefListActiveName"],
  methods: {
    gotoActive(item) {
      this.$parent.gotoActive(item);
    }
  }
};
</script>

<style scoped>
.ul-content-href {
  width: 20vw;
}

.li-content-href {
  display: flex;
  overflow: hidden;

  padding: 20px 0;

  line-height: 1.5;

  word-break: break-all;
  /* border-color: #e36209 #e1e4e8 transparent; */
}

.li-content-href:hover {
  cursor: pointer;
}

.li-content-href.active {
  background: var(--background-color);
}
</style>
