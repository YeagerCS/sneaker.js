const fs = require("fs")
const path = require("path")
const serviceName = process.argv[2]
const serviceClassname = serviceName + (serviceName.toLowerCase().endsWith("service") ? "": "Service")

const templatePath = path.join(__dirname, "service.template.js.snippet")

const jsTemplate = fs.readFileSync(templatePath, "utf-8")
            .replace(/{{SERVICE_CLASSNAME}}/g, serviceClassname)

if(!serviceName){
    console.error("Please provide a name for your service");
    process.exit(1);
}

const dirPath = path.join(__dirname, "../src/services", serviceName);
const servicesDir = path.join(__dirname, "../src/services")

try{
    if(!fs.existsSync(servicesDir)){
        fs.mkdirSync(servicesDir, { recursive: true })
    }

    fs.mkdirSync(dirPath)

    const fielnameJs = path.join(dirPath, serviceName + "Service" + ".js")
    fs.writeFileSync(fielnameJs, jsTemplate);

    console.log("Successfully generated service " + serviceName)
} catch(error){
    console.error(error);
    process.exit(1)
}
