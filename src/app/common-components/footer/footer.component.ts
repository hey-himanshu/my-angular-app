import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../../services/user-service/user.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  imports: [RouterLink, CommonModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {
  isShowFooter = true;
  isLogin = false;
  authRoutes: string[] = [
    '/login',
    'sign-out',
    'sign-in',
    'forgot-password',
    'verify-otp',
  ];

  currentPath: string = '';
  constructor(private router: Router, private user: UserService) {}
  ngOnInit() {
    this.router.events.subscribe(() => {
      this.currentPath = this.router.url;
      this.isShowFooter = !this.authRoutes.includes(this.currentPath);
      if (this.currentPath.startsWith('/dashboard')) {
        this.isShowFooter = false;
      }
    });
    const userDetails = this.user.getUserDetails();
    if (userDetails) {
      this.isLogin = true;
    }
  }
}
