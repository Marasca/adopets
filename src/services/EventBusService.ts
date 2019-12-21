class EventBus {
    private bus: {};

    constructor() {
        this.bus = {};
    }

    $on(id: string, callback: Function) {
        // @ts-ignore
        this.bus[id] = callback;
    }

    $emit(id: string, ...vars: any) {
        // @ts-ignore
        this.bus[id](...vars);
    }

    $off(id: string) {
        // @ts-ignore
        delete this.bus[id];
    }
}

export default new EventBus();
