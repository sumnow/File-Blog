<template>
    <div class="bg_black">
      <div>
        Something is wrong!
      </div>
      <div>
        <div class="profile-pic">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
      <div class="">
        @mydia
      </div>
    </div>
</template>

<script>
export default {
  name: "noFound",
  computed: {
    isComputer() {
      return !/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/.test(
        navigator.userAgent
      );
    }
  },
  mounted() {
  }
};
</script>

<style>
.bg_black {
  display: grid;
  grid-template-rows: 100px 1fr 100px;
  width: 100vw;
  height: 100vh;
  background: #000;
  color: #fff;
  text-align: center;
}
.profile-pic {
  display: grid;
  grid-template: repeat(6, 1fr)/repeat(8, 1fr); 
  grid-gap: 4px;
  margin: 0 auto;
  width: calc(4*1.2 * 100px);
  height: calc(3 *1.2* 100px);
  background-image: url(../assets/saber.jpg);
  background-size: cover;
  background-color: #000;
}
@keyframes fade {
    50% {
      background-color: rgba(255, 255, 255, 100%)
    }
}
.profile-pic div { 
  outline: 2px solid #000;
  background-color: rgba(255, 255, 255, 0);
  animation: fade 10s infinite;
}
.profile-pic div:nth-of-type(1) {
  animation-delay: 1s;
}
.profile-pic div:nth-of-type(2) {
  animation-delay: 2s;
}
.profile-pic div:nth-of-type(3) {
  animation-delay: 3s;
}
.profile-pic div:nth-of-type(4) {
  animation-delay: 4s;
}
</style>
