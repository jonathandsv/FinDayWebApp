import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
  })
  export class LocalStorageLoginService {
    
    public getUser() {
        return JSON.parse(localStorage.getItem('eap.user') as string);
    }

    public saveUserLocalData(response: any) {
        this.saveUserToken(response.accessToken);
        this.saveUser(response.userToken);
    }

    public cleanUserLocalData() {
        localStorage.removeItem('eap.token');
        localStorage.removeItem('eap.user');
    }

    public getUserToken(): string {
        return localStorage.getItem('eap.token') as string;
    }

    public saveUserToken(token: string) {
        localStorage.setItem('eap.token', token);
    }

    public saveUser(user: string) {
        localStorage.setItem('eap.user', JSON.stringify(user));
    }

    public hasToken(): boolean {
      return !!this.getUserToken();
    }
  }