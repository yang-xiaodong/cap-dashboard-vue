import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

let store = new Vuex.Store({ 
    state: {
        metric: {}
    },

    getters: {
        getMetric(state) {
            return state.metric;
        }
    },
    mutations: {
        setMertic(state, val) {
            state.metric = val;
        }
    },
    actions: {
        pollingMertic({ commit }, val) {
            commit("setMertic", val);
        }
    },
});

export default store;