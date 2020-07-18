import Component, {ComponentDefaultOptions} from '../core/abstracts/component';
import './tabs.scss';

// TODO: проработать случай, когда табы внутри таба

const defaults: ComponentDefaultOptions = {
    name: 'Tabs',
    selectors: {
        navItems: '[data-tabs-nav-items]',
        contentItems: '[data-tabs-content-items]',
    },
    data: {
        activeTab: 0,
    } 
}

export default class Slider extends Component {
    elements: { [key: string]: HTMLElement[] };
    
    constructor(root: HTMLElement, options?: {[key: string]: any}){
        super(root, defaults, options);
        this.elements = this.findElements();
        this.checkItemsLength();
        this.switchTabTo(parseInt(this.data.activeTab as string));
        this.elements['navItems'].forEach((element, index) => {
            element.addEventListener('click', (event) => {
                event.preventDefault();
                this.switchTabTo(index);
                return false;
            })
        });
    }

    private findElements() {
        let elements: { [key: string]: HTMLElement[]} = {};
        this.root.querySelectorAll(this.selectors['navItems']).forEach
        elements['navItems'] = [].slice.call(this.root.querySelectorAll(this.selectors['navItems']));
        elements['contentItems'] = [].slice.call(this.root.querySelectorAll(this.selectors['contentItems']));
        return elements;
    }

    private init() {
        this.checkItemsLength();
    }

    private checkItemsLength() {
        if (this.elements['navItems'].length !== this.elements['contentItems'].length) throw `[${this.name}] Number of navigation (${this.elements['navItems'].length}) doesn't match number of content elements (${this.elements['contentItems'].length})`;
    }

    private switchTabTo(id:number) {
        if (id > this.elements['navItems'].length) throw `[${this.name}] Can't switch to tab (${id}). Total (${this.elements['navItems'].length})`;
        this.elements['navItems'].forEach((element, index) => {
            this.elements['navItems'][index].classList.remove('is-active');
            this.elements['contentItems'][index].classList.remove('is-active');
        });
        this.elements['navItems'][id].classList.add('is-active');
        this.elements['contentItems'][id].classList.add('is-active');
    }
}