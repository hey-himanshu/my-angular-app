import { CommonModule, Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-header',
  imports: [CommonModule,RouterLink,MatButtonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit{
  isShowHeader = true;
  authRoutes:string[] = ['/login','sign-out','sign-in','forgot-password','verify-otp']
  currentPath: string ='';
  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}
  ngOnInit() {
    this.router.events.subscribe(() => {
      this.currentPath = this.router.url;
      console.log(this.currentPath);
    this.isShowHeader =  !this.authRoutes.includes(this.currentPath)
    });
  }

  navItems=[{name:'Home',link:'/'},{name:'About Us',link:'/about-us'},{name:'Blogs',link:'/blogs'},{name:'Contact Us',link:'/contact-us'}]
}
