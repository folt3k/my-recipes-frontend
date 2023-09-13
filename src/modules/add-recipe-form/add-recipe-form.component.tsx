import { ThemeProvider } from "@emotion/react";
import Button from "@mui/material/Button";
import { useForm } from "react-hook-form";
import { Checkbox, FormControlLabel } from "@mui/material";

import TextInput from "../../common/components/text-input";
import { theme } from "../../common/utils/theme-for-provider";
import IngredientsWithCategoryForm from "./ingredients-with-category-form/ingredients-with-category-form.component";
import IngredientsForm from "./ingredient-form/ingredients-form.component";
import ContentForm from "./content-form/content-form.component";
import ImagesForm from "./images-form/images-form.component";

export type Ingredient = {
  name: string;
};

export type IngredientsCategory = {
  name: string;
  items: Ingredient[];
};

export type Image = {
  url: string;
};

export type FormValues = {
  name: string;
  category: string;
  ingredients: Array<IngredientsCategory>;
  images: Array<Image>;
  content: string;
  hasCategories: boolean;
  showMarkedText: boolean;
};

const AddRecipeForm = () => {
  const form = useForm<FormValues>({
    defaultValues: {
      hasCategories: false,
      ingredients: [{ name: "", items: [] }],
      images: [{ url: "" }],
    },
  });
  const contentWatch = form.watch("content");
  const hasCategoriesWatch = form.watch("hasCategories");

  const onSubmit = (body: FormValues) => {
    console.log(body);
  };

  return (
    <div className='container py-6'>
      <h2 className='text-primary600 text-3xl font-bold mb-5 text-center'>
        Dodaj nowy przepis
      </h2>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <ThemeProvider theme={theme}>
          <div className='form-section'>
            <h2 className='form-section-title'>Nazwa </h2>
            <div className='form-control'>
              <TextInput
                name='name'
                control={form.control}
                rules={{ required: true }}
                label='Wpisz nazwę przepisu'
              />
            </div>
          </div>
          <ImagesForm form={form} />
          <div className='flex-col form-section'>
            <h2 className='form-section-title'>Składniki</h2>
            <div className='mb-4'>
              <FormControlLabel
                control={<Checkbox {...form.register("hasCategories")} />}
                label='Podział na kategorie'
              />
            </div>
            {hasCategoriesWatch ? (
              <IngredientsWithCategoryForm form={form} />
            ) : (
              <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
                <div className='p-4 bg-gray-lighter rounded-lg'>
                  <IngredientsForm form={form} categoryIndex={0} />
                </div>
              </div>
            )}
          </div>
          <ContentForm form={form} contentWatch={contentWatch} />
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
