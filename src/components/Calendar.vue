<template>
  <div>
    <div>
      <select name="month" id="month" v-model="month">
        <option :value="null">Select a Month</option>
        <option :value="month.id" v-for="month in months" :key="month.id">{{ month.value }}</option>
      </select>
      -
      <select name="year" id="year" v-model="year">
        <option :value="null">Select a Year</option>
        <option :value="year.id" v-for="year in years" :key="year.id">{{ year.value }}</option>
      </select>
    </div>
    <div class="overflow">
      <Month :month="month" :year="year" />
    </div>
  </div>
</template>

<script>

import Month from './Month.vue';
const months = [
  { id: "01", value: "January" },
  { id: "02", value: "February" },
  { id: "03", value: "March" },
  { id: "04", value: "April" },
  { id: "05", value: "May" },
  { id: "06", value: "June" },
  { id: "07", value: "July" },
  { id: "08", value: "August" },
  { id: "09", value: "September" },
  { id: "10", value: "October" },
  { id: "11", value: "November" },
  { id: "12", value: "December" }
];

export default {
  components: { Month },
  data() {
    const date = new Date();
    return {
      year: date.getFullYear(),
      month: months[date.getMonth()].id,
      months,
    };
  },
  computed: {
    years() {
      const firstYear = this.year - 25;
      const years = [];
      for (let index = 0; index <= 50; index++) {
        const value = firstYear + index;
        years.push({ id: value, value });
      }
      return years;
    }
  }
};
</script>

<style>
.overflow {
  overflow: auto;
}
</style>