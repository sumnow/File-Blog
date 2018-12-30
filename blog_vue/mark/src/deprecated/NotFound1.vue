<template>
  <div class="bg_black">
    <div>Something is wrong!</div>
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
    <div class>@mydia</div>
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
  grid-template: repeat(6, 1fr) / repeat(8, 1fr);
  grid-gap: 4px;
  margin: 0 auto;
  width: calc(4 * 1.2 * 100px);
  height: calc(3 * 1.2 * 100px);
  background-image: url(../assets/saber.jpg);
  background-size: cover;
  background-color: #000;
}
@keyframes fade {
  50% {
    background-color: rgba(0, 0, 0, 100%);
  }
}
.profile-pic div {
  outline: 2px solid #000;
  background-color: rgba(0, 0, 0, 0);
  animation: fade 24s infinite;
}

.profile-pic div:nth-of-type(1) {
  animation-delay: 0.25s;
}
.profile-pic div:nth-of-type(2) {
  animation-delay: 0.5s;
}
.profile-pic div:nth-of-type(3) {
  animation-delay: 0.75s;
}
.profile-pic div:nth-of-type(4) {
  animation-delay: 1s;
}
.profile-pic div:nth-of-type(5) {
  animation-delay: 1.25s;
}
.profile-pic div:nth-of-type(6) {
  animation-delay: 1.5s;
}
.profile-pic div:nth-of-type(7) {
  animation-delay: 1.75s;
}
.profile-pic div:nth-of-type(8) {
  animation-delay: 2s;
}
.profile-pic div:nth-of-type(9) {
  animation-delay: 2.25s;
}
.profile-pic div:nth-of-type(10) {
  animation-delay: 2.5s;
}
.profile-pic div:nth-of-type(11) {
  animation-delay: 2.75s;
}
.profile-pic div:nth-of-type(12) {
  animation-delay: 3s;
}
.profile-pic div:nth-of-type(13) {
  animation-delay: 3.25s;
}
.profile-pic div:nth-of-type(14) {
  animation-delay: 3.5s;
}
.profile-pic div:nth-of-type(15) {
  animation-delay: 3.75s;
}
.profile-pic div:nth-of-type(16) {
  animation-delay: 4s;
}
.profile-pic div:nth-of-type(17) {
  animation-delay: 4.25s;
}
.profile-pic div:nth-of-type(18) {
  animation-delay: 4.5s;
}
.profile-pic div:nth-of-type(19) {
  animation-delay: 4.75s;
}
.profile-pic div:nth-of-type(20) {
  animation-delay: 5s;
}
.profile-pic div:nth-of-type(21) {
  animation-delay: 5.25s;
}
.profile-pic div:nth-of-type(22) {
  animation-delay: 5.5s;
}
.profile-pic div:nth-of-type(23) {
  animation-delay: 5.75s;
}
.profile-pic div:nth-of-type(24) {
  animation-delay: 6s;
}
.profile-pic div:nth-of-type(25) {
  animation-delay: 6.25s;
}
.profile-pic div:nth-of-type(26) {
  animation-delay: 6.5s;
}
.profile-pic div:nth-of-type(27) {
  animation-delay: 6.75s;
}
.profile-pic div:nth-of-type(28) {
  animation-delay: 7s;
}
.profile-pic div:nth-of-type(29) {
  animation-delay: 7.25s;
}
.profile-pic div:nth-of-type(30) {
  animation-delay: 7.5s;
}
.profile-pic div:nth-of-type(31) {
  animation-delay: 7.75s;
}
.profile-pic div:nth-of-type(32) {
  animation-delay: 8s;
}
.profile-pic div:nth-of-type(33) {
  animation-delay: 8.25s;
}
.profile-pic div:nth-of-type(34) {
  animation-delay: 8.5s;
}
.profile-pic div:nth-of-type(35) {
  animation-delay: 8.75s;
}
.profile-pic div:nth-of-type(36) {
  animation-delay: 9s;
}
.profile-pic div:nth-of-type(37) {
  animation-delay: 9.25s;
}
.profile-pic div:nth-of-type(38) {
  animation-delay: 9.5s;
}
.profile-pic div:nth-of-type(39) {
  animation-delay: 9.75s;
}
.profile-pic div:nth-of-type(40) {
  animation-delay: 10s;
}
.profile-pic div:nth-of-type(41) {
  animation-delay: 10.25s;
}
.profile-pic div:nth-of-type(42) {
  animation-delay: 10.5s;
}
.profile-pic div:nth-of-type(43) {
  animation-delay: 10.75s;
}
.profile-pic div:nth-of-type(44) {
  animation-delay: 11s;
}
.profile-pic div:nth-of-type(45) {
  animation-delay: 11.25s;
}
.profile-pic div:nth-of-type(46) {
  animation-delay: 11.5s;
}
.profile-pic div:nth-of-type(47) {
  animation-delay: 11.75s;
}
.profile-pic div:nth-of-type(48) {
  animation-delay: 12s;
}
</style>
