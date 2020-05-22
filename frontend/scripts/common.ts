import '../styles/main.scss';
import App from '../core/app';

// @ts-ignore
window.App = App;

import Spoiler from '../components/spoiler';
App.initComponent(Spoiler, '.js-spoiler');

import Slider from '../components/slider';
App.initComponent(Slider, '.js-slider');


// App.on('test', () => {console.info('testtt')});
// App.trigger('test');

// App.screen.addMediaQuery({
//     min: 0,    // начало интервала
//     max: 1023, // конец интервала
//     onEnter: function(){
//         console.info('addMediaQuery test')
//     }
// })
