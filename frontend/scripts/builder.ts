import Vue from 'vue';
// @ts-ignore
import App from '../builder/index.vue';

new Vue({
    el: '#builder', // where <div id="app"> in your DOM contains the Vue template
    render: (h) => h(App),
});
