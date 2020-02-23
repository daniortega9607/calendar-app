<template>
  <div class="modal">
      <div class="card">
          <form class="form" @submit.prevent="addEvent">
              <label class="label" for="event">New Event:</label>
              <div>
                  <input type="text" v-model="newEvent" id="event" name="event" :autofocus="true" max="30">
              </div>
              Select a color:
              <verte model="rgb" v-model="color"/>
              <div v-if="newEvent && newEvent.length > 30">(Max 30 characters)</div>
              <button type="submit">Add</button>
          </form>
          <div v-if="$store.state.events[$store.state.selectedDate.id]" class="events">
              <div v-for="(event, i) in $store.state.events[$store.state.selectedDate.id]" :key="'event-'+i">
                  <input type="checkbox" :name="'selected'+i" :id="'selected'+i" @input="selectEvent(i)" :checked="selectedEvents[i]">
                  <label :for="'selected'+i">{{ event.value }} <div class="color" :style="`background: ${event.color}`"></div> </label>
              </div>
          </div>
          <button @click="$emit('close')">Cancel</button>
          <button @click="deleteAll">Delete All</button>
          <button @click="deleteSelected">Delete Selected</button>
      </div>
  </div>
</template>

<script>
import Verte from 'verte';
import 'verte/dist/verte.css';

export default {
    components: { Verte },
    data() {
        return {
            newEvent: null,
            selectedEvents: {},
            color: '',
        }
    },
    methods: {
        addEvent() {
            if (this.newEvent && this.newEvent.length && this.newEvent.length <= 30) {
                this.$store.commit('add', {
                    event: { value: this.newEvent, color: this.color},
                    date: this.$store.state.selectedDate.id
                });
                this.newEvent = '';
            }
        },
        selectEvent(index) {
            this.$set(this.selectedEvents, index, !this.selectedEvents[index]);
        },
        deleteSelected() {
            const { selectedEvents } = this;
            this.$store.commit('deleteSelected', { selectedEvents, date: this.$store.state.selectedDate.id});
            this.selectedEvents = Object.assign({});
        },
        deleteAll() {
            this.$store.commit('deleteAll', this.$store.state.selectedDate.id);
            this.selectedEvents = Object.assign({});
        }
    }
}
</script>

<style>
.modal {
    position: fixed;
    background: rgba(0, 0, 0, 0.8);
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
}
.card {
    width: 100%;
    max-width: 400px;
    background: #fff;
    margin: auto;
    left: 0;
    position: fixed;
    right: 0;
    padding: 8px;
}
.card button {
    margin: 4px
}
.label {
    margin-right: 4px;
}
.form {
    margin: 16px 0px;
}
.events {
    text-align: left;
}
.color {
    width: 10px;
    height: 10px;
    display: inline-block;
}
</style>