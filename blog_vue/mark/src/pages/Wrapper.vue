<template>
  <div>
    <div class="container" ref="container">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </div>
    <titlebar></titlebar>
    <bottombar></bottombar>

    <div class="bottom"></div>

    <!-- <loading></loading> -->
  </div>
</template>

<script>
import titlebar from '../components/Title'
import bottombar from '../components/Bottom'
// import loading from '../components/Loading'


export default {
  name: 'wrapper',
  components: {
    titlebar,
    bottombar,
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
