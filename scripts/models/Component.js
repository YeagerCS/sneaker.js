class TheComponent {
    name;
    title;

    constructor(){
        this.bindMethods()
        this.title = null;
    }

    async init(){
        throw new Error('init method must be implemented in component');
    }

    onRender(){
        throw new Error('onRender method must be implemented in component');
    }

    bindMethods() {
        for (let key of Object.getOwnPropertyNames(Object.getPrototypeOf(this))) {
            const prop = this[key];
            if (typeof prop === 'function' && key !== 'constructor') {
                this[key] = prop.bind(this);
            }
        }
    }
}

export default TheComponent;