import { useNavigate } from "react-router-dom";
import RecipeForm from "../recipe-form/recipe-form.component";
import { addRecipe } from "./add-recipe.api";
import { IngredientsCategory, Ingredient, UpsertImages } from "./add-recipe.types";

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

  const onSubmit = async (body: FormValues) => {
    const { content, name, ingredients, images, description, hasCategories } =
      body;
    let mappedIngredients: Ingredient[] | IngredientsCategory[];

    if (hasCategories) {
      mappedIngredients = ingredients;
    } else {
      mappedIngredients = ingredients
        .map(ingredient =>
          ingredient.items.map(item => ({
            name: item.name,
          }))
        )
        .flat();
    }

    const resp = await addRecipe({
      content,
      name,
      description,
      images,
      ingredients: mappedIngredients,
      tags: [], 
    });
    const recipeId = resp.id;
    navigate(`/recipes/${recipeId}`);
  };

  return <RecipeForm onSubmit={onSubmit} />;
};

export default AddRecipe;
