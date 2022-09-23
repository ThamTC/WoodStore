import { AuthReducer } from "./auth/auth.reducer";
import { AUTH_FEATURE_KEY } from "./auth/auth.selector";
import { AuthState } from "./auth/auth.state";
import { sharedReducer } from "./shared/shared.reducer";
import { SHARED_FEATURE_KEY } from "./shared/shared.selector";
import { SharedState } from "./shared/shared.state";

export interface AppState {
    [AUTH_FEATURE_KEY]: AuthState,
    [SHARED_FEATURE_KEY]: SharedState
}

export const appReducer = {
    [AUTH_FEATURE_KEY]: AuthReducer,
    [SHARED_FEATURE_KEY]: sharedReducer
}