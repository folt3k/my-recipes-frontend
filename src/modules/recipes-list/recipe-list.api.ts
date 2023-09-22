import http from "../../common/api/http";
import { PaginationParams } from "../../common/types/pagination";
import { Recipe } from "../add-recipe/add-recipe.types";

export const getRecipes = (
  params: PaginationParams
): Promise<{ items: Recipe[]; page: number; perPage: number; total: number }> =>
  http.get("recipes", { params: { ...params } }).then(res => res.data);
