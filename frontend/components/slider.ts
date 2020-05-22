import Component, {ComponentDefaultOptions} from '../core/abstracts/component';
import {SliderController} from '../core/utils/slider-controller';

const defaults: ComponentDefaultOptions = {
    name: 'Slider',
    selectors: {
        items: '[data-slider-items]',
        dots: '[data-slider-dots]',
        controlPrev: '[data-slider-control-prev]',
        controlNext: '[data-slider-control-next]',
    },
    data: {
        // isOpen: false,
        // isToggleText: false,
        // textOpen: null,
        // textClose: null
    } 
}

export default class Slider extends Component {
    constructor(root: HTMLElement, options?: {[key: string]: any}){
        super(root, defaults, options);
        this.elements = this.findElementsBySelectors();
        this.init();
        console.log(this);
        // this.controller = new SliderController();
    }

    private init() {
        
    }
}