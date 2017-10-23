<template>
  <div class="header bg">
    <div class="header-content">
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {

    }
  },
}
</script>

<style scoped>
.header {
  width: 100vw;
  height: 10vh;
  overflow: hidden;
}
.header-content {
  height: calc(10vh - 10px);
  background-color: #81d8d0;
}
.bg {
  background-image: url(../assets/downtra.svg);
  background-size: 20px 10px;
  background-repeat: repeat-x;
  background-position: 10px 100%;
}
</style>
