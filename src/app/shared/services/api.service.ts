import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = environment.apiUrl + '/api';

  public createRawUrl(endpoint: string): string {
    return `${endpoint}`;
  }

  public createApiUrl(endpoint: string): string {
    return `${this.baseUrl}/${endpoint}`;
  }
}
