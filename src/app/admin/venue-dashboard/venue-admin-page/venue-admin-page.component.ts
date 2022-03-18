import {Component, OnInit} from '@angular/core';
import {VenueService} from "../../services/venue.service";
import {Venue} from "../../../shared/interfaces";
import {AlertService} from "../../../shared/services/alert.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-venue-admin-page',
  templateUrl: './venue-admin-page.component.html',
  styleUrls: ['./venue-admin-page.component.css']
})
export class VenueAdminPageComponent implements OnInit {

  venues: Array<Venue> = [];

  setSections(venue: Venue): void {
    if (typeof venue !== 'undefined') {
      this.removeVenue(venue.id);
      this.venues.unshift(venue);
      this.removeVenue(undefined);
    } else {
      this.removeVenue(undefined);
    }
  }

  venue: Venue | undefined = undefined;

  removeVenue(id: number | undefined): void {
    if (typeof id !== 'undefined') {
      this.venues = this.venues.filter(vnu => vnu.id !== id);
    }
    this.venues = [...this.venues];
  }

  showEditor = false;

  searchOption = true;
  searchValue = '';
  searchField = ['name'];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private venueService: VenueService,
    private alert: AlertService
  ) {
  }

  ngOnInit(): void {
    this.venues = undefined;
    this.venueService.getAllVenues()
      .subscribe(
        venues => {
          this.venues = venues.slice();
        },
        error => {
          this.alert.danger(error.error.message);
        }
      )
  }

  goToVenueCreator(): void {
    this.venue = this.venueService.venue;
    this.searchValue = '';
    this.router.navigateByUrl(`admin/venue/create`)
  }

  showSectionEditor(condition: boolean): void {
    this.showEditor = condition;
  }

}
