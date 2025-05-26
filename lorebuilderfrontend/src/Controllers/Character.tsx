import axios from "axios";

export function Character () {
    const baseUrl = 'http://localhost:8000/backend';

    const getCharacters = async () => {
        axios({
            method: 'get',
            url: baseUrl + '/characters'
        })
        .then((r) => {return r.data});
    }



    return {
        getCharacters

    }
}