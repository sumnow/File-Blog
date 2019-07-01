<template>
  <div class>
    <Cover></Cover>
    <div class="navigate-home_wrapper">
      <div class="navigator-home">
        <div v-for="item in list" :key="item" @click="toCatalog(item)">{{item}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { request } from "@/service";
import Cover from "@/pages/Cover";
import { commonMixin } from "@/util/mixin";

export default {
  name: "home",
  components: {
    Cover
  },
  mixin: [commonMixin],
  data() {
    return {
      list: []
    };
  },
  methods: {
    toCatalog(i) {
      if (window.isComputer) {
        this.$router.push(`/code/${i}`);
      } else {
        this.$router.push(`/m/code/${i}`);
      }
    }
  },
  created() {
    request({
      url: "/catalog",
      data: {},
      method: "GET",
      success: data => {
        this.list = data;
      }
    });
  }
};
</script>

<style scoped>
.navigate-home_wrapper {
  position: relative;
  height: 100vh;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
}
.navigator-home {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 50vw;
  height: 80vh;
  font-size: 28px;
  color: #fff;
  text-align: center;
}
.navigator-home div {
  position: relative;
}
.navigator-home div:before {
  position: absolute;
  left: 0;
  top: 0;
  content: "";
  width: 50vw;
  height: 1px;
  background: linear-gradient(90deg, #fff, #000);
  transform: scaleX(0);
}
.navigator-home div:after {
  position: absolute;
  left: 0;
  bottom: 0;
  content: "";
  width: 50vw;
  height: 1px;
  background: linear-gradient(-90deg, #fff, #000);
  transform: scaleX(0);
}
.navigator-home div:after :hover {
  transform: scaleX(1);
  transition: ;
}
</style>
