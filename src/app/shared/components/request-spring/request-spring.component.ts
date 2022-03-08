import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output
} from '@angular/core';
import {FilterRequest, FilterRequestInitValue, SelectInitOptions} from "../../services/filterRequestFilterValuesService";
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-request-spring',
  templateUrl: './request-spring.component.html',
  styleUrls: ['./request-spring.component.css']
})

export class RequestSpringComponent implements OnInit {
  // @ts-ignore
  @Input() filterRequestInitValue: FilterRequestInitValue;
  @Output() filterRequest: EventEmitter<FilterRequest> = new EventEmitter<FilterRequest>();
  // @ts-ignore
  filterRequestForm: FormGroup;
  filterRequestFormValues: Array<FilterRequest> = [];
  // @ts-ignore
  formControlNames: Array<string>;
  selectOptions: SelectInitOptions = [];

  constructor(
    private formBuilder: FormBuilder
  ) {
  }

  ngOnInit(): void {
    this.filterRequestForm = this.createForm(this.filterRequestInitValue);
    this.formControlNames = Object.keys(this.filterRequestFormValues);
  }

  fetchRequest(value: FilterRequest): void {
    this.filterRequest.emit(value);
  }

  createForm(filterRequestInitValue: FilterRequestInitValue): FormGroup {
    Object.keys(filterRequestInitValue)
      .map(
        key => {
          // @ts-ignore
          this.filterRequestFormValues[key] = filterRequestInitValue[key].initValue;
          // @ts-ignore
          this.selectOptions[key] = filterRequestInitValue[key].valueOptions;
        }
      );
    Object.keys(this.filterRequestFormValues).map(
      key => {
        if(!filterRequestInitValue[key]) {
          // @ts-ignore
          delete this.filterRequestFormValues[key];
        }
      }
    )
    return this.formBuilder.group(this.filterRequestFormValues);
  }

}
