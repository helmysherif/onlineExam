import { AbstractControl, FormGroup } from "@angular/forms";
export function matchPasswordValidator(control:AbstractControl){
  return control.get("password")?.value === control.get("rePassword")?.value ? null : {mismatch:true}
}
// export function matchPasswordValidator(controlName: string, matchingControlName: string) {
//   return (formGroup: FormGroup) => {
//     const control = formGroup.controls[controlName]; 
//     const matchingControl = formGroup.controls[matchingControlName]; 
//     if (matchingControl.errors && !matchingControl.errors['mismatch']) {
//       return null;
//     }
//     if (control.value !== matchingControl.value) {
//       matchingControl.setErrors({ mismatch: true });
//     } else {
//       matchingControl.setErrors(null);
//     }

//     return null;
//   };
// }