import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {SectionService} from "../../services/section.service";
import {AlertService} from "../../../shared/services/alert.service";
import {AuditoriumSection} from "../../../shared/interfaces";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-auditorium-section-editor',
  templateUrl: './auditorium-section-editor.component.html',
  styleUrls: ['./auditorium-section-editor.component.css']
})

export class AuditoriumSectionEditorComponent implements OnInit, OnChanges, OnDestroy {

  @Input() section: AuditoriumSection | undefined = undefined;
  @Output() hideEditor: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() newSection: EventEmitter<AuditoriumSection> = new EventEmitter<AuditoriumSection>();
  // @ts-ignore
  sectionForm: FormGroup;

  showSectionForm = false;
  submitted = false;

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

  // @ts-ignore
  @ViewChild('sectionName') sectionName: ElementRef<HTMLInputElement>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private sectionService: SectionService,
    private alert: AlertService
  ) {
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (typeof this.section !== 'undefined') {
      this.setCreatOrEditor(false);
      this.createOrEditLabelName = 'Змінити';
      this.sectionForm = this.createSectionForm(this.section);
      if (this.sectionForm) {
        setTimeout(() => this.sectionName.nativeElement.focus(), 0)
      }
    } else {
      this.sectionForm = this.createSectionForm(this.sectionService.initSection());
      this.createOrEditLabelName = 'Додати';
      if (this.sectionForm) {
        setTimeout(() => this.sectionName.nativeElement.focus(), 0)
      }
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
      if(typeof this.section !== 'undefined')
      createdSection['id'] = this.section.id;
      sectionServiceMethod = this.sectionService.updateSection(createdSection);
    }
    this.cSub = sectionServiceMethod
      .subscribe(
        dbSelectAndMessage => {
          this.alert.success(dbSelectAndMessage.message);
          this.hideEditor.emit(false);
          this.newSection.emit(dbSelectAndMessage.section);
          this.resetSectionForm();
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

  resetSectionForm(): void {
    this.hideEditor.emit(false);
    this.sectionForm.reset();
    this.sectionForm.enable();
    this.submitted = false;
    this.showSectionForm = false;
    this.createOrEditLabelName = 'Додати';
    this.setCreatOrEditor(true);
    this.section = undefined;
  }

  ngOnDestroy(): void {
    if (this.cSub) {
      this.cSub.unsubscribe();
    }
  }

}
