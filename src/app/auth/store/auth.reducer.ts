import { User } from '../user.model';
import * as AuthActions from './auth.action';


export interface State {
    user: User;
   authEror: string;
   loading:boolean;
}

const initialState: State = {
    user: null,
    authEror: null,
    loading: false
}

export function authReducer(state = initialState, action: AuthActions.AuthActions) {
switch (action.type) {
    case AuthActions.LOGIN:
        const user = new User(action.payload.email,
             action.payload.userId,
              action.payload.token,
               action.payload.expirationDate)
        return {
            ...state,
            authEror:null,
             user: user,
             loading: false
        }
       case AuthActions.LOGOUT:
           return {
               ...state,
               authEror:null,
               user: null
           }
           case AuthActions.LOGIN_START:
               return {
                ...state,
                authEror:null,
                loading: true
                 
               }
               case AuthActions.LOGIN_FAIL:
                   return {
                    ...state,
                    user: null ,
                    authEror: action.payload,
                    loading: false
                  
                   }
    default:
        return state;
}
}