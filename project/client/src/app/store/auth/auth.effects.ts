import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { exhaustMap, map, of } from "rxjs";
import { catchError, mergeMap, tap } from "rxjs/operators";
import { AuthService } from "src/app/services/auth.service";
import { AppState } from "../app.state";
import { setErrorMessage, setSpinnerLoading } from "../shared/shared.action";
import { autoSignin, autoSignout, signinStart, signinSuccess } from "./auth.action";

@Injectable()
export class AuthEffects {
    constructor(private actions$: Actions, private authService: AuthService, private store: Store<AppState>, private router: Router) { }
    signin$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(signinStart),
            exhaustMap(action => {
                return this.authService.signin(action.email, action.password).pipe(
                    map(data => {
                        this.store.dispatch(setSpinnerLoading({ status: false }))
                        this.store.dispatch(setErrorMessage({ message: "" }))
                        const user = this.authService.formatUser(data)
                        this.authService.setUserLocalStorage(user)
                        return signinSuccess({ user })
                    }),
                    catchError(error => {
                        this.store.dispatch(setSpinnerLoading({ status: false }))
                        return of(setErrorMessage({ message: error.error.message }))
                    })
                )
            })
        )
    })

    signout$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(autoSignout),
            map(action => {
                this.authService.signout()
                this.router.navigate(['auth'])
            })
        )
    }, { dispatch: false })

    signinRedirect$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(signinSuccess),
            tap((action) => {
                this.router.navigate(['/'])
            })
        )
    }, { dispatch: false })

    autoSignin$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(autoSignin),
            mergeMap((action) => {
                const user = this.authService.getUserFromLocalStorage()
                console.log("user: ", user)
                return of(signinSuccess({ user: user }))
            })
        )
    })

}