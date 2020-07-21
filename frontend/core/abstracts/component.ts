import { deepMerge } from '../utils/object';

export type ComponentDefaultOptions = {
    name: string;
    data: { [key: string]: any };
    [key: string]: any;
};

export default class Component {
    root: HTMLElement;
    name: String;
    data: { [key: string]: string | boolean };
    selectors: { [key: string]: string };

    constructor(root: HTMLElement, defaults: ComponentDefaultOptions, options?: {}) {
        this.root = root;
        // Соединяем значение опций по умолчанию с переданными при инициализации
        const currentOptions = options ? deepMerge(defaults, options) : defaults.data;
        // Записываем обязательные значения
        this.name = currentOptions.name;
        this.data = currentOptions.data;
        this.selectors = currentOptions.selectors;
        // Корректируем значения this.data, при наличии data-атрибутов
        this.checkDataAttrsOptions();
    }

    private checkDataAttrsOptions() {
        Object.keys(this.data).forEach((attr) => {
            if (this.root.dataset[attr] !== undefined) {
                switch (this.root.dataset[attr]) {
                    case 'true':
                        this.data[attr] = true;
                        break;
                    case 'false':
                        this.data[attr] = false;
                        break;
                    default:
                        this.data[attr] = this.root.dataset[attr];
                }
            }
        });
    }
}
