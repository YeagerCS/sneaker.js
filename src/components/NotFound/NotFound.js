import { initCss } from "../../../scripts/sneaker.js";
import TheComponent from "../../../scripts/models/Component.js";

class NotFoundComponent extends TheComponent {
    constructor(){
        super();
    }

    name = "NotFound.html";

    async init(){
        await initCss("NotFound.css");
    }

    onRender(){
        this.init();
    }
}

export { NotFoundComponent };
