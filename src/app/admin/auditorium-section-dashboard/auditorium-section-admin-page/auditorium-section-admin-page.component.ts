import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {SectionService} from "../../services/section.service";
import {AlertService} from "../../../shared/services/alert.service";
import {AuditoriumSection} from "../../../shared/interfaces";

@Component({
  selector: 'app-auditorium-section-admin-page',
  templateUrl: './auditorium-section-admin-page.component.html',
  styleUrls: ['./auditorium-section-admin-page.component.css']
})

export class AuditoriumSectionAdminPageComponent implements OnInit {

  sections: Array<AuditoriumSection> = [];

  setSections(section: AuditoriumSection): void {
    if(typeof section !== 'undefined') {
      this.removeSection(section.id);
      this.sections.unshift(section);
      this.removeSection(undefined);
    } else {
      this.removeSection(undefined);
    }
  }

  section: AuditoriumSection | undefined = undefined;

  removeSection(id: number | undefined): void {
    if(typeof id !== 'undefined') {
      this.sections = this.sections.filter(sctn => sctn.id !== id);
    }
    this.sections = [...this.sections];
  }

  loading = false;
  showEditor = false;

  searchOption = true;
  searchValue = '';
  searchField = ['sectionName'];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public sectionService: SectionService,
    private alert: AlertService
  ) {
  }

  ngOnInit(): void {
    this.loading = true;
    this.sectionService.getAllSections()
      .subscribe(
        sections => {
          this.sections = sections.slice();
          this.loading = false;
        },
        error => {
          this.alert.danger(error.error.message);
          this.loading = false;
        }
      );
  }

  showSectionEditor(condition: boolean): void {
    this.showEditor = condition;
    this.section = this.sectionService.section;
    this.searchValue = '';
  }

}
