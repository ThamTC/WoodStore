import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export const passwordMatchingValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const createPassword = control.get('createPassword');
    const confrimPassword = control.get('confirmPassword');
    return createPassword && confrimPassword && createPassword.value === confrimPassword.value ? null : { isMatch: true };
};