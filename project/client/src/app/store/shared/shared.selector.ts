import { createFeatureSelector, createSelector } from "@ngrx/store";
import { SharedState } from "./shared.state";
export const SHARED_FEATURE_KEY = 'shared'
const getFeatureSelector = createFeatureSelector<SharedState>(SHARED_FEATURE_KEY)

export const isShowSpinner = createSelector(getFeatureSelector, (state) => {
    return state.showSpinner
})

export const getErrorMessage = createSelector(getFeatureSelector, (state) => {
    return state.errorMessage
})