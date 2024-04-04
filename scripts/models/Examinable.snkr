class Examinable {
    constructor(value = null){
        this.value = value;
        this.subscribers = []
        this.errorCallbacks = []
    }

    sneak(extend, error = null){
        error ? this.subscribers.push({ extend: extend, error: error }) : this.subscribers.push({ extend: extend });
        this.notify();

        return () => {
            this.subscribers = this.subscribers.filter(subscriber => subscriber.extend !== extend && (!error || subscriber.error !== error));
        }
    }

    notify(){
        this.subscribers.forEach(({ extend, error }) => {
            try{
                if(this.value instanceof Error){
                    error && error(this.value)
                } else{
                    extend && extend(this.value)
                }
            } catch(err){
                console.error('Error in callback:', err);
            }
        })
    }

    async fetch(url, options = null){
        try{
            const response = options ? await fetch(url, options) : await fetch(url);
            if(!response.ok){
                throw new Error('Failed to fetch data')
            }
            const data = await response.json();
            this.enter(data)
        } catch(error){
            this.enter(error)
        }
    }

    enter(newValue){
        this.value = newValue;
        this.notify();
    }
}

export default Examinable;