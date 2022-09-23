import { createAction, props } from "@ngrx/store";
import { User } from "src/app/models/user.model";

export const SIGNIN_START = "[auth page] signin start"
export const SIGNIN_SUCCESS = "[auth page] signin success"

export const signinStart = createAction(SIGNIN_START, props<{ email: string, password: string }>())
export const signinSuccess = createAction(SIGNIN_SUCCESS, props<{ user: User }>())