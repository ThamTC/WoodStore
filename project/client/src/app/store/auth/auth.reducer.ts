import { createReducer, Action, on } from "@ngrx/store";
import { signinSuccess } from "./auth.action";
import { AuthState, initialState } from "./auth.state";
const _authReducer = createReducer(
    initialState,
    on(signinSuccess, (state, action) => {
        return {
            ...state,
            user: action.user
        }
    })
)
export function AuthReducer(state: AuthState | undefined, action: Action) {
    return _authReducer(state, action)
}