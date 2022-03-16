import {Component, Input, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Venue} from "../../../shared/interfaces";
import {ActivatedRoute, Params} from "@angular/router";
import {switchMap} from "rxjs";
import {VenueService} from "../../services/venue.service";

@Component({
  selector: 'app-venue-editor',
  templateUrl: './venue-editor.component.html',
  styleUrls: ['./venue-editor.component.css']
})
export class VenueEditorComponent implements OnInit {

  venueEditorForm: FormGroup;


  @Input() venue: Venue;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private venueService: VenueService
  ) {
  }

  ngOnInit(): void {
    if (this.route.toString().includes('edit')) {
      this.route.params
        .pipe(
          switchMap(
            (params: Params) => {
              return this.venueService.getVenueById(params.id);
            }
          )
        )
        .subscribe(
          venue => {
            this.venueEditorForm = this.createForm(venue);
            this.addPhoneArrayToForm(venue);
          }
        )
    } else {
      this.venueEditorForm = this.createForm();
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
    if(venue) {
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

  get phones(): FormArray {
    return this.venueEditorForm['controls']['phones'] as FormArray;
  }

  onSubmit(value: FormGroup): void {
    console.log(value);
  }

}
