import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {SectionService} from "../../services/section.service";
import {switchMap} from "rxjs";
import {AlertService} from "../../../shared/services/alert.service";
import {AuditoriumSection} from "../../../shared/interfaces";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-auditorium-section-editor',
  templateUrl: './auditorium-section-editor.component.html',
  styleUrls: ['./auditorium-section-editor.component.css']
})
export class AuditoriumSectionEditorComponent implements OnInit {

  // @ts-ignore
  sectionForm: FormGroup;
  showSectionForm = false;
  submitted = false;
  // @ts-ignore
  sectionId: number;

  // @ts-ignore
  cSub: Subscription;

  // @ts-ignore
  createOrEditLabelName: string;
  private creatOrEditor = true;

  setCreatOrEditor(condition: boolean): void {
    this.creatOrEditor = condition;
  }

  get creatorOrEditor(): boolean {
    return this.creatOrEditor;
  }

  @ViewChild('sectionName')
  set name(name: ElementRef<HTMLInputElement>) {
    if (name) {
      setTimeout(() => {
        name.nativeElement.focus();
      });
    }
  }

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private sectionService: SectionService,
    private alert: AlertService
  ) {
  }

  ngOnInit(): void {
    if (this.route.toString().includes('edit')) {
      this.setCreatOrEditor(false);
      this.createOrEditLabelName = 'Змінити';
      this.route.params
        .pipe(
          switchMap(
            (params: Params) => {
              this.sectionId = params['id'];
              return this.sectionService.getSectionByID(params['id']);
            }
          )
        )
        .subscribe(
          section => {
            this.sectionForm = this.createSectionForm(section);
          },
          error => this.alert.danger(error.message)
        );
    } else {
      this.sectionForm = this.createSectionForm(this.sectionService.initSection());
      this.createOrEditLabelName = 'Додати';
    }
  }

  createSectionForm(section: AuditoriumSection): FormGroup {
    return new FormGroup({
      sectionName: new FormControl(section.sectionName, Validators.required)
    });
  }

  onSubmit(formValue: any): void {
    this.sectionForm.disable();
    this.submitted = true;
    const createdSection: AuditoriumSection = {
      sectionName: formValue.sectionName.trim()
    };
    let sectionServiceMethod;
    if (this.creatorOrEditor) {
      sectionServiceMethod = this.sectionService.createSection(createdSection);
    } else {
      createdSection['id'] = this.sectionId;
      sectionServiceMethod = this.sectionService.updateSection(createdSection);
    }
    this.cSub = sectionServiceMethod
      .subscribe(
        dbCoachAndMessage => {
          this.sectionService.sections = this.sectionService.sections.filter(c => c.id !== dbCoachAndMessage.section.id);
          this.sectionService.sections.push(dbCoachAndMessage.section);
          this.alert.success(dbCoachAndMessage.message);
          this.resetCoachForm();
        }, error => {
          this.sectionService.errorHandle(error);
          this.sectionForm.enable();
          this.submitted = false;
        }
      );
    if (this.sectionService.error$) {
      this.sectionService.error$.subscribe(
        message =>
          this.alert.danger(message)
      );
    }
  }

  resetCoachForm(): void {
    this.router.navigate(['admin', 'section'], {
      queryParams: {
        showButton: false
      }
    });
    this.sectionForm.reset();
    this.sectionForm.enable();
    this.submitted = false;
    this.showSectionForm = false;
    this.createOrEditLabelName = 'Додати';
    this.setCreatOrEditor(true);
  }

  ngOnDestroy(): void {
    if (this.cSub) {
      this.cSub.unsubscribe();
    }
  }

}
