import axios from "axios";
import { instance } from "../Services/AxiosInstance";

export function authentication (username: string, password: string) {
    const login = async () => {
        let request = instance.post(
            `/api/AccountController/Login`,
            {
                username: username,
                password: password
            }
        )
            .then((res) => console.log(res.data));
    }
    

    const getUserData = () => {
        console.log(document.cookie);
        axios({
            method: 'get',
            url: baseUrl + '/getAuthentication'
        })
        .then((res) => console.log(res.data))
    }

    return {
        login,
        getUserData
    }
}