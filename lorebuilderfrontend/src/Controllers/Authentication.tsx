import axios from "axios";
import { instance } from "../Services/AxiosInstance";
import { AccountHome } from "../Types/HomeTypes";

export function authentication (username: string, password: string) {
    const login = async () => {
        const request = await instance.post(
            `/api/AccountController/Login`,
            {
                username: username,
                password: password
            }
        );
        console.log(request)
        return request.data as AccountHome;
    }
    

    const getUserData = () => {
        console.log(document.cookie);
        axios({
            method: 'get',
            url: baseUrl + '/getAuthentication'
        })
        .then((res) => console.log(res.data))
    }

    const register = async () => {
        const request = await instance.post(
            `/api/AccountController/Register`,
            {
                username: username,
                password: password
            }
        );
        console.log(request)
    }

    return {
        register,
        login,
        getUserData
    }
}