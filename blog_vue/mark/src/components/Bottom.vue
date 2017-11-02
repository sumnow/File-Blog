<template>
  <div class="bottom" ref="bottom">
    <div  class="bottom-space">
      <div class="arcbg"></div>
      <div class="bottom-content"></div>
    </div>
  </div>
</template>

<script>
export default {
  watch: {
    $route (e,v) {
      let arr = this.$refs.bottom
      arr.classList.add("near")
      setTimeout(function() {
        arr.classList.remove("near")
      }, 750);
    }
  },

  mounted () {

  }
};
</script>

<style scoped>
.bottom {
  position: relative;
  z-index: 10;
  top: -10px;
  width: 100vw;
  height: 50vh;
  transform: translateY(40vh);
  transition: all .5s;
}
.bottom.near {
  transform: translateY(0);
  top: 0;
}
.bottom:before {
  content: "";
  display: table;
}

.arcbg {
  position: relative;
  height: 10px;
  width: 100vw;
  background-image: url(../assets/uptra.svg);
  background-size: 20px 10px;
  background-repeat: repeat-x;
  background-position: 10px 0%;
}
.bottom-content {
  background: #81d8d0;
  /* transform: translateY(-10px); */
  /* height: calc(10vh - 10px); */
  height: 50vh;
}
</style>
