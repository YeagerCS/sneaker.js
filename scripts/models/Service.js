class TheService {

    constructor(){
        this.bindMethods();
    }

    bindMethods(){
        for (let key of Object.getOwnPropertyNames(Object.getPrototypeOf(this))) {
            const prop = this[key];
            if (typeof prop === 'function' && key !== 'constructor') {
                this[key] = prop.bind(this);
            }
        }
    }
}

export default TheService;