import { environment } from "./src/environments/environment";  
const PROXY_CONFIG = [
  {
    context: [
      "/api"
    ],
    target: environment.apiUrl,
    secure: false
  }
]

module.exports = PROXY_CONFIG;
