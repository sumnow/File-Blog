<template>
  <div>
    <div v-for="item in list" @click="toCatalog(item)">{{item}}</div>
  </div>
</template>

<script>
import request from "../service";

export default {
  name: "home",
  data() {
    return {
      list: []
    };
  },
  methods: {
    toCatalog(i) {
      this.$router.push(`/code/${i}`);
    }
  },
  created() {
    request({
      url: "/catalog",
      data: {},
      method: "GET",
      success: data => {
        this.list = data;
      }
    });
  }
};
</script>

<style>
</style>
