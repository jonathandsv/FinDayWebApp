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
  year: number = this.actualDate.getFullYear()

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
    let loginUser: LoginUser = { email: '', password: ''};
    loginUser = Object.assign({}, loginUser, this.form.value);
    // this.loading = true;
    this.accountService.login(loginUser)
    .subscribe({
      next: (resp) => this.processSuccess(resp),
      error: (error) => this.processFail(error),
    });
  }

  signIn(): void {
    
  }

  processSuccess(response: any) {
    this.form.reset;
    
    this.localStorageLoginService.saveUserLocalData(response.data);
    // const toast = this.toastr.success('Login realizado com Sucesso!', 'Bem vindo!!!');
    this.router.navigate(['/launch']);
    // if (toast) {
    //   toast.onHidden.subscribe(() => {
    //     this.loading = false;
    //     this.returnUrl
    //     ? this.router.navigate([this.returnUrl])
    //     : this.router.navigate(['/home']);
    //   })
    // }
  }

  processFail(fail: any) {
    // this.errors = fail.error.errors;
    // this.toastr.error('Ocorreu um erro!', 'Opa :(');
    // this.loading = false;
  }

}