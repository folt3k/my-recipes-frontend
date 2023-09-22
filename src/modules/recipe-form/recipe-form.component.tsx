import { ThemeProvider } from "@emotion/react";
import Button from "@mui/material/Button";
import { useForm } from "react-hook-form";
import { Checkbox, FormControlLabel } from "@mui/material";

import TextInput from "../../common/components/text-input";
import { theme } from "../../common/utils/theme-for-provider";
import { IngredientsCategory } from "../add-recipe/add-recipe.types";
import ImagesForm from "./images-form/images-form.component";
import IngredientsForm from "./ingredient-form/ingredients-form.component";
import ContentForm from "./content-form/content-form.component";
import IngredientsWithCategoryForm from "./ingredients-with-category-form/ingredients-with-category-form.component";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export type FormValues = {
  name: string;
  description: string;
  category: string;
  ingredients: Array<IngredientsCategory>;
  images: Array<{ url: string }>;
  content: string;
  hasCategories: boolean;
  showMarkedText: boolean;
};

type Props = {
  onSubmit: (body: FormValues) => Promise<void>;
  initData?: FormValues | undefined;
};

const RecipeForm = ({ onSubmit, initData }: Props) => {
  const form = useForm<FormValues>({
    defaultValues: {
      hasCategories: false,
      ingredients: [{ name: "", items: [] }],
      images: [{ url: "" }],
    },
  });

  const contentWatch = form.watch("content");
  const hasCategoriesWatch = form.watch("hasCategories");
  const navigate = useNavigate();

  useEffect(() => {
    if (initData) {
      form.setValue("name", initData.name);
      form.setValue("description", initData.description);
      form.setValue("images", initData.images);
      form.setValue("ingredients", initData.ingredients);
      form.setValue("content", initData.content);
      form.setValue("hasCategories", initData.hasCategories);
    } else {
      form.reset();
    }
  }, []);

  return (
    <div className='container py-6'>
      <h2 className='text-primary600 text-3xl font-bold mb-5 text-center'>
        Dodaj nowy przepis
      </h2>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <ThemeProvider theme={theme}>
          <div className='form-section'>
            <h2 className='form-section-title'>Podstawowe informacje </h2>
            <div className='form-control'>
              <TextInput
                name='name'
                control={form.control}
                rules={{ required: true }}
                label='Wpisz nazwę przepisu'
              />
            </div>
            <div className='form-control'>
              <TextInput
                name='description'
                control={form.control}
                rules={{ required: false }}
                label='Wpisz krótki opis przepisu'
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
              <Button
                onClick={() => {
                  navigate("/");
                }}
                variant='outlined'>
                Anuluj
              </Button>
            </div>
          </div>
        </ThemeProvider>
      </form>
    </div>
  );
};

export default RecipeForm;
