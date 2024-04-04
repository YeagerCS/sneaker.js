import { initialRender } from "./scripts/sneaker.snkr"
import { AppComponent } from "./src/components/App/App.snkr"


const load = async () => {
    await initialRender(AppComponent, "root")
}

document.addEventListener("DOMContentLoaded", async () => {
    await load();
})