import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

import { getRecipes } from "./recipe-list.api";
import { Recipe } from "../add-recipe-form/add-recipe.types";
import RecipeCart from "./recipe-cart/recipe-cart.component";

const RecipesList = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);

  useEffect(() => {
    getData();
  }, []);

  const getData = async (scroll?: boolean) => {
    const resp = await getRecipes({ page, perPage: 12 });

    const newRecipes = scroll ? [...recipes, ...resp.items] : resp.items;
    setRecipes(newRecipes);
    setHasMore(recipes.length !== resp.total);
    setPage(resp.page + 1);
    console.log(resp);
  };
  return (
    <InfiniteScroll
      className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 py-5'
      next={() => {
        getData(true);
      }}
      dataLength={recipes.length}
      hasMore={hasMore}
      loader={<p>Ładowanie...</p>}>
      {recipes?.map(recipe => (
        <div key={recipe.id}>
          <RecipeCart
            name={recipe.name}
            imageUrl={recipe.images[0].url}
            id={recipe.id}
          />
        </div>
      ))}
    </InfiniteScroll>
  );
};

export default RecipesList;
