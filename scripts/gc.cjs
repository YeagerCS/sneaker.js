
const fs = require("fs")
const path = require("path")
const componentName = process.argv[2]
const componentClassname = componentName + (componentName.toLowerCase().endsWith("component") ? "" : "Component")

const templatePath = path.join(__dirname, "component.template.js.snippet")

console.log("componentClassname", componentClassname)

const jsTemplate = fs.readFileSync(templatePath, "utf-8")
            .replace(/{{COMPONENT_CLASSNAME}}/g, componentClassname)
            .replace(/{{COMPONENT_NAME}}/g, componentName);


if(!componentName){
    console.error("Please provide a name for your component")
    process.exit(1)
}

const dirPath = path.join(__dirname, '../src/components', componentName)
const componentsDir = path.join(__dirname, "../src/components");

try{
    if (!fs.existsSync(componentsDir)) {
        fs.mkdirSync(componentsDir, { recursive: true });
    }

    fs.mkdirSync(dirPath)

    const filenameJS = path.join(dirPath, componentName + ".snkr");
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
