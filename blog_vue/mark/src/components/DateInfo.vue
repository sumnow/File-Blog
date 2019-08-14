<template>
  <div class="module-date_wrap">
    <div class="module-date_date">{{dateInfo[3]}}</div>
    <div class="module-date_line">
      <svg width="100%" height="100%" version="1.1">
        <line x1="20" y1="0" x2="0" y2="70" style="stroke:rgb(160,165,175);stroke-width:1" />
      </svg>
    </div>
    <div class="module-date_month">{{dateInfo[2]}}/{{dateInfo[1]}}</div>
    <div class="module-date_day">{{currentDay}}</div>
  </div>
</template>

<script>
export default {
  name: "DateInfo",
  props: ["dateInfo"],
  computed: {
    currentDay() {
      return [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
      ][this.dateInfo[4]];
    }
  }
};
</script>

<style scoped>
.module-date_wrap {
  position: relative;
  display: grid;
  grid-template: 30px 10px 30px/90px 20px 140px;
  grid-template-areas:
    "date line month"
    "date line _"
    "date line day";
  grid-gap: 0px 10px;
  width: 280px;
  height: 70px;
  padding-right: 10px;
  font-weight: 800;
}

.module-date_date {
  grid-area: date;
  height: 70px;
  color: rgb(0, 23, 44);
  font-size: 84px;
  line-height: 70px;
}
.module-date_month {
  grid-area: month;
  width: 140px;
  height: 30px;
  font-size: 36px;
  line-height: 1;
}
.module-date_day {
  grid-area: day;
  box-sizing: border-box;
  width: 120px;
  padding-top: 8px;
  height: 26px;
  font-size: 26px;
  line-height: 26px;
}
.module-date_line {
  grid-area: line;
  width: 20px;
  height: 70px;
}
</style>
