import http from "../../common/api/http";
import {
  Image,
  Ingredient,
  IngredientsCategory,
  Recipe,
} from "./add-recipe.types";

export const addRecipe = (body: {
  name: string;
  description: string;
  content: string;
  ingredients: Array<IngredientsCategory | Ingredient>;
  images: Array<{ url: string }>;
  tags: any[];
}): Promise<Recipe> => http.post("recipes", body).then(res => res.data);
