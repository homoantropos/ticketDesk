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
    this.sections = this.sections.filter(sctn => sctn.id !== section.id)
    this.sections.unshift(section);
    this.sections = [...this.sections];
  }
    // @ts-ignore
  section: Section;

  setSection(section: AuditoriumSection): void {
    this.section = section;
  }

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
    this.sectionService.getAllSections()
      .subscribe(
        sections => this.sections = sections.slice(),
        error => this.alert.danger(error.error.message)
      );
  }

  showSectionEditor(condition: boolean): void {
    this.showEditor = condition;
    this.searchValue = '';
  }

}
