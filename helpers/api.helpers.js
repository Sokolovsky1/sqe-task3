const axios = require("axios");
const { BASE_URL } = require("../config/endpoints")

const sendRequest = async(path, data = null, method = 'get') => {
    try {
        const response = await axios({
            url: `${BASE_URL}${path}`,
            method,
            headers: {},
            data
        })
        return {
            status: response.status,
            data: response.data
        }
    } catch (error) {
        return {
            status: error.response.status
        }
    }
}

module.exports = sendRequest