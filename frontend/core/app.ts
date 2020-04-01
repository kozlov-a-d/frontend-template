import applyMixins from './utils/apply-mixins';
import EventEmitterMixin from './mixins/event-emitter';
import ScreenModule from './modules/screen';
import Benchmarks from './utils/benchmark';

/** Main class */
class App {
    debagMode: boolean;
    screen: ScreenModule; 

    constructor(){
        Benchmarks.start('App');
        this.debagMode = true;
        this.screen = ScreenModule.getInstance(); 
        Benchmarks.end('App');
    }

    /** Get info about debug mode status. */
    info(text: string): void {
        console.info(`debagMode is ${this.debagMode} ${text}`);
    }
}

interface App extends EventEmitterMixin {}
applyMixins(App, [EventEmitterMixin]);

export default App;
