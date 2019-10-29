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
  top: 50%;
  left: 50%;

  width: 10em;
  height: 10em;

  transform: translate(-50%, -50%);

  filter: blur(.3em) contrast(50);
}

.cir {
  position: absolute;
  top: 1em;
  left: 50%;

  width: 3em;
  height: 3em;
  margin-left: -1.5em;

  transform-origin: 50% 4em;

  border-radius: 50%;
}

.cir-1 {
  -webkit-animation: rotation 2.2s infinite;
          animation: rotation 2.2s infinite;

  background-color: #7cfef2;
}

.cir-2 {
  -webkit-animation: rotation 1.8s -1s infinite;
          animation: rotation 1.8s -1s infinite;

  background-color: #7cfef2;
}

.cir-3 {
  -webkit-animation: rotation 1s infinite;
          animation: rotation 1s infinite;

  background-color: #7cfef2;
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
