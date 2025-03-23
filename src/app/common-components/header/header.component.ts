import { CommonModule, Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { UserService } from '../../../services/user-service/user.service';

@Component({
  selector: 'app-header',
  imports: [CommonModule, RouterLink, MatButtonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  isShowHeader = true;
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
      this.isShowHeader = !this.authRoutes.includes(this.currentPath);
      if (this.currentPath.startsWith('/dashboard')) {
        this.isShowHeader = false;
      }
    });
    const userDetails = this.user.getUserDetails();
    if (userDetails) {
      this.isLogin = true;
    }
  }

  navItems = [
    { name: 'Home', link: '/' },
    { name: 'About Us', link: '/about-us' },
    { name: 'Blogs', link: '/blogs' },
    { name: 'Contact Us', link: '/contact-us' },
  ];
}
