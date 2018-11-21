<template>
  <div class="loading">
    <i class="cir cir-1"></i>
    <i class="cir cir-2"></i>
    <i class="cir cir-3"></i>
  </div>
</template>

<script>
export default {
  name: 'secondLoading'
};
</script>

<style>
.loading {
  position: absolute;
  left: 50%;
  top: 40%;
  width: 10em;
  height: 10em;
  margin: 1em auto;
  filter: blur(0.3em) contrast(50);
}

.cir {
  position: absolute;
  left: 50%;
  top: 1em;
  width: 3em;
  height: 3em;
  margin-left: -1.5em;
  border-radius: 50%;
  transform-origin: 50% 4em;
}

.cir-1 {
  background-color: #7cfef2;
  -webkit-animation: rotation 2.2s infinite;
  animation: rotation 2.2s infinite;
}

.cir-2 {
  background-color: #7cfef2;
  -webkit-animation: rotation 1.8s -1s infinite;
  animation: rotation 1.8s -1s infinite;
}

.cir-3 {
  background-color: #7cfef2;
  -webkit-animation: rotation 1s infinite;
  animation: rotation 1s infinite;
}

@-webkit-keyframes rotation {
  100% {
    -webkit-transform: rotate(360deg);
  }
}

@keyframes rotation {
  100% {
    transform: rotate(360deg);
  }
}
</style>
