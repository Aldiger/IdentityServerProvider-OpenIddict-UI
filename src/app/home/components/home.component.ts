import { ResourceInfo } from './../models/resource-info.model';
import { HttpWrapperService } from './../../shared/services/httpWrapper.service';
import { Component, isDevMode } from '@angular/core';

import { UserService } from '../../shared';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'tw-home',
  templateUrl: './home.component.html'
})
export class HomeComponent {
  public API_SERVICE = environment.apiUrl;

  public privateInfo: ResourceInfo;
  public publicInfo: ResourceInfo;

  public get isAuthenticated(): boolean {
    return this.user.isAuthenticated;
  }

  public get isAdmin(): boolean {
    return this.user.hasClaim('superadmin');
  }

  public get userName(): string {
    return this.user.userName;
  }

  public constructor(
    private user: UserService,
    private http: HttpWrapperService
  ) { }

  public openProfile(): void {
    window.location.replace( environment.apiUrl + '/account/manage'
    );
  }

  public loadData() {
    this.loadPrivateData();
    this.loadPublicData();
  }

  private loadPrivateData(): void {
    const endpoint = `${this.API_SERVICE}/api/resource/private`;
    this.http.getRaw<ResourceInfo>(endpoint)
      .subscribe((result: ResourceInfo) => {
        this.privateInfo = result;
      });
  }

  private loadPublicData(): void {
    const endpoint = `${this.API_SERVICE}/api/resource/public`;
    this.http.getRaw<ResourceInfo>(endpoint)
      .subscribe((result: ResourceInfo) => {
        this.publicInfo = result;
      });
  }
}
