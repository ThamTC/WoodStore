export interface SharedState {
    showSpinner: boolean
    errorMessage: string
}

export const initialState: SharedState = {
    showSpinner: false,
    errorMessage: ""
}