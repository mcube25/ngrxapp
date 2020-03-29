import { Ingredient } from '../../shared/ingredient.model';
import * as ShoppingListActions from './shopping-list.action';

export interface Appstate {
shoppingList: State;


}


export interface State {
    ingredients: Ingredient[];
    editedIngredient: Ingredient;
     editedIngredientIndex: number;
}


const initialState: State = {
  ingredients: [new Ingredient('Apples', 5), new Ingredient('Tomatoes', 10)],
  editedIngredient: null,
  editedIngredientIndex: -1
};

export function shoppingListReducer(
  state: State = initialState,
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
             ingredients: state.ingredients.filter    ((ig , igIndex) =>{
             return igIndex !== action.payload;
             })
              };
              case ShoppingListActions.START_EDIT:
                  return {
                      ...state,
                      editedIngredientIndex: action.payload,
                      editedIngredient: {...state.ingredients[action.payload]}
                  };
                  case ShoppingListActions.STOP_EDIT:
                      return {
                         ...state,
                         editedIngredientIndex: null,
                         editedIngredient: -1
                      };
    default:
      return state;
  }
}
