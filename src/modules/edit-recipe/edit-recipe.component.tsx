import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Recipe } from "../add-recipe/add-recipe.types";
import { getRecipeDetails } from "../recipe-details/recipe-details.api";
import RecipeForm, { FormValues } from "../recipe-form/recipe-form.component";

const EditRecipe = () => {
  const [initData, setInitData] = useState<FormValues>();
  const location = useLocation();
  const id = location.pathname.slice(13);

  useEffect(() => {
    getInitData();
  }, []);

  const getInitData = async () => {
    let hasCategory = false;
    const resp = await getRecipeDetails(id);
    resp.ingredients.map(ingredient => {
      if (ingredient.items) {
        return (hasCategory = true);
      }
    });
    const { name, content, description, images, ingredients } = resp;
    const imgs = images.map(image => ({ url: image.base64 }));
    setInitData({
      name,
      content,
      description,
      images: imgs,
      hasCategories: hasCategory,
      ingredients,
      category: "ingredients.map(ingredient => ingredient.name),",
      showMarkedText: true,
    });
  };

  const onSubmit = () => {};

  return (
    <RecipeForm
      initData={initData && initData}
      onSubmit={function (body: FormValues): Promise<void> {
        throw new Error("Function not implemented.");
      }}
    />
  );
};

export default EditRecipe;
