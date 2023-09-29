import http from "../../common/api/http";
import { Recipe } from "../add-recipe/add-recipe.types";

export const getRecipeDetails = (id: string): Promise<Recipe> =>
  http.get(`/recipes/${id}`).then(res => res.data);
