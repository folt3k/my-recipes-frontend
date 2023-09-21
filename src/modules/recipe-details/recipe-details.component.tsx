import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { MarkedConverter } from "../../common/components/marked-converter";
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
    <div className='container py-6'>
      <div className=' border-gray-light border-solid border-b'>
        <div
          className='w-full h-96 bg-no-repeat bg-cover bg-center rounded shadow-lg'
          style={{ backgroundImage: "url(" + recipe?.images[0].url + ")" }}
        />
        <h2 className='text-primary font-bold text-4xl uppercase py-6'>
          {recipe?.name}
        </h2>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-[1fr,2fr] gap-5 py-4'>
        <div className='markdown-wrapper'>
          <p className='uppercase text-xl font-bold'>Składniki</p>
          {recipe?.ingredients.map(ingredient => {
            if (ingredient.items) {
              return (
                <div>
                  <h1 className='my-3'>{ingredient.name}</h1>
                  {ingredient.items.map(item => (
                    <ul>
                      <li className='py-1 leading-7 border-b border-dotted border-dark-gray'>
                        {item.name}
                      </li>
                    </ul>
                  ))}
                </div>
              );
            } else {
              return <p>{ingredient.name}</p>;
            }
          })}
        </div>
        <div>
          <p className='uppercase text-xl font-bold pb-3'>Przygotowanie</p>
          {recipe && <MarkedConverter val={recipe?.content} />}
        </div>
      </div>
    </div>
  );
};

export default RecipeDetails;
