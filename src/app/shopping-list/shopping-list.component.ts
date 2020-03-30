import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import * as ShoppingListAction from "./store/shopping-list.action";
import { Ingredient } from '../shared/ingredient.model';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Observable<{ingredients: Ingredient[]}> ;
  private subscription: Subscription;

  constructor(
    private store: Store<fromApp.AppState>
    ) { }

  ngOnInit() {
    this.ingredients=this.store.select('shoppingList');
    //this.store.select('shoppingList')._subscribe();
  }

  onEditItem(index: number) {
   // this.slService.startedEditing.next(index);
   this.store.dispatch( new ShoppingListAction.StartEdit(index)) ;
  }

  ngOnDestroy() {
 
  }
}
