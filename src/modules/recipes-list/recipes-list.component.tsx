import { useCallback, useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

import { getRecipes } from "./recipe-list.api";
import { Recipe } from "../add-recipe/add-recipe.types";
import RecipeCart from "./recipe-cart/recipe-cart.component";
import { InputAdornment } from "@mui/material";
import { useForm } from "react-hook-form";
import TextInput from "../../common/components/text-input";
import { Search } from "@mui/icons-material";
import Loader from "../../common/components/loader.component";
import debounce from "lodash.debounce";

type FiltersFormValues = {
  q: string;
};

const RecipesList = () => {
  const form = useForm<FiltersFormValues>({
    defaultValues: {
      q: "",
    },
  });
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);

  useEffect(() => {
    getData(false);
  }, []);

  useEffect(() => {
    const subscription = form.watch(() => {
      form.handleSubmit(debouncedFiltersChangeHandler)();
    });

    return () => subscription.unsubscribe();
  }, [form.handleSubmit, form.watch]);

  const getData = async (scroll?: boolean) => {
    const resp = await getRecipes({ page, perPage: 12, ...form.getValues() });

    const newRecipes = scroll ? [...recipes, ...resp.items] : resp.items;
    setRecipes(newRecipes);
    setHasMore(recipes.length !== resp.total);
    setPage(resp.page + 1);
  };

  const onFiltersChange = () => {
    setPage(1);
    getData(false);
  };

  const debouncedFiltersChangeHandler = useCallback(debounce(onFiltersChange, 500), []);

  return (
    <div>
      <div className="py-3 bg-gray-lighter">
        <div className="container">
          <div className="flex md:flex-row justify-between items-center">
            <div className="w-full md:w-1/2">
              <TextInput
                name="q"
                control={form.control}
                rules={{ required: false }}
                label="Wyszukaj przepis"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search />
                    </InputAdornment>
                  ),
                }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <InfiniteScroll
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 py-5"
          next={() => {
            getData(true);
          }}
          dataLength={recipes.length}
          hasMore={hasMore}
          loader={<Loader />}
        >
          {recipes?.map((recipe) => (
            <div key={recipe.id}>
              <RecipeCart
                name={recipe.name}
                imageUrl={recipe.images[0]?.name}
                id={recipe.id}
                description={recipe.description}
              />
            </div>
          ))}
        </InfiniteScroll>
      </div>
    </div>
  );
};

export default RecipesList;
