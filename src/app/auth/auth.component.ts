import { Component, OnInit, ComponentFactoryResolver, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
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
private closeSub: Subscription;
private storeSub: Subscription;

  constructor(private authService: AuthService, 
    private store:Store<fromApp.AppState>,
    private componentFactoryResolver:ComponentFactoryResolver,
    private router: Router) {}
     
    ngOnInit(){
      this.storeSub = this.store.select('auth').subscribe(authState =>{
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


    if (this.isLoginMode) {
     // authObs = this.authService.login(email, password);
      this.store.dispatch(new AuthActions.LoginStart({email: email, password: password}))
    } else {
      this.store.dispatch(new AuthActions.SignupStart({email: email, password: password}))
    }

    form.reset();
  }
  onHandleError() {
  this.store.dispatch(new AuthActions.ClearError())
  }
  ngOnDestroy() {
    if (this.closeSub){
      this.closeSub.unsubscribe();
    }
    if (this.storeSub) {
      this.storeSub.unsubscribe();
    }
  }
}
