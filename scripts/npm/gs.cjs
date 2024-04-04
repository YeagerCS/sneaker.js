const fs = require("fs")
const path = require("path")
const serviceName = process.argv[2]


const jsTemplate = `import Examinable from "../../../scripts/models/Examinable";
import TheService from "../../../scripts/models/Service";
class ${serviceName}Service extends TheService{
    static instance = null;

    yourExaminableΔ;

    constructor(){
        super();

        if(!${serviceName}Service.instance){
            this.yourExaminableΔ = new Examinable();

            ${serviceName}Service.instance = this;
        }

        return ${serviceName}Service.instance;
    }


    updateExaminable(value){
        this.yourExaminableΔ.enter(value)
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