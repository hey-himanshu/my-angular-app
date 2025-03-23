import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import axios from 'axios';
import { ToastrService } from 'ngx-toastr';
import { BackendService } from '../../services/backend-service.service';
import { UserService } from '../../services/user-service/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  imports: [ReactiveFormsModule, CommonModule],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup = new FormGroup({
    email: new FormControl(),
    password: new FormControl(),
  });
  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private BackendService: BackendService,
    private userService: UserService,
    private route: Router
  ) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      password: ['', Validators.required],
      email: ['', Validators.email],
    });
  }
  onSubmit(form: FormGroup) {
    const obj = {
      password: form.value.password,
      email: form.value.email,
    };
    this.BackendService.postMethod('/users/login', obj).subscribe({
      next: (resp) => {
        if (resp?.status === 'error') {
          this.toastr.error(resp?.message);
          return;
        }
        this.userService.setUserDetails(resp?.data);
        this.toastr.success(resp?.message);
        window.localStorage.setItem('accessToken', resp?.accessToken);
        this.route.navigate(['']);
      },
      error: (error) => {
        this.toastr.error(error?.message);
      },
    });
  }
}
