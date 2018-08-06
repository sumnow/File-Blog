<template>
  <div>
    <div class="container" ref="container">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </div>
    <dalleTop></dalleTop>
    <dalleBottom></dalleBottom>

    <div class="bottom"></div>

    <!-- <loading></loading> -->
  </div>
</template>

<script>
import dalleTop from '../components/DalleTop'
import dalleBottom from '../components/DalleBottom'
// import loading from '../components/Loading'


export default {
  name: 'wrapper',
  components: {
    dalleTop,
    dalleBottom,
    // loading,
  },
  watch: {
    $route (e, v) {
      let arr = this.$refs.container
      arr.classList.add("near")
      this.changeNear(arr);
    }
  },
  methods: {
    changeNear(target) {
      setTimeout(function() {
        target.classList.remove("near")
      }, 1000);
    }
  },
  mounted () {
    // const a = this.$load()
    // console.log(a)
    // a.showLoad()
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.container {
  position: absolute;
  top: 10vh;
  width: 100vw;
  height: 80vh;
  z-index: 0;
  background-color: var(--background-color);
  opacity: 1;
  transition: background-color 1s ease-out;
}

.container.near {
  opacity: 0;
}

</style>
