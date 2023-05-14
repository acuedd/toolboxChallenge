const axios = require('axios');
const AuthBearer = "aSuperSecretKey";

exports.getFilesExternalAPI = async () =>{

    let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: 'https://echo-serv.tbxnet.com/v1/secret/files',
    headers: { 
        'accept': 'application/json', 
        'authorization': 'Bearer ' + AuthBearer
    }
    };

    const response = await axios.request(config)
    const result = response.data
    if(result.files){
        return result.files
    }
    
    return []
}


exports.getInfoFile = async (filename)=>{    

    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: 'https://echo-serv.tbxnet.com/v1/secret/file/'+filename,
        headers: { 
            'authorization': 'Bearer ' +AuthBearer
        }
    };

    try{
        const response = await axios.request(config)
        const result = response.data
        return result
    } catch(e){
        console.log.apply(e)
    }       
}