class Examinable {
    constructor(value = null){
        this.value = value;
        this.subscribers = []
    }

    sneak(action){
        this.subscribers.push(action)
        this.notify();

        return () => {
            this.subscribers = this.subscribers.filter(subscriber => subscriber !== action)
        }
    }

    notify(){
        this.subscribers.forEach(callback => callback(this.value))
    }

    enter(newValue){
        this.value = newValue;
        this.notify();
    }
}

export default Examinable;