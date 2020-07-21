import Component, { ComponentDefaultOptions } from '../core/abstracts/component';
import { SliderController } from '../core/utils/slider-controller';

// TODO: доделать

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
    },
};

export default class Slider extends Component {
    elements: { [key: string]: HTMLElement };

    constructor(root: HTMLElement, options?: { [key: string]: any }) {
        super(root, defaults, options);
        this.elements = this.findElements();
        this.init();
        console.log(this);
        // this.controller = new SliderController();
    }

    private findElements() {
        let elements: { [key: string]: HTMLElement } = {};
        Object.keys(this.selectors).forEach((selector) => {
            const element = this.root.querySelector(this.selectors[selector]);
            if (element) elements[selector] = element as HTMLElement;
            else throw `[${this.name}] can't found element ${this.selectors[selector]}`;
        });
        return elements;
    }

    private init() {}
}
