import Component, {ComponentDefaultOptions} from '../core/abstracts/component';

const defaults: ComponentDefaultOptions = {
    name: 'Spoiler',
    selectors: {
        btn: '[data-spoiler-btn]',
        content: '[data-spoiler-content]',
    },
    data: {
        isOpen: false,
        isToggleText: false,
        textOpen: null,
        textClose: null
    } 
}

export default class Spoiler extends Component {
    elements: { [key: string]: HTMLElement };
    
    constructor(root: HTMLElement, options?: {[key: string]: any}){
        super(root, defaults, options);

        this.elements = this.findElements();

        this.init();
        this.elements.btn.addEventListener('click', this.handlerToogle.bind(this));
        window.addEventListener('resize', this.handlerOnResize.bind(this), { passive: true });
    }

    private findElements() {
        let elements: { [key: string]: HTMLElement} = {};
        Object.keys(this.selectors).forEach((selector) => {
            const element = this.root.querySelector(this.selectors[selector]);
            if (element) elements[selector] = element as HTMLElement;
            else throw `[${this.name}] can't found element ${this.selectors[selector]}`;
        });
        return elements;
    }

    private init() {
        this.elements.content.dataset.height = this.elements.content.scrollHeight.toString();
        this.elements.content.style.height = this.elements.content.dataset.height;
        this.elements.content.style.overflow = 'hidden';
        this.elements.content.style.transition = 'height 0.3s ease';
        if (!this.data.isOpen) this.close();
    }

    public open() {
        this.elements.content.style.height = `${this.elements.content.dataset.height}px`;
        this.data.isOpen = true;
        this.root.classList.add('is-open');
        if (this.data.isToggleText) this.elements.btn.innerHTML = this.data.textOpen as string;
    }

    public close() {
        this.elements.content.style.height = '0';
        this.data.isOpen = false;
        this.root.classList.remove('is-open');
        if (this.data.isToggleText) this.elements.btn.innerHTML = this.data.textClose as string;
    }

    public toggle(){
        this.data.isOpen ? this.close() : this.open();
    }

    private handlerToogle(event: Event) {
        event.preventDefault();
        this.toggle();
        return false;
    }

    private handlerOnResize() {
        this.elements.content.style.height = '';
        this.elements.content.dataset.height = this.elements.content.scrollHeight.toString();
        this.elements.content.style.height = `${this.elements.content.dataset.height}px`;
        if (!this.data.isOpen) this.close();
        else this.elements.content.dataset.height = this.elements.content.scrollHeight.toString();
    }
}
