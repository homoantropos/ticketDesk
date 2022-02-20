import {AbstractControl} from "@angular/forms";
import {DateManipulationService} from "./date-manipulation.service";

export function AgeValidator (control: AbstractControl): {[key: string]: boolean} | null {
  const dmS = new DateManipulationService();
  if(dmS.ageCheck(control.value, 12)) {
    return {invalidAge: true};
  }
  return null
}
