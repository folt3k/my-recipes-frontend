import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { MarkedConverter } from "../../common/components/marked-converter";
import { IngredientsCategory, Recipe } from "../add-recipe/add-recipe.types";
import { getRecipeDetails } from "./recipe-details.api";
import { AxiosError } from "axios";
import Loader from "../../common/components/loader.component";
import ConfirmationDialog from "../../common/components/confirmation-dialog.component";
import { removeRecipe } from "../recipe/recipe.api";

const RecipeDetails = () => {
  const [recipe, setRecipe] = useState<Recipe | null>();
  const [notFound, setNotFound] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [isDeleteConfirmationDialogOpen, setIsDeleteConfirmationDialogOpen] =
    useState<boolean>(false);
  const location = useLocation();
  const id = location.pathname.slice(9);
  const navigate = useNavigate();

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const resp = await getRecipeDetails(id);
      setRecipe(resp);
    } catch (err) {
      if ((err as AxiosError).response!.status === 404) {
        setNotFound(true);
      }
    }
    setLoading(false);
  };

  const showDeleteConfirmationDialog = () => {
    setIsDeleteConfirmationDialogOpen(true);
  };

  const handleDeleteConfirmationClose = async (confirmed: boolean) => {
    if (confirmed) {
      await removeRecipe(recipe!.id);
      setIsDeleteConfirmationDialogOpen(false);
      navigate("/");
    } else {
      setIsDeleteConfirmationDialogOpen(false);
    }
  };

  if (loading) {
    return <Loader />;
  }

  if (notFound) {
    return (
      <div className="container">
        <p>Nie znaleziono takiego przepisu.</p>
      </div>
    );
  }

  return (
    <>
      <div className="container">
        <div className="border-gray-light border-solid border-b">
          {!!recipe?.images.length && (
            <div
              className="w-full h-96 bg-no-repeat bg-cover bg-center rounded shadow-lg"
              style={{
                backgroundImage: `url(${process.env.REACT_APP_IMAGES_URL}${recipe?.images[0]?.name})`,
              }}
            />
          )}

          <div className="flex flex-col md:flex-row justify-between md:items-center">
            <div>
              <h2 className="text-primary600 font-semibold text-4xl uppercase pt-6 pb-3">
                {recipe?.name}
              </h2>
              <p className="pb-5 text-lg text-gray-dark">{recipe?.description}</p>
            </div>
            <div className="mb-4 flex">
              <div className="mr-2">
                <Button onClick={() => navigate(`/edit-recipe/${id}`)} variant="contained">
                  Edytuj
                </Button>
              </div>
              <div>
                <Button variant="outlined" onClick={showDeleteConfirmationDialog}>
                  Usuń
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-[1fr,2fr] gap-5 py-4">
          <div>
            <p className="uppercase text-lg font-extrabold mb-5">Składniki</p>
            <ul>
              {recipe?.ingredients.map((ingredient, index) => {
                if ((ingredient as IngredientsCategory).items) {
                  return (
                    <div key={index} className="mb-4">
                      <h1 className="font-extrabold text-center uppercase bg-gray py-2 mb-3">
                        {ingredient.name}
                      </h1>
                      <ul>
                        {(ingredient as IngredientsCategory).items.map((item, i) => (
                          <li
                            key={i}
                            className="py-1 leading-7 border-b border-dotted border-gray-light last:border-0"
                          >
                            {item.name}
                          </li>
                        ))}
                      </ul>
                    </div>
                  );
                } else {
                  return (
                    <li
                      key={index}
                      className="py-1 leading-7 border-b border-dotted border-gray-light last:border-0"
                    >
                      {ingredient.name}
                    </li>
                  );
                }
              })}
            </ul>
          </div>
          <div>
            <p className="uppercase text-lg font-extrabold mb-5">Przygotowanie</p>
            <div>{recipe && <MarkedConverter val={recipe?.content} />}</div>
          </div>
        </div>
      </div>
      <ConfirmationDialog
        title="Czy na pewno chcesz usunąć ten przepis?"
        message="Przywrócenie tego przepisu nie będzie już możliwe."
        open={isDeleteConfirmationDialogOpen}
        loadingWhenConfirm={true}
        onClose={handleDeleteConfirmationClose}
      />
    </>
  );
};

export default RecipeDetails;
