import http from "../../common/api/http";

export const getRecipeDetails = (id: string) =>
  http.get(`/recipes/${id}`).then(res => res.data);
