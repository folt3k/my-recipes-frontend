import { useEffect, useState } from "react";
import { useLocation, useNavigate, useNavigation } from "react-router-dom";
import {
  Ingredient,
  IngredientsCategory,
  Recipe,
} from "../add-recipe/add-recipe.types";
import { getRecipeDetails } from "../recipe-details/recipe-details.api";
import RecipeForm, { FormValues } from "../recipe-form/recipe-form.component";
import { editRecipe } from "./edit-recipe.api";

const EditRecipe = () => {
  const [initData, setInitData] = useState<Recipe>();
  const navigate = useNavigate();
  const location = useLocation();
  const id = location.pathname.slice(13);

  useEffect(() => {
    getInitData();
  }, []);

  const getInitData = async () => {
    const resp = await getRecipeDetails(id);
    console.log(resp);
    setInitData(resp);
  };

  const onSubmit = async (body: FormValues) => {
    const { content, name, ingredients, images, description, hasCategories } =
      body;
    let mappedIngredients: Ingredient[] | IngredientsCategory[];

    if (hasCategories) {
      mappedIngredients = ingredients;
    } else {
      mappedIngredients = ingredients[0].items.map(item => ({
        name: item.name,
      }));
    }
    await editRecipe(initData!.id, {
      content,
      name,
      description,
      images,
      ingredients: mappedIngredients,
      tags: [],
    });
    navigate(`/recipes/${initData!.id}`);
  };

  return <RecipeForm initData={initData && initData} onSubmit={onSubmit} />;
};

export default EditRecipe;
