/** This mixin provides methods used for event handling. */
export default class EventEmitterMixin {
    events: { [key: string]: Function[] };

    private isEventsListExist() {
        if (typeof this.events === 'undefined') this.events = {};
    }

    /** Subscribe event, usage: menu.on('select', function(item) { ... } */
    public on(eventName: string, handler: Function) {
        this.isEventsListExist();
        if (!this.events[eventName]) this.events[eventName] = [];
        this.events[eventName].push(handler);
    }

    /** Unsubscribe event, usage:  menu.off('select', handler) */
    public off(eventName: string, handler: Function) {
        this.isEventsListExist();
        let handlers = this.events && this.events[eventName];
        if (!handlers) return;
        for (let i = 0; i < handlers.length; i++) {
            if (handlers[i] === handler) handlers.splice(i--, 1);
        }
    }

    /** Trigger event with name and data, usage: this.trigger('select', data1, data2); */
    public trigger(eventName: string, ...args: any): void {
        this.isEventsListExist();
        // обработчиков для этого события нет
        if (!this.events || !this.events[eventName]) return;
        // вызовем обработчики
        this.events[eventName].forEach((handler) => handler.apply(this, args));
    }
}
