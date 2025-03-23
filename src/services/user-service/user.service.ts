import { Injectable } from '@angular/core';
import { BackendService } from '../backend-service.service';
import { Router } from '@angular/router';

interface UserDataInterface {
  first_name: string;
  last_name: string;
  email_address: string;
  phone_number: string;
  user_avatar: string;
  user_role: string;
  user_type: string;
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  userData: UserDataInterface | null = null;
  constructor(private BackendService: BackendService, private router: Router) {}

  init() {
    this.BackendService.getMethod('/users/me').subscribe({
      next: (resp) => {
        this.userData = resp?.user;
      },
      error: (error) => {
        window.localStorage.removeItem('accessToken');
      },
    });
  }

  getUserDetails() {
    return this.userData;
  }

  setUserDetails(data: UserDataInterface) {
    this.userData = data;
  }

  logOut() {
    window.localStorage.removeItem('accessToken');
    this.userData = null;
    this.router.navigate(['/']);
  }
}
