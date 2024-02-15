import { Component } from '@angular/core';
import { FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { LocalStorageLoginService } from '../../../services/localstorage/localstorage-login.service';
import { LoginUser } from '../models/login-user.interface';
import { AccountService } from '../services/account.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  form!: FormGroup
  actualDate = new Date;
  year: number = this.actualDate.getFullYear();
  loading: boolean = false;


  constructor(private fb: NonNullableFormBuilder,
    public router: Router,
    public activatedRoute: ActivatedRoute,
    private accountService: AccountService,
    private localStorageLoginService: LocalStorageLoginService) {
    this.form = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  action(): void {
    if (this.form.invalid)
      return
    
    let loginUser: LoginUser = { email: '', password: ''};
    loginUser = Object.assign({}, loginUser, this.form.value);
    this.loading = true;
    this.accountService.login(loginUser)
    .subscribe({
      next: (resp) => this.processSuccess(resp),
      error: (error) => this.processFail(error),
    });
  }

  signIn(): void {
    
  }

  processSuccess(response: any) {
    this.loading = false;
    this.form.reset;
    
    this.localStorageLoginService.saveUserLocalData(response.data);
    this.router.navigate(['/launch']);
  }

  processFail(fail: any) {
    this.loading = false;
  }
}