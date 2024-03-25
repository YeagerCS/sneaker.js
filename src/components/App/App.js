import { enableRoutes, initCss, render } from "../../../scripts/sneaker.js";
import TheComponent from "../../../scripts/models/Component.js";
import { NotFoundComponent } from "../NotFound/NotFound.js";
import { WelcomeComponent } from "../Welcome/Welcome.js";

class AppComponent extends TheComponent{
    constructor(){
        super()
    }

    name = "App.html";

    async init(){
        await initCss("App.css")

        this.routes();
    }

    onRender(){
        this.init()
        enableRoutes(this.routes)
    }

    async routes(){
        const path = window.location.pathname;

        const routes = {
            "/": WelcomeComponent,
        } 
        

          
        await render(routes[path] ?? NotFoundComponent, "router")
    }
}

export { AppComponent }