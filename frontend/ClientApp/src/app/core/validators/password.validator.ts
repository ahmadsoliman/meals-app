import { FormControl } from '@angular/forms';

// Passwords should have at least one alphabetic character
const PASSWORD_PATTERN = '(^(?=.*[a-zA-Z]).{6,30}$)';

export function PasswordValidator(control: FormControl) {
  const passRegExp = new RegExp(PASSWORD_PATTERN);
  if (passRegExp.test(control.value)) {
    return {};
  } else {
    return {
      password: { valid: false }
    };
  }
}
