import { Component, OnInit } from '@angular/core';
import {VenueService} from "../../services/venue.service";
import {Venue} from "../../../shared/interfaces";
import {AlertService} from "../../../shared/services/alert.service";

@Component({
  selector: 'app-venue-admin-page',
  templateUrl: './venue-admin-page.component.html',
  styleUrls: ['./venue-admin-page.component.css']
})
export class VenueAdminPageComponent implements OnInit {

  venues: Array<Venue> = [];

  constructor(
    private venueService: VenueService,
    private alert: AlertService
  ) { }

  ngOnInit(): void {
    this.venueService.getAllVenues()
      .subscribe(
        venues => {
          this.venues = venues.slice();
          console.log(this.venues);
        },
        error => {
          this.alert.danger(error.error.message);
        }
      )
  }

}
