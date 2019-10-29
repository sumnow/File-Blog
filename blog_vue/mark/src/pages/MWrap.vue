<template>
  <div>
    <div class="container" ref="container">
      <router-view />
    </div>
    <dalleTop></dalleTop>
    <dalleBottom></dalleBottom>
  </div>
</template>

<script>
import dalleTop from "@/components/DalleTop";
import dalleBottom from "@/components/DalleBottom";
import MCatalog from '@/components/MCatalog'

export default {
  name: "wrapper",
  components: {
    dalleTop,
    dalleBottom,
    MCatalog
    // loading,
  },
  watch: {
    $route(e, v) {
      let arr = this.$refs.container;
      arr.classList.add("near");
      this.changeNear(arr);
    }
  },
  methods: {
    changeNear(target) {
      setTimeout(function() {
        target.classList.remove("near");
      }, 1000);
    }
  },
  mounted() {
    // const a = this.$load()
    // console.log(a)
    // a.showLoad()
  }
};
</script>

<style>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

.container {
  position: absolute;
  z-index: 0;
  top: 5vh;

  width: 100vw;
  height: 90vh;

  transition: background-color 1s ease-out;

  opacity: 1;
  background-color: var(--background-color);
}

.container.near {
  opacity: 0;
}

</style>
