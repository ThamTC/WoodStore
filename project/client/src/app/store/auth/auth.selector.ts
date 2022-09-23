import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AuthState } from "./auth.state";

export const AUTH_FEATURE_KEY = "auth"

export const getAuthState = createFeatureSelector<AuthState>(AUTH_FEATURE_KEY)

export const isAuthticated = createSelector(getAuthState, (state) => {
    return state.user ? true : false
})