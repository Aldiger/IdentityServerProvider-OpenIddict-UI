import { Application } from './application.model';


export interface ApplicationDetail {
  application: Application;
  claims: Array<string>;
}
