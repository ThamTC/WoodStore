import { createReducer, Action, on } from "@ngrx/store";
import { autoSignin, autoSignout, signinSuccess } from "./auth.action";
import { AuthState, initialState } from "./auth.state";
const _authReducer = createReducer(
    initialState,
    on(signinSuccess, (state, action) => {
        return {
            ...state,
            user: action.user
        }
    }),
    on(autoSignin, (state, action) => {
        return {
            ...state
        }
    }),
    on(autoSignout, (state, action) => {
        return {
            ...state,
            user: null
        }
    })
)
export function AuthReducer(state: AuthState | undefined, action: Action) {
    return _authReducer(state, action)
}