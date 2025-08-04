import { combineReducers } from 'redux'
import charReducer from './character/charReducer'
import userReducer from './auth/userReducer'

const rootReducer = combineReducers({
        user: userReducer,
        char: charReducer
    })

export default rootReducer;
