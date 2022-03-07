import {Injectable} from '@angular/core';
import {AuditoriumSection} from "../../shared/interfaces";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Observable, Subject, throwError} from "rxjs";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})

export class SectionService {

  public error$: Subject<string> = new Subject<string>();

  section: AuditoriumSection | undefined = undefined;

  constructor(
    private http: HttpClient
  ) { }

  createSection(section: AuditoriumSection): Observable<{ section: AuditoriumSection, message: string }> {
    return this.http.post<{ section: AuditoriumSection, message: string }>(`${environment.dbUrl}/section/create`, section);
  }

  updateSection(section: AuditoriumSection): Observable<{ section: AuditoriumSection, message: string }> {
    return this.http.patch<{ section: AuditoriumSection, message: string }>(`${environment.dbUrl}/section/${section.id}`, section);
  }

  deleteSection(id: number): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${environment.dbUrl}/section/${id}`);
  }

  getSectionByID(id: number): Observable<AuditoriumSection> {
    return this.http.get<AuditoriumSection>(`${environment.dbUrl}/section/${id}`)
  }

  getAllSections(): Observable<Array<AuditoriumSection>> {
    return this.http.get<Array<AuditoriumSection>>(`${environment.dbUrl}/section`);
  }

  getSectionNames(): Observable<Array<string>> {
    return this.http.get<Array<string>>(`${environment.dbUrl}/section/sectionNames`)
  }
  public errorHandle(error: HttpErrorResponse): any {
    const message = error.error.message;
    if (message) {
      switch (message) {
        case('INVALID_PASSWORD'):
          this.error$.next('невірний пароль');
          break;
        case('EMAIL_NOT_FOUND'):
          this.error$.next('емейл не знайдено');
          break;
        case('повторювані значення ключа порушують обмеження унікальності \"auditoriumSection_sectionName_key5\"'):
          this.error$.next('Така частина глядацького залу вже існує в базі даних');
          break;
      }
    }
    return throwError(error);
  }

  initSection(): AuditoriumSection {
    return {
      sectionName: ''
    }
  }
}
