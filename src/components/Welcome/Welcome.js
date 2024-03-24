import { initCss } from "../../../scripts/sneaker.js";
import TheComponent from "../../../scripts/models/Component.js";

class WelcomeComponent extends TheComponent {
    constructor(){
        super();
    }

    name = "Welcome.html";

    async init(){
        await initCss("Welcome.css");
        // Your initialization logic
    }

    onRender(){
        this.init();
    }
}

export { WelcomeComponent };
