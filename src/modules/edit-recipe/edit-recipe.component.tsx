import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Recipe, UpsertRecipe } from "../add-recipe/add-recipe.types";
import { getRecipeDetails } from "../recipe-details/recipe-details.api";
import RecipeForm from "../recipe-form/recipe-form.component";
import { editRecipe } from "./edit-recipe.api";
import { PageLayout } from "../../common/components/layout/page.component";

const EditRecipe = () => {
  const [initData, setInitData] = useState<Recipe>();
  const navigate = useNavigate();
  const id = useParams().recipeId!;

  useEffect(() => {
    getInitData();
  }, []);

  const getInitData = async () => {
    const resp = await getRecipeDetails(id);
    setInitData(resp);
  };

  const onSubmit = async (body: UpsertRecipe) => {
    await editRecipe(initData!.id, body);
    navigate(`/recipes/${initData!.id}`);
  };

  return (
    <PageLayout>
      <RecipeForm initData={initData && initData} onSubmit={onSubmit} />
    </PageLayout>
  );
};

export default EditRecipe;
