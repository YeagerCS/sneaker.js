import { setInput } from "../sneaker.js";

class InputBind {
    value;

    constructor(elem){
        this.elem = elem;
        setInput(this)
    }

    clear(){
        this.value = ""
        document.getElementById(this.elem).value = this.value;
    }

}

export default InputBind;