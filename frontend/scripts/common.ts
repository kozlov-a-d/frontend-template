import '../styles/main.scss';

import DarvinApp from '../core/app';
import SpoilerComponent from '../components/spoiler';

const App = new DarvinApp();
// @ts-ignore
window.App = App;

new SpoilerComponent({
    selector: '.js-spoiler'
});

// App.on('test', () => {console.info('testtt')});
// App.trigger('test');

// App.screen.addMediaQuery({
//     min: 0,    // начало интервала
//     max: 1023, // конец интервала
//     onEnter: function(){
//         console.info('addMediaQuery test')
//     } 
// })
