import axios from 'axios';
export const axiosCall = async(url, method, data=null) => {
    const config = {
        method: method,
        url: url,
        data: data,
    };
    try{const response = await axios(config);
        return response;
    }
    catch (error) {
        throw error;
    }
}