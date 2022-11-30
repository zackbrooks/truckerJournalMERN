import { DISPLAY_ALERT, CLEAR_ALERT, 
    REGISTER_USER_BEGIN,REGISTER_USER_SUCCESS,REGISTER_USER_ERROR,
    LOGIN_USER_BEGIN,LOGIN_USER_SUCCESS,LOGIN_USER_ERROR, LOGGED_IN, LOG_OUT_USER} from "./actions"
import { initialState } from "./appContext"

const reducer = (state, action) =>{
    switch(action.type){
        case DISPLAY_ALERT :
           return {
            ...state,
            showAlert: true,
            alertType: 'error',
            alertText: 'Please provide all values!'
           } 
        case CLEAR_ALERT:
           return {
            ...state,
            showAlert: false,
            alertType: '',
            alertText: ''
           } 
        case REGISTER_USER_BEGIN:{
            return {
                ...state,
                isLoading: true,       
            }
        }
        case REGISTER_USER_SUCCESS:{
            return {
                ...state,
                isLoading:false,
                token: action.payload.token ,
                user: action.payload.user,
                showAlert: true,
                alertType: 'success',
                alertText: "User Created! Redirecting to Journal..."
            }
        }
        case REGISTER_USER_ERROR:{
            return {
                ...state,
                isLoading:false,
                showAlert: true,
                alertType: 'error',
                alertText: action.payload.msg
            }
        }
        case LOGIN_USER_BEGIN:{
            return {
                ...state,
                isLoading: true,       
            }
        }
        case LOGIN_USER_SUCCESS:{
            return {
                ...state,
                isLoading:false,
                token: action.payload.token ,
                user: action.payload.user,
                showAlert: true,
                alertType: 'success',
                alertText: "User Logged In! Redirecting to Journal..."
            }
        }
        case LOGIN_USER_ERROR:{
            return {
                ...state,
                isLoading:false,
                showAlert: true,
                alertType: 'error',
                alertText: action.payload.msg
            }
        }
        case LOGGED_IN:{
            return {
                ...state,
                isLoading:true,
                showAlert: true,
                alertType: 'success',
                alertText: "User logged in! Redirecting to Journal..."
            }
        }
        case LOG_OUT_USER:{
            return {
                ...initialState,
                user:null,
                token: null,
            }
        }
    }
    throw new Error(`no such action: ${action.type}`)
}

export default reducer