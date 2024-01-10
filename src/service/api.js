import axios from "axios";

const send = async ({method='', path='', data={}, access_token=''}) => {
    const commenUrl = 'http://localhost:8080'
    const url = commenUrl + path

    const header = {
        "Access-Control-Allow-Origin": commenUrl,
        "Access-Control-Allow-Credentials": true,
        "content-type": "application/json;charset=UTF-8",
        "accept": "applicatoin/json",
        "SameSite": "None",
        "Authorization": access_token,
    }
    const options = {
        method,
        url,
        headers,
        data,
        withCredential: true,
    }
    
    try {
        const response = await axios(options);
        return response.data    
    }
    catch(error) {
        throw error
    }
}

const getApi = ({path='', access_token=''} = {}) => {
    return send({method: 'GET', path, access_token})
}

const putApi = ({path='', data={}, access_token=''} = {}) => {
    return send({method= 'PUT', path, data, access_token})
}

const postApi = ({path='', data={}, access_token=''} = {}) => {
    return send({method= 'POST', path, data, access_token})
}

const delApi = ({path='', data={}, access_token=''} = {}) => {
    return send({method= 'POST', path, data, access_token})
}

export {
    getApi,
    putApi,
    postApi,
    delApi
}