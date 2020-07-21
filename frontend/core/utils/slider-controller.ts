export class SliderController {
    length: number;
    current: number;
    slideBy: number;

    constructor(length: number, current: number, slideBy?: number) {
        this.length = length;
        this.current = current;
        this.slideBy = slideBy ? slideBy : 1;
    }

    public getCurrent() {
        return this.current;
    }

    public goTo(index: number) {
        if (index > length) return 0;
        if (index < 0) return length - 1;
        this.current = index;
        return this.current;
    }

    public goNext() {
        return this.goTo(this.current + 1);
    }

    public gPrev() {
        return this.goTo(this.current - 1);
    }
}
