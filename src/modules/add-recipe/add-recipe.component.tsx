import { useNavigate } from "react-router-dom";
import RecipeForm from "../recipe-form/recipe-form.component";
import { addRecipe } from "./add-recipe.api";
import {
  IngredientsCategory,
  UpsertImages,
  UpsertRecipe,
} from "./add-recipe.types";

export type FormValues = {
  name: string;
  description: string;
  category: string;
  ingredients: Array<IngredientsCategory>;
  images: UpsertImages;
  content: string;
  hasCategories: boolean;
  showMarkedText: boolean;
};

const AddRecipe = () => {
  const navigate = useNavigate();

  const onSubmit = async (body: UpsertRecipe) => {
    const resp = await addRecipe(body);
    const recipeId = resp.id;
    navigate(`/recipes/${recipeId}`);
  };

  return <RecipeForm onSubmit={onSubmit} />;
};

export default AddRecipe;
