import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AuthService} from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  constructor(
    private http: HttpClient,
  ) { }


  getAccountSettings() {
    return this.http.get('http://localhost:3000/api/settings')
  }
}
