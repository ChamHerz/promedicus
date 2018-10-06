import { FormGroup, FormControl, FormGroupDirective, NgForm, ValidatorFn } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material';

export class CustomValidators {
    static childrenEqual: ValidatorFn = (formGroup: FormGroup) => {
        const [firstControlName, ...otherControlNames] = Object.keys(formGroup.controls || {});
        const isValid = otherControlNames.every(controlName => formGroup.get(controlName).value === formGroup.get(firstControlName).value);
        return isValid ? null : { childrenNotEqual: true };
    }
}

export class ConfirmValidParentMatcher implements ErrorStateMatcher {
    isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
        return control.parent.invalid && control.touched;
    }
}

export const errorMessages: { [key: string]: string } = {
    fullName: 'Full name must be between 1 and 128 characters',
    email: 'Email must be a valid email address (username@domain)',
    emailConfirm: 'Email addresses must match',
    password: 'Password must be between 7 and 15 characters, and contain at least one number and special character',
    confirmPassword: 'Passwords must match'
};