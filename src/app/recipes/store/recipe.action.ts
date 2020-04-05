import { Action } from '@ngrx/store';
import { Recipe } from '../recipe.model';


export const SET_RECIPES = 'SET_RECIPES';
export const FETCH_RECIPES = 'FETCH_RECIPES';
export const ADD_RECIPE = 'ADD_RECIPE';
export const UPDATE_RECIPE = 'UPDATE_RECIPE';
export const DELETE_RECIPE = 'DELETE_RECIPE';


export class setRecipes implements Action {
    readonly type = SET_RECIPES;
    constructor (public payload: Recipe[]){
        
    }
   
}
export class addRecipe implements Action {
    readonly type = ADD_RECIPE;
    constructor(public payload: Recipe){}
}

export class updateRecipe implements Action {
    readonly type = UPDATE_RECIPE;
    constructor(public payload: {index: number, newRecipe: Recipe}){}
}

export class deleteRecipe implements Action {
    readonly type = DELETE_RECIPE;
    constructor(public payload: number){}
}
export class fetchRecipes implements Action {
    readonly type = FETCH_RECIPES;
}

export type RecipesAction =
 setRecipes
 | fetchRecipes
 | addRecipe
 | updateRecipe
 | deleteRecipe
;