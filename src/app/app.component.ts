import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './common-components/header/header.component';
import { FooterComponent } from './common-components/footer/footer.component';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { UserService } from '../services/user-service/user.service';
import { BackendService } from '../services/backend-service.service';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    HeaderComponent,
    FooterComponent,
    MatButtonModule,
    CommonModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  isLoading: boolean = false;
  constructor(private user: UserService) {}

  async ngOnInit() {
    const getUserDetails = async () => this.user.init();
    this.isLoading = true;
    await getUserDetails();
    this.isLoading = false;
  }

  title = 'angular-material-app';
}
