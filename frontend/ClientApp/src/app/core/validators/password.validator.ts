import { FormControl, FormGroup } from '@angular/forms';

// Passwords should have at least one alphabetic character
const PASSWORD_PATTERN = '(^(?=.*[a-zA-Z]).{6,30}$)';

export function PasswordValidator(control: FormControl) {
  /*if (control.errors && !control.errors.password) {
        return;
    }*/
  const passRegExp = new RegExp(PASSWORD_PATTERN);
  if (passRegExp.test(control.value)) {
    return undefined;
  } else {
    return {
      password: { valid: false }
    };
  }
}
