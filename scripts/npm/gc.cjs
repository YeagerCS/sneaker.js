
const fs = require("fs")
const path = require("path")
const componentName = process.argv[2]

const componentExport = `${componentName.toUpperCase()}${componentName.toLowerCase().includes("component") ? "" : "_COMPONENT"}`;


const jsTemplate = `import { initCss } from "../../../scripts/sneaker.js";
import TheComponent from "../../../scripts/models/Component.js";

class ${componentName}Component extends TheComponent {
    constructor(){
        super();
    }

    name = "${componentName}.html";

    async init(){
        await initCss("${componentName}.css");
        // Your initialization logic
    }

    onRender(){
        this.init();
    }
}

export { ${componentName}Component };
`;



if(!componentName){
    console.error("Please provide a name for your component")
    process.exit(1)
}

const dirPath = path.join(__dirname, '../../src/components', componentName)
const componentsDir = path.join(__dirname, "../../src/components");

try{
    if (!fs.existsSync(componentsDir)) {
        fs.mkdirSync(componentsDir, { recursive: true });
    }

    fs.mkdirSync(dirPath)

    const filenameJS = path.join(dirPath, componentName + ".js");
    fs.writeFileSync(filenameJS, jsTemplate);

    const filenameCSS = path.join(dirPath, componentName + ".css")
    fs.writeFileSync(filenameCSS, "");

    const filenameHTML = path.join(dirPath, componentName + ".html")
    fs.writeFileSync(filenameHTML, `<h1>${componentName} works!</h1>`);

   
    
    console.log("Successfully generated component " + componentName)
} catch(error){
    console.error(error);
    process.exit(1)
}
