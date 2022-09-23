import { Action, createReducer, on } from "@ngrx/store";
import { setErrorMessage, setSpinnerLoading } from "./shared.action";
import { initialState, SharedState } from "./shared.state";

const _sharedReducer = createReducer(
    initialState,
    on(setSpinnerLoading, (state, action) => {
        return {
            ...state,
            showSpinner: action.status
        }
    }),
    on(setErrorMessage, (state, action) => {
        return {
            ...state,
            errorMessage: action.message
        }
    })
)
export function sharedReducer(state: SharedState | undefined, action: Action) {
    return _sharedReducer(state, action)
}