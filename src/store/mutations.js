import Vue from 'vue';

export const add = (store, { date, event }) => {
    if (!store.events[date]) {
        Vue.set(store.events, date, []);
    }
    store.events[date].push(event);
}

export const setState = (store, state) => {
    Object.keys(state).forEach(key => {
        store[key] = state[key];
    });
}

export const deleteSelected = (store, { selectedEvents, date }) => {
    const indicesToDelete = Object.keys(selectedEvents).reduce((prev, next) => {
        if(selectedEvents[next]) {
            prev.push(parseInt(next));
        }
        return prev;
    }, []).sort().reverse();
    store.events[date] = store.events[date].reduce((prev, next, i) => {
        if (!indicesToDelete.includes(i)) {
            prev.push(next);
        }
        return prev;
    }, []);
}

export const deleteAll = (store, date) => {
    store.events[date] = [];
}