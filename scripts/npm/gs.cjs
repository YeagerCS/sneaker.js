const fs = require("fs")
const path = require("path")
const serviceName = process.argv[2]


const jsTemplate = `import TheService from "../../../scripts/models/Service.snkr";
class ${serviceName}Service extends TheService{
    static instance = null;

    constructor(){
        super();

        if(!${serviceName}Service.instance){
            ${serviceName}Service.instance = this;

            // Initialization logic here
        }

        return ${serviceName}Service.instance;
    }

}

export default new ${serviceName}Service();
`;

if(!serviceName){
    console.error("Please provide a name for your service");
    process.exit(1);
}

const dirPath = path.join(__dirname, "../../src/services", serviceName);
const servicesDir = path.join(__dirname, "../../src/services")

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