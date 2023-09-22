import { Button, ThemeProvider } from "@mui/material";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { MarkedConverter } from "../../common/components/marked-converter";
import { theme } from "../../common/utils/theme-for-provider";
import { Recipe } from "../add-recipe-form/add-recipe.types";
import { getRecipeDetails } from "./recipe-details.api";

const RecipeDetails = () => {
  const [recipe, setRecipe] = useState<Recipe>();
  const location = useLocation();
  const id = location.pathname.slice(9);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const resp = await getRecipeDetails(id);
    setRecipe(resp);
  };

  return (
    <ThemeProvider theme={theme}>
      <div className='container py-6'>
        <div className=' border-gray-light border-solid border-b'>
          <div
            className='w-full h-96 bg-no-repeat bg-cover bg-center rounded shadow-lg'
            style={{
              backgroundImage: `url("${recipe?.images[0].base64}")`,
            }}
          />
          <div className='flex flex-col md:flex-row justify-between md:items-center'>
            <div>
              <h2 className='text-primary font-bold text-4xl uppercase pt-6 pb-3'>
                {recipe?.name}
              </h2>
              <p className='pb-5 text-lg text-primary600'>
                {recipe?.description}
              </p>
            </div>
            <div className='mb-4 flex'>
              <div className='mr-2'>
                <Button variant='outlined'>Edytuj</Button>
              </div>
              <div>
                <Button variant='outlined'>Usuń</Button>
              </div>
            </div>
          </div>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-[1fr,2fr] gap-5 py-4'>
          <div className='markdown-wrapper'>
            <p className='uppercase text-xl font-bold pb-3'>Składniki</p>
            {recipe?.ingredients.map(ingredient => {
              if (ingredient.items) {
                return (
                  <div>
                    <h1 className='my-3'>{ingredient.name}</h1>
                    <ul>
                      {ingredient.items.map(item => (
                        <li className='py-1 leading-7 border-b border-dotted border-gray-light'>
                          {item.name}
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              } else {
                return (
                  <ul>
                    <li className='py-1 leading-7 border-b border-dotted border-gray-light'>
                      {ingredient.name}
                    </li>
                  </ul>
                );
              }
            })}
          </div>
          <div>
            <p className='uppercase text-xl font-bold pb-3'>Przygotowanie</p>
            <div className='mt-[-15px]'>
              {recipe && <MarkedConverter val={recipe?.content} />}
            </div>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default RecipeDetails;
