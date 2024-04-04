import { initialRender } from "./scripts/sneaker"
import { AppComponent } from "./src/components/App/App"


const load = async () => {
    await initialRender(AppComponent, "root")
}

document.addEventListener("DOMContentLoaded", async () => {
    await load();
})