<template>
  <div>
    <div class="month">
        <div class="header" v-for="day in daysName" :key="day">
            {{ day }}
        </div>
        <Day v-for="day in days" :key="day.id" :day="day" :onClick="toggleModal"/>
    </div>
    <Modal v-if="modal" @close="modal = false"/>
  </div>
</template>

<script>
import moment from "moment";
import Day from "./Day.vue";
import Modal from './Modal.vue';

const daysName = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];

export default {
  components: { Day, Modal },
  props: ["month", "year"],
  data() {
    const date = new Date();
    let day = date.getDate();
    day = day < 10 ? `0${day}` : day;
    return {
      day,
      daysName,
      modal: false,
    };
  },
  computed: {
    days() {
      const { year, month, day } = this;
      const firstDate = moment(`${year}-${month}-${day}`)
        .startOf("month")
        .startOf("week")
        .format("YYYY-MM-DD");
      const days = [];
      for (let index = 0; index < 35; index++) {
        const currentDate = moment(firstDate).add(index, "days");
        const isWeekend = currentDate.day() === 0 || currentDate.day() === 6;
        const disabled = currentDate.format('MM') !== month;
        days.push({
          id: currentDate.format("YYYY-MM-DD"),
          value: currentDate.date(),
          isWeekend,
          disabled,
        });
      }
      return days;
    }
  },
  methods: {
      toggleModal(day) {
          this.$store.commit('setState', { selectedDate: day });
          this.modal = true;
      }
  }
};
</script>

<style>
.month {
    width: 1400px;
    margin: auto;
    border-left: 1px solid #eee;
    border-top: 1px solid #eee;
}
.header {
    font-weight: bold;
    width: 200px;
    display: inline-block;
    box-sizing: border-box;
    padding: 8px 0px;
    background: rgb(38, 91, 190);
    color: white;
}
</style>