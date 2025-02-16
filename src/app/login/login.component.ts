import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {FormControl,FormGroup,FormBuilder, Validators, ReactiveFormsModule} from '@angular/forms';
import axios from 'axios';
import { ToastrService } from 'ngx-toastr';
import { BackendService } from '../../services/backend-service.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  imports:[ReactiveFormsModule,CommonModule]
})
export class LoginComponent implements OnInit{
  loginForm :FormGroup= new FormGroup({
    email:new FormControl(),
    password:new FormControl(),
  });
  constructor(private fb: FormBuilder,private toastr :ToastrService,private BackendService:BackendService) {}
  ngOnInit() {
    this.loginForm = this.fb.group({
      password:  ['', Validators.required],
      email:  ['', Validators.email],
    });
  }
  onSubmit(form: FormGroup) {
    console.log(this.loginForm,'login from')
    console.log(form,' from')
    console.log('Valid?', form.valid);
    console.log('Name', form.value.password);
    console.log('Email', form.value.email);
    const obj = {
      password:form.value.password,
      email:form.value.email,
    }
    this.BackendService.postMethod('/users/login', obj).subscribe({
      next: (resp) => {
        if(resp?.status==='error'){
          this.toastr.error(resp?.message);
          return;
        }
        this.toastr.success(resp?.message);
        window.localStorage.setItem('accessToken',resp?.accessToken)
      },
      error: (error) => {
        this.toastr.error(error?.message);
      }
    });
  }
}
