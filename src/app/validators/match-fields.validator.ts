import { FormGroup } from "@angular/forms";

export function matchEmailAndPassword(group: FormGroup) {
    const password = group.get('password')?.value;
    const re_password = group.get('re_password')?.value;
    const errors: any = {};
    if (password && re_password && password !== re_password) {
        return { passwordMismatch: true };
    }

    return null;
}