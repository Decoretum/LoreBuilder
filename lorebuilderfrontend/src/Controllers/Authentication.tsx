import axios from "axios";
import { instance } from "../Services/AxiosInstance";
import { AccountHome } from "../Types/HomeTypes";

export function authentication (username: string, password: string, dateOfBirth: string) {
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
        const timeDateOptions : object = { month: '2-digit', day: '2-digit', year: '2-digit', hour: "2-digit", minute: "2-digit" };
        const time = new Intl.DateTimeFormat("en-US", timeDateOptions).format(Date.parse(dateOfBirth)).replace(",", "");
        const request = await instance.post(
            `/api/AccountController/Register`,
            {
                username: username,
                password: password,
                dateOfBirth: time
            }
        );
        return request.data;
    }

    return {
        register,
        login,
        getUserData
    }
}