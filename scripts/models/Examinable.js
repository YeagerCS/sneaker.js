class Examinable {
    constructor(value = null){
        this.value = value;
        this.subscribers = []
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

    socket(url, onClose = null, onOpen = null) {
        const webSocket = new WebSocket(url)

        webSocket.addEventListener("open", (e) => {
            onOpen && onOpen()
        })

        webSocket.addEventListener("message", (e) => {
            this.enter(e.data)
        })

        webSocket.addEventListener("error", (e) => {
            this.enter(new Error("Websocket error: " + e.target))
        })

        webSocket.addEventListener("close", (e) => {
            onClose && onClose()
        })
    }

    enter(newValue){
        this.value = newValue;
        this.notify();
    }
}

export default Examinable;