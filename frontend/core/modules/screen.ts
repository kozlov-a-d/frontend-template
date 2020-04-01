// @ts-check
import { throttle } from '../utils/decorators';

type MediaQueryType = {
    min: number;
    max: number;
    isEntered?: boolean;
    onEnter?: Function;
    onEach?: Function;
    onExit?: Function;
};

/**
 *
 */
export default class ScreenModule {
    private static instance: ScreenModule;
    private screenSize: { width: Number; height: Number };
    queries: MediaQueryType[];
    onResize: Function;

    private constructor() {
        this.screenSize = this.ckeckScreenSize();
        this.queries = [];
        this.onResize = throttle(() => {
            this.queries.forEach((query) => {
                this.triggerMediaQuery(query);
            });
        }, 200);
        window.addEventListener('resize', () => {
            this.screenSize = this.ckeckScreenSize();
            this.onResize();
        });
    }

    public static getInstance(): ScreenModule {
        if (!ScreenModule.instance) ScreenModule.instance = new ScreenModule();
        return ScreenModule.instance;
    }

    private ckeckScreenSize() {
        return { width: window.innerWidth, height: window.innerHeight };
    }

    public getScreenSize() {
        return this.screenSize;
    }

    public addMediaQuery(newQuery: MediaQueryType) {
        this.queries.push(newQuery);
        this.triggerMediaQuery(newQuery);
    }

    private triggerMediaQuery(query: MediaQueryType) {
        if (query.min <= this.screenSize.width && this.screenSize.width <= query.max) {
            // onEnter
            if (typeof query.onEnter === 'function' && !query.isEntered) {
                query.onEnter();
                query.isEntered = true;
            }
            // onEach
            if (typeof query.onEach === 'function') query.onEach();
        } else {
            // onExit
            if (query.isEntered) { query.onExit(); }
            query.isEntered = false;
        }
    }
}
