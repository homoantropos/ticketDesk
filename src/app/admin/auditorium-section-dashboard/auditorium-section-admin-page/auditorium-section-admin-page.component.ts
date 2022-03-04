import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {SectionService} from "../../services/section.service";
import {AlertService} from "../../../shared/services/alert.service";
import {switchMap} from "rxjs";

@Component({
  selector: 'app-auditorium-section-admin-page',
  templateUrl: './auditorium-section-admin-page.component.html',
  styleUrls: ['./auditorium-section-admin-page.component.css']
})
export class AuditoriumSectionAdminPageComponent implements OnInit {

  showButton = true;

  searchOption = true;
  searchValue = '';
  searchField = ['sectionName'];

  // // @ts-ignore
  // @ViewChild('nameInput') nameInputRef: ElementRef;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public sectionService: SectionService,
    private alert: AlertService
  ) {
  }

  ngOnInit(): void {
    this.sectionService.sections = [];
    this.route.queryParams
      .pipe(
        switchMap(
          (params: Params) => {
            if (params['showButton']) {
              this.showButton = params['showButton'];
            }
            return this.sectionService.getAllSections();
          }
        )
      )
      .subscribe(
        coaches => {
        },
        error => {
          this.alert.danger(error.error.message);
        }
      );
  }

  setShowButton(condition: boolean): void {
    this.showButton = condition;
  }

  goToSectionEditor(): void {
    this.showButton = false;
    this.router.navigateByUrl(`admin/section/create`);
    this.searchValue = '';
  }

  resetFiltering(): void {
    this.searchValue = '';
    this.ngOnInit();
  }
}
