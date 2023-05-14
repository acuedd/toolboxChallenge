const externalAPI = require("./api_externa")

const timeToWait = 500;
let arrFilter = {};

const sleep = (ms)=>{
    return new Promise( resolve => setTimeout(resolve, ms));
}

const getFiles = async ()=>{
    let files = await externalAPI.getFilesExternalAPI();
    
    for(let i = 0; i < files.length; i++){        
        let element = await externalAPI.getInfoFile(files[i]);
        if(element != null){
            arrFilter[files[i]] = element;
        } 
        await sleep(timeToWait);   
    }
    return arrFilter;
}

const getDataFromCSV = (content)=>{
    const result = Object.keys(content).map((item)=>{
        const objCSV = content[item]
        const array = objCSV.toString().split("\n");
        let headers = array[0].split(",")
        let result = []
        
        for (let i = 1; i < array.length - 1; i++) {
            let obj = {}
            let str = array[i]
            let s = ''

            let flag = 0
            for (let ch of str) {
                if (ch === '"' && flag === 0) {
                    flag = 1
                }
                else if (ch === '"' && flag == 1) flag = 0
                if (ch === ', ' && flag === 0) ch = '|'
                if (ch !== '"') s += ch
            }
        
            // Split the string using pipe delimiter |
            // and store the values in a properties array
            let properties = s.split(",")
        
            // For each header, if the value contains
            // multiple comma separated data, then we
            // store it in the form of array otherwise
            // directly the value is stored
            for (let j in headers) {
                try{                                        
                    if(properties[j]) {
                        obj[headers[j]] = properties[j]
                    }
                    else{
                        obj[headers[j]] = ""
                    }
                    
                } catch(e){
                    //console.error("🚀 ~ file: files.js:68 ~ result ~ e:", e)
                    
                }
                
            }
        
            // Add the generated object to our
            // result array
            result.push(obj)            
        }      
        
        
        return {"file":item, "headers":headers,"lines": result}
    })
    return result;
}

exports.Files = async ()=>{
    const data = await getFiles();
    const dataFile = getDataFromCSV(data);
    //console.log("🚀 ~ file: files.js:75 ~ exports.Files= ~ dataFile:", dataFile)

    return dataFile
}