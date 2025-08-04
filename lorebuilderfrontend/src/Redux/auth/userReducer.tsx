let initialState = {
    username : '',
    password: ''
}

export default function userReducer(
    state : {username: string, password: string} = initialState, 
    action : {type: string, payload: {username: string, password: string}}) 
    {
    switch (action.type) {
        case 'user/login' : {
            return {
                ...state,
                username: action.payload.username,
                password: action.payload.password
            }
        }

        case 'user/logout' : {
            return {
                ...state,
                username: '',
                password: ''
            }
        }

        default:
            return state
    }
}