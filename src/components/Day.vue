<template>
  <div :class="`day ${day.isWeekend ? 'weekend' : ''} ${day.disabled ? 'disabled' : ''}`" @click="openModal(day)">
      <div class="date">{{ day.value }}</div>  
    <div v-if="$store.state.events[day.id]" class="events" style="position:absolute">
        <div v-for="(event, i) in events" :key="'event-'+i">
            <div>{{ event.value }} <div class="color" :style="`background: ${event.color}`"></div></div>
        </div>
    </div>
  </div>
</template>

<script>

export default {
    props: ['day', 'onClick'],
    methods: {
        openModal(day) {
            if (day.disabled) return;
            this.onClick(day);
        }
    },
    computed: {
        events() {
            const events = [];
            this.$store.state.events[this.day.id].forEach(e => {
                if (events.length < 5) events.push(e);
            });
            if (this.$store.state.events[this.day.id].length > 5) {
                events.push({ value: `And ${this.$store.state.events[this.day.id].length - 5} more...` })
            }
            return events;
        }
    }
}
</script>

<style>
.day {
    width: 200px;
    height: 150px;
    border-bottom: 1px solid #000;
    border-right: 1px solid #000;
    display: inline-block;
    box-sizing: border-box;
}
.weekend {
    background: rgb(157, 174, 252);
    color: rgb(38, 91, 190);
}
.disabled {
    color: #eee;
}
</style>