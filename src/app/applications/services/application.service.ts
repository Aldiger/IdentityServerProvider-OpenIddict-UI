import { forkJoin, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { Injectable } from '@angular/core';

import { HttpWrapperService } from '../../shared/services/index';

import {
  Application,
  ApplicationOptions,
  RegisterApplication
} from '../models/index';
import { ClaimTypesService } from 'src/app/claimtypes/services';
import { ApplicationDetail } from '../models/application-detail.model';

@Injectable()
export class ApplicationService {
  public constructor(
    private http: HttpWrapperService,
    private claimsService: ClaimTypesService
  ) { }

  public applications(): Observable<Array<Application>> {
    return this.http
      .get<Array<Application>>('application')
      .pipe(catchError(this.http.handleError));
  }

  public options(): Observable<ApplicationOptions> {
    return this.http
      .get<ApplicationOptions>(`application/options`)
      .pipe(catchError(this.http.handleError));
  }

  public application(id: string): Observable<ApplicationDetail> {
    return forkJoin({
      application: this.http.get<Application>(`application/${id}`),
      claims: this.claimsService.claimtypes()
    })
      .pipe(map(info => {
        return {
          application: info.application,
          claims: info.claims.map(c => c.name)
        };
      }))
      .pipe(catchError(this.http.handleError));
  }

  public register(model: RegisterApplication): Observable<string> {
    model.id = undefined;
    return this.http
      .post<string>('application', model)
      .pipe(catchError(this.http.handleError));
  }

  public create(model: Application): Observable<string> {
    model.id = undefined;
    return this.http
      .post<string>('application', model)
      .pipe(catchError(this.http.handleError));
  }

  public update(model: Application): Observable<any> {
    return this.http
      .put<Application>('application', model)
      .pipe(catchError(this.http.handleError));
  }

  public delete(id: string): Observable<any> {
    return this.http
      .delete<any>(`application/${id}`)
      .pipe(catchError(this.http.handleError));
  }
}
