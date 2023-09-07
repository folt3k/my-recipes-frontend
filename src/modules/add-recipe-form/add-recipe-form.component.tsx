import { ThemeProvider } from "@emotion/react";
import Button from "@mui/material/Button";
import { useForm, useFieldArray } from "react-hook-form";
import { useState } from "react";

import TextInput from "../../common/components/text-input";
import { theme } from "../../common/utils/theme-for-provider";
import { MarkedConverter } from "../../common/components/marked-converter";
import AutoSizeTextInput from "../../common/components/auto-size-textarea.component";
import { Checkbox, FormControlLabel, IconButton } from "@mui/material";
import IngredientsWithCategoryForm from "./ingredients-with-category-form/ingredients-with-category-form.component";

type IngredientWithoutCategory = {
  name: string;
};

type IngredientsWithCategory = {
  name: string;
  items: IngredientWithoutCategory[];
};

export type FormValues = {
  name: string;
  category: string;
  ingredients: Array<IngredientsWithCategory | IngredientWithoutCategory>;
  content: string;
};

const AddRecipeForm = () => {
  const [ingredients, setIngredients] = useState<IngredientWithoutCategory[]>(
    []
  );
  const [ingredientWithCategory, setIngredientsWithCategory] =
    useState<boolean>(false);
  const form = useForm<FormValues>({
    defaultValues: {
      ingredients: [{ name: "", items: [] }],
    },
  });
  const contentToMarked = form.watch("content");

  // const { fields, append, remove } = useFieldArray({
  //   name: "ingredients.items",
  //   control: form.control,
  // });

  const onSubmit = (body: FormValues) => {
    console.log(body);
  };

  return (
    <div className='container py-6'>
      <h2 className='text-primary600 text-2xl font-bold pb-2 text-center'>
        Dodaj nowy przepis
      </h2>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <ThemeProvider theme={theme}>
          <TextInput
            name='name'
            control={form.control}
            rules={{ required: true }}
            label='Nazwa przepisu'
          />
          <div className='flex-col'>
            <h2 className='text-lg text-primary600 text-center mb-2'>
              Dodaj składniki niezbędne do przygotowania przepisu
            </h2>
            <FormControlLabel
              control={
                <Checkbox
                  checked={ingredientWithCategory}
                  onClick={() => setIngredientsWithCategory(prev => !prev)}
                />
              }
              label='Składniki z podziałem na kategorie'
            />
            <IngredientsWithCategoryForm form={form} />
          </div>
          <div className='grid grid-cols-2 grid-rows-1 gap-x-2 h-auto'>
            <AutoSizeTextInput
              name='content'
              control={form.control}
              rules={{
                validate: undefined,
              }}
              label='Spsób przygotowania'
            />
            <div className='pt-5'>
              <MarkedConverter val={contentToMarked} />
            </div>
          </div>
          <div className='flex pt-3'>
            <div className='mr-2'>
              <Button
                variant='contained'
                onClick={() => {
                  form.handleSubmit(onSubmit)();
                }}>
                Zapisz
              </Button>
            </div>
            <div>
              <Button variant='outlined'>Anuluj</Button>
            </div>
          </div>
        </ThemeProvider>
      </form>
    </div>
  );
};

export default AddRecipeForm;
