import axios from "axios";
import { useCookies } from 'react-cookie';

export function authentication (user: string, password: string) {
    // const [cookies, setCookie, removeCookie] = useCookies(['cookie-name']);
    const baseUrl = 'http://localhost:8000/backend';
    const login = () => {
        axios({
            method: 'post',
            url: baseUrl + '/login',
            data: {userName: user, password: password},
        })
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