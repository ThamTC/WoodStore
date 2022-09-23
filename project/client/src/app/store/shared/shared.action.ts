import { createAction, props } from "@ngrx/store";

const SET_SNIPPER_LOADING = "[shared state] set snipper loading"
const SET_ERROR_MESSAGE = "[shared state] set error message"

export const setSpinnerLoading = createAction(SET_SNIPPER_LOADING, props<{ status: boolean }>())
export const setErrorMessage = createAction(SET_ERROR_MESSAGE, props<{ message: string }>())