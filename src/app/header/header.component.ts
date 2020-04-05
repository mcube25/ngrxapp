import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import * as fromApp from '../store/app.reducer';
import { Store } from '@ngrx/store';
import {map} from 'rxjs/operators';
import * as AuthActions from '../auth/store/auth.action';
import * as RecipeActions from  '../recipes/store/recipe.action';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAuthenticated = false;
  private userSub: Subscription;

  constructor(
  
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit() {
    this.userSub = this.store.select('auth').pipe(map(authState=>{
   return authState.user
    })).subscribe(user => {
      this.isAuthenticated = !!user;
      console.log(!!user);
      console.log(!!user);
    });
  }

  onSaveData() {
   // this.dataStorageService.storeRecipes();
   this.store.dispatch(new RecipeActions.storeRecipes())
  }

  onFetchData() {
   // this.dataStorageService.fetchRecipes().subscribe();
   this.store.dispatch(new RecipeActions.fetchRecipes);
  }

  onLogout() {
    this.store.dispatch(new AuthActions.Logout());
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }
}
