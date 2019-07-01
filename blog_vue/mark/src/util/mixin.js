export const commonMixin = {
  computed: {
    isComputer() {
      console.log(123)
      return !/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/.test(
        window.navigator.userAgent
      );
    }
  },
  data() {
    return {
      regFileName: /^(?:(\d{4})(0[0-9]|1[0-2])(3[0-1]|[0-2][0-9]))\d([\S\s]+)\+([\S\s]+)/
    }
  }
}
