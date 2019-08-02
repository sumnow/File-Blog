<template>
  <div></div>
</template>

<script>
import { request } from "@/service";
import { commonMixin } from "@/util/mixin";

export default {
  name: "home",
  mixin: [commonMixin],
  data() {},
  methods: {},
  created() {
    if (window.isComputer) {
      this.$router.push(`/code`);
    } else {
      this.$router.push(`/m/code`);
    }
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
