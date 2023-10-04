import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Recipe } from "../add-recipe/add-recipe.types";
import { getRecipeDetails } from "../recipe-details/recipe-details.api";
import RecipeForm, { FormValues } from "../recipe-form/recipe-form.component";

const EditRecipe = () => {
  const [initData, setInitData] = useState<Recipe>();
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
