import { Component, OnInit, ComponentFactoryResolver, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import * as fromApp from '../store/app.reducer';
import * as AuthActions from './store/auth.action';
import { AuthService, AuthResponseData } from './auth.service';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html'
})
export class AuthComponent implements OnDestroy, OnInit{
  isLoginMode = true;
  isLoading = false;
  error: string = null;

  constructor(private authService: AuthService, 
    private store:Store<fromApp.AppState>,
    private componentFactoryResolver:ComponentFactoryResolver,
    private router: Router) {}
     
    ngOnInit(){
      this.store.select('auth').subscribe(authState =>{
       this.isLoading = authState.loading;
       this.error = authState.authEror;
       if (this.error){
         this.showErrorAlert(this.error)
       }
      })
    }
  showErrorAlert(error: string) {
    throw new Error("Method not implemented.");
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const email = form.value.email;
    const password = form.value.password;

    let authObs: Observable<AuthResponseData>;

    this.isLoading = true;

    if (this.isLoginMode) {
     // authObs = this.authService.login(email, password);
      this.store.dispatch(new AuthActions.LoginStart({email: email, password: password}))
    } else {
      authObs = this.authService.signup(email, password);
    }
   
   /* authObs.subscribe(
      resData => {
        console.log(resData);
        this.isLoading = false;
        this.router.navigate(['/recipes']);
      },
      errorMessage => {
        console.log(errorMessage);
        this.error = errorMessage;
        this.isLoading = false;
      }
    );*/

    form.reset();
  }
  onHandleError() {
    this.error = null;
  }
  ngOnDestroy() {
    
  }
}
