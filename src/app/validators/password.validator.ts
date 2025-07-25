import { AbstractControl, ValidationErrors } from '@angular/forms';

export function complexPasswordValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (!value) return null;

    const hasUpper = /[A-Z]/.test(value);
    const hasLower = /[a-z]/.test(value);
    const hasNumber = /[0-9]/.test(value);
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(value);
    const isLongEnough = value.length >= 8;

    return hasUpper && hasLower && hasNumber && hasSpecial && isLongEnough
        ? null
        : { complexPassword: true };
}
