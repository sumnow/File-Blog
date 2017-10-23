<template>
  <div class="bottom bg">
    <div class="bottom-content">
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
.bottom {
  width: 100vw;
  height: 10vh;
}
.bottom:before {
  content: '';
  display: table;
}

.bg {
  background: #fff;
  background-image: url(../assets/uptra.svg);
  /* background-image: -webkit-gradient(linear, 50% 0, 0 100%, from(transparent), color-stop(.5, transparent), color-stop(.5, #81d8d0), to(#81d8d0)),-webkit-gradient(linear, 50% 0, 100% 100%, from(transparent), color-stop(.5, transparent), color-stop(.5, #81d8d0), to(#81d8d0)); */
  background-size: 20px 10px;
  background-repeat: repeat-x;
  background-position: 10px 0%;
}
.bottom-content {
  background: #81d8d0;
  margin-top: 10px;
  height: calc(10vh - 10px);
}
</style>
