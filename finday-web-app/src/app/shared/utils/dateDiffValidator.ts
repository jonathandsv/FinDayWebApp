import { FormGroup } from '@angular/forms';

// custom validator to check that two fields match
export function dateDiffValidator(start: string, end: string) {
  return (formGroup: FormGroup) => {
    const startControl = formGroup.controls[start];
    const endControl = formGroup.controls[end];
    endControl.setErrors(null);
    startControl.setErrors(null);

    if (startControl.errors && !endControl.errors.dateDiff) {
      return;
    }
    if (!!startControl.value && !!endControl.value) {
      if (startControl.value > endControl.value) {
        endControl.setValue('');
        endControl.setErrors({ dateDiff: true });
      } else {
        endControl.setErrors(null);
        startControl.setErrors(null);
      }
    } else if (!!startControl.value && !endControl.value) {
      endControl.setErrors({ required: true });
    } else if (!startControl.value && !!endControl.value) {
      startControl.setErrors({ required: true });
    } else {
      endControl.setErrors(null);
      startControl.setErrors(null);
    }
  };
}
