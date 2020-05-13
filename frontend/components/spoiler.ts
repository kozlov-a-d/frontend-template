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
        textOpen: '',
        textClose: ''
    } 
}

export default class Spoiler extends Component {
    
    constructor(root: HTMLElement, options?: {[key: string]: any}){
        super(root, defaults, options);

        this.elements = this.findElementsBySelectors();

        this.init();
        this.elements.btn.addEventListener('click', this.handlerToogle.bind(this));
        window.addEventListener('resize', this.handlerOnResize.bind(this), { passive: true });
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
    }

    public close() {
        this.elements.content.style.height = '0';
        this.data.isOpen = false;
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
