import { RegisterApplication } from './register-application.model';
export interface Claim {
  type: string;
  value: string;
}
export interface Application extends RegisterApplication  {
  redirectUris: Array<string>;
  postLogoutRedirectUris: Array<string>;
  permissions: Array<string>;
  claims: Array<string>;
}
