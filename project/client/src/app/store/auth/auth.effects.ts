import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { exhaustMap, map, of } from "rxjs";
import { catchError } from "rxjs/operators";
import { AuthService } from "src/app/services/auth.service";
import { AppState } from "../app.state";
import { setErrorMessage, setSpinnerLoading } from "../shared/shared.action";
import { signinStart, signinSuccess } from "./auth.action";

@Injectable()
export class AuthEffects {
    constructor(private actions$: Actions, private authService: AuthService, private store: Store<AppState>) { }
    signin$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(signinStart),
            exhaustMap(action => {
                return this.authService.signin(action.email, action.password).pipe(
                    map(data => {
                        this.store.dispatch(setSpinnerLoading({ status: false }))
                        this.store.dispatch(setErrorMessage({ message: "" }))
                        const user = this.authService.formatUser(data)
                        return signinSuccess({ user })
                    }),
                    catchError(error => {
                        console.log(error)
                        return of(setErrorMessage(error.error))
                    })
                )
            })
        )
    })
}