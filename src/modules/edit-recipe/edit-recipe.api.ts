import http from "../../common/api/http";
import { Recipe, UpsertRecipe } from "../add-recipe/add-recipe.types";

export const editRecipe = (
  recipeId: string,
  body: UpsertRecipe
): Promise<Recipe> =>
  http.put(`recipes/${recipeId}`, { ...body, tags: [] }).then(res => res.data);
