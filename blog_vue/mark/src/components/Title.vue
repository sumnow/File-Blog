<template>
  <div class="top near" ref="top">
    <div class="header">
      <div class="header-content">
      </div>
      <div class="arcbg"></div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {

    }
  },
  watch: {
    $route (e,v) {
      let arr = this.$refs.top
      arr.classList.add("near")
      this.changeNear(arr);
    }
  },
  methods: {
    changeNear(target) {
      setTimeout(function() {
        target.classList.remove("near")
      }, 750);
    }
  },
  mounted () {
    let arr = this.$refs.top
    this.changeNear(arr);
  }
}
</script>

<style scoped>
.top {
  position: relative;
  z-index: 10;
  height: 50vh;
  transform: translateY(-40vh);
  transition: all .5s;
}
.top.near {
  transform: translate(0);
}
.header {
  width: 100vw;
  /* transform: translateY(-40vh); */
  /* height: 10vh; */
  /* overflow: hidden; */
}
.header-content {
  /* height: calc(10vh - 10px); */
  height: 50vh;
  background-color: #81d8d0;
}
.arcbg {
  position: relative;
  /* top: 10vh; */
  z-index: 10;
  width: 100vw;
  height: 10px;
  background-image: url(../assets/downtra.svg);
  background-size: 20px 10px;
  background-repeat: repeat-x;
  background-position: 20px 0;
}
</style>
