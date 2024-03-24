import { initialRender } from "./scripts/sneaker.js"
import { AppComponent } from "./src/components/App/App.js"


const load = async () => {
    await initialRender(AppComponent, "root")
}

document.addEventListener("DOMContentLoaded", async () => {
    await load();
})