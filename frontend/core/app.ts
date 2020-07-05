import applyMixins from './utils/apply-mixins';
import EventEmitterMixin from './mixins/event-emitter';
import ScreenModule from './modules/screen';
import LazyLoadImagesModule from './modules/lazy-load-images';
import Benchmarks from './utils/benchmark';

Benchmarks.start('App');

/** Main class */
class DarvinApp {
    debagMode: boolean;
    screen: ScreenModule; 
    modules: {
        lazyLoadImages: LazyLoadImagesModule,
    }

    constructor(){
        this.debagMode = true;
        this.screen = ScreenModule.getInstance(); 
        this.modules = {
            lazyLoadImages: LazyLoadImagesModule.getInstance(),
        };
    }

    /** Get info about debug mode status. */
    public info(text: string): void {
        console.info(`debagMode is ${this.debagMode} ${text}`);
    }

    public initComponent(component: any, selector: string, options?: {[key: string]: any}, requestIdlecallback?: boolean) {
        // document.addEventListener('DOMContentLoaded', () => {
        document.querySelectorAll(selector).forEach((element) => {
            Benchmarks.start(component.name);
            const instance = new component(element as HTMLElement, {});
            Benchmarks.end(component.name);
            Benchmarks.info();
        });
        // }, { passive: true });
    }
}

interface DarvinApp extends EventEmitterMixin {}
applyMixins(DarvinApp, [EventEmitterMixin]);

const App = new DarvinApp();

Benchmarks.end('App');

export default App;
