import http from "../../common/api/http";

export const removeRecipe = (recipeId: string): Promise<void> => http.delete(`recipes/${recipeId}`);
