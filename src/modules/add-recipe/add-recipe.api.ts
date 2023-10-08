import http from "../../common/api/http";
import {
  Recipe,
  UpsertRecipe,
} from "./add-recipe.types";

export const addRecipe = (body:UpsertRecipe): Promise<Recipe> => http.post("recipes", body).then(res => res.data);
