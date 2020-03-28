import { Ingredient } from '../../shared/ingredient.model';
import * as ShoppingListActions from './shopping-list.action';

const initialState = {
  ingredients: [new Ingredient('Apples', 5), new Ingredient('Tomatoes', 10)]
};

export function shoppingListReducer(
  state = initialState,
  action: ShoppingListActions.ShoppingListActions
) {
  switch (action.type) {
    case ShoppingListActions.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: [...state.ingredients, action.payload]
      };
    case ShoppingListActions.ADD_INGREDIENTS:
      return {
        ...state,
        ingredients: [...state.ingredients, ...action.payload]
      };
      case  ShoppingListActions.UPDATE_INGREDIENT:
          const ingredient = state.ingredients[action.payload.index];
          const upDatedIngredient = {
              ...ingredient,
              ...action.payload.ingredient
          }
          const upDatedIngredients = [...state.ingredients];
          upDatedIngredients[action.payload.index] = upDatedIngredient;

          return {
              ...state,
              ingredients: upDatedIngredients
          };
          case  ShoppingListActions.DELETE_INGREDIENT:
                


              return {
             ...state,
             ingredients: state.ingredients.filter(ig , igIndex =>{
             return igIndex !== action.payload;
             })

              };
    default:
      return state;
  }
}
