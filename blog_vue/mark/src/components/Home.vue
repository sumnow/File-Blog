<template>
  <div class="home">
    <div class="content">
      <div v-if="article">
        <catalog></catalog>
      </div>
    </div>
  </div>
</template>

<script>
import catalog from './Catalog.vue'


export default {
  name: 'home',
  components: {
    catalog
  },
  data() {
    return {
      content: 'null',
      article: true,
    }
  },
  methods: {

  },
  watch: {
  },
  mounted() {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.content {
  width: 100vw;
  height: 80vh;
  overflow: auto;
  /* background: #66f9cf; */
}

.bg {
  /* position: absolute; */
  /* top: 20vh; */
  background: #fff;
  background-image: -webkit-gradient(linear, 50% 0, 0 100%, from(transparent), color-stop(.5, transparent), color-stop(.5, red), to(red)),
  -webkit-gradient(linear, 50% 0, 100% 100%, from(transparent), color-stop(.5, transparent), color-stop(.5, red), to(red));
  background-size: 30px 15px;
  background-repeat: repeat-x;
  background-position: 0px -0px;
}
</style>
