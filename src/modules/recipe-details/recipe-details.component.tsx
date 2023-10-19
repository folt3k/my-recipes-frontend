import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { MarkedConverter } from "../../common/components/marked-converter";
import { IngredientsCategory, Recipe } from "../add-recipe/add-recipe.types";
import { getRecipeDetails } from "./recipe-details.api";

const RecipeDetails = () => {
  const [recipe, setRecipe] = useState<Recipe>();
  const location = useLocation();
  const id = location.pathname.slice(9);
  const navigate = useNavigate();

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const resp = await getRecipeDetails(id);
    setRecipe(resp);
  };

  return (
    <div className="container">
      <div className="border-gray-light border-solid border-b">
        <div
          className="w-full h-96 bg-no-repeat bg-cover bg-center rounded shadow-lg"
          style={{
            backgroundImage: `url(${process.env.REACT_APP_IMAGES_URL}${recipe?.images[0]?.name})`,
          }}
        />
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
              <Button variant="outlined">Usuń</Button>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-[1fr,2fr] gap-5 py-4">
        <div>
          <p className="uppercase text-lg font-extrabold mb-5">Składniki</p>
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
                <ul>
                  <li
                    key={index}
                    className="py-1 leading-7 border-b border-dotted border-gray-light"
                  >
                    {ingredient.name}
                  </li>
                </ul>
              );
            }
          })}
        </div>
        <div>
          <p className="uppercase text-lg font-extrabold mb-5">Przygotowanie</p>
          <div>{recipe && <MarkedConverter val={recipe?.content} />}</div>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetails;
