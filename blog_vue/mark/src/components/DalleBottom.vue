<template>
  <div class="bottom near" ref="bottom">
    <div  class="bottom-space">
      <div class="arcbg"></div>
      <div class="bottom-content"></div>
    </div>
  </div>
</template>

<script>
export default {
  watch: {
    $route (e, v) {
      let arr = this.$refs.bottom
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
    let arr = this.$refs.bottom;
    this.changeNear(arr);
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

  transition: all .5s;
  transform: translateY(45vh);
}

.bottom.near {
  top: 0;

  transform: translateY(0);
}

.bottom:before {
  display: table;

  content: '';
}

.arcbg {
  position: relative;

  width: 100vw;
  height: 10px;

  background-image: url(../assets/uptra.svg);
  background-repeat: repeat-x;
  background-position: 10px 0;
  background-size: 20px 10px;
}

.bottom-content {
  /* background: linear-gradient(#81d8d0, #fff); */
  /* transform: translateY(-10px); */
  /* height: calc(10vh - 10px); */
  height: 50vh;

  background: #81d8d0;
}

</style>
