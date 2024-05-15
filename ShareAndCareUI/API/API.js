import axios from "axios";
import Toast from 'react-native-toast-message';

const IP_ADD = "10.0.248.58";
const API_URL = `http://${IP_ADD}:8081`;

const api = axios.create({
    baseURL: API_URL
});

const showToast = (message) => {
    Toast.show({
        type: 'error',
        text1: `${message}`
    });
}

api.interceptors.response.use(
    function (response) {
        return response
    },
    function (error) {
        const errorMessage = error.response.data.message
        showToast(errorMessage)
        throw new Error(errorMessage)
    }
)

export default api;
