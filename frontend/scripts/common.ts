import '../styles/main.scss';
import App from '../core/app';

// @ts-ignore
window.App = App;

App.modules.lazyLoadImages.use('.js-img-lazy');

import Spoiler from '../components/spoiler';
App.initComponent(Spoiler, '.js-spoiler');

import Slider from '../components/slider';
App.initComponent(Slider, '.js-slider');

import Tabs from '../components/tabs';
App.initComponent(Tabs, '.js-tabs');

// App.on('test', () => {console.info('testtt')});
// App.trigger('test');

// App.screen.addMediaQuery({
//     min: 0,    // начало интервала
//     max: 1023, // конец интервала
//     onEnter: function(){
//         console.info('addMediaQuery test')
//     }
// })

// включить лейзи лоад. задать класс
// const ImgLazy = '';
// App.initModule(ImgLazy, {
//     selector: '.js-img-lazy'
// });

// // включить аякс отправку формы ( задать класс, задать экшены и колбэки)
// const AjaxForm = '';
// App.initModule(AjaxForm, {
//     selector: '.form.js-ajax',
//     recaptcha: false,
//     actions: {
//         successSubmit: () => {

//         }
//     }
// });

// const Goals = '';
// App.initModule(Goals, {
//     selector: '.form.js-ajax',
//     recaptcha: false
// });
