import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Venue} from "../../../shared/interfaces";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {Subscription, switchMap} from "rxjs";
import {VenueService} from "../../services/venue.service";
import {AlertService} from "../../../shared/services/alert.service";

@Component({
  selector: 'app-venue-editor',
  templateUrl: './venue-editor.component.html',
  styleUrls: ['./venue-editor.component.css']
})
export class VenueEditorComponent implements OnInit, OnDestroy {

  venueEditorForm: FormGroup;
  submitted = false;

  venueId: number;

  vSub: Subscription;

  createOrEditLabelName = '';

  @ViewChild('nameInput') nameInput: ElementRef<HTMLInputElement>

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private venueService: VenueService,
    private alert: AlertService
  ) {
  }

  editOrCreat(): boolean {
    return this.route.toString().includes('edit');
  }

  ngOnInit(): void {
    if (this.editOrCreat()) {
      this.route.params
        .pipe(
          switchMap(
            (params: Params) => {
              this.createOrEditLabelName = 'Редагувати місце проведення';
              this.venueId = params.id;
              return this.venueService.getVenueById(params.id);
            }
          )
        )
        .subscribe(
          venue => {
            this.venueEditorForm = this.createForm(venue);
            this.addPhoneArrayToForm(venue);
            this.makeFocus();
          }
        )
    } else {
      this.venueEditorForm = this.createForm();
      this.addPhoneArrayToForm();
      this.makeFocus();
      this.createOrEditLabelName = 'Додати місце проведення';
    }
  }

  makeFocus(): void {
    if (typeof this.venueEditorForm.controls['name'] !== 'undefined') {
      setTimeout(() =>
        this.nameInput.nativeElement.focus(), 0
      );
    }
  }

  createForm(venue?: Venue): FormGroup {
    return this.fb.group({
      name: [venue ? venue.name : '', [Validators.required]],
      address:
        this.fb.group({
          building: [venue && venue.building ? venue.building : null, [Validators.required]],
          street: [venue && venue.street ? venue.street : '', [Validators.required]],
          town: [venue && venue.town ? venue.town : '', [Validators.required]],
          country: [venue && venue.country ? venue.country : '', [Validators.required]]
        }),
      phones: this.fb.array([]),
      email: [venue && venue.email ? venue.email : '', [Validators.email]],
      webSite: [venue && venue.webSite ? venue.webSite : '']
    })
  }

  addPhoneArrayToForm(venue?: Venue): void {
    if (venue) {
      venue.phones.map(
        phone => {
          this.phones.push(
            this.fb.control(
              phone,
              Validators.pattern("^((\\+38-?)|0)[\ )(.-]*(0)[0-9]{2}[\ )(.-]*[0-9]{3}[\ )(.-]*[0-9]{2}[\ )(.-]*[0-9]{2}$")
            )
          )
        }
      )
    } else {
      this.phones.push(
        this.fb.control(
          '',
          Validators.pattern("^((\\+38-?)|0)[\ )(.-]*(0)[0-9]{2}[\ )(.-]*[0-9]{3}[\ )(.-]*[0-9]{2}[\ )(.-]*[0-9]{2}$")
        )
      )
    }
  }

  deletePhoneControl(index: number): void {
    this.phones.removeAt(index);
  }

  get phones(): FormArray {
    return this.venueEditorForm['controls']['phones'] as FormArray;
  }

  onSubmit(formGroupValue: any): void {
    if (this.venueEditorForm.invalid) {
      return
    }
    this.submitted = true;
    this.venueEditorForm.disable();
    let venue: Venue = {
      name: formGroupValue.name,
      country: formGroupValue.address.country,
      town: formGroupValue.address.town,
      street: formGroupValue.address.street,
      building: formGroupValue.address.building,
      phones: formGroupValue.phones,
      email: formGroupValue.email,
      webSite: formGroupValue.webSite
    };
    let venueServiceMethod;
    if(this.editOrCreat()) {
      venue.id = this.venueId;
      venueServiceMethod = this.venueService.updateVenue(venue);
    } else {
      venueServiceMethod = this.venueService.createVenue(venue);
    }
    this.vSub = venueServiceMethod.subscribe(
      venueAndMessage => {
        this.alert.success(venueAndMessage.message);
        this.submitted = false;
        this.resetForm();
      },
        error => {
          this.alert.danger(error.error.message ? error.error.message : error);
          this.submitted = false;
          this.venueEditorForm.enable();
      }
    )
  }

  resetForm(event?: any): void {
    if (event) {
      this.stopEvent(event);
    }
    this.venueEditorForm.reset();
    this.submitted = false;
    this.createOrEditLabelName = '';
    this.venueId = null;
    this.router.navigate(['/admin/venue']);
  }

  stopEvent(event: any): void {
    event.stopPropagation();
    event.preventDefault();
  }

  ngOnDestroy(): void {
    if (this.vSub) {
      this.resetForm();
      this.vSub.unsubscribe();
    }
  }
}
