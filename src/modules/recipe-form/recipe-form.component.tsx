import Button from "@mui/material/Button";
import { Controller, useForm } from "react-hook-form";
import { Checkbox, FormControlLabel } from "@mui/material";

import TextInput from "../../common/components/text-input";
import {
  IngredientsCategory,
  Recipe,
  UpsertImages,
} from "../add-recipe/add-recipe.types";
import ImagesForm from "./images-form/images-form.component";
import IngredientsForm from "./ingredient-form/ingredients-form.component";
import ContentForm from "./content-form/content-form.component";
import IngredientsWithCategoryForm from "./ingredients-with-category-form/ingredients-with-category-form.component";
import { useNavigate } from "react-router-dom";
import { ChangeEvent, useEffect } from "react";

export type FormValues = {
  name: string;
  description: string;
  category: string;
  ingredients: Array<IngredientsCategory>;
  images: UpsertImages;
  content: string;
  hasCategories: boolean;
  showMarkedText: boolean;
};

type Props = {
  onSubmit: (body: FormValues) => Promise<void>;
  initData?: Recipe;
};

const RecipeForm = ({ onSubmit, initData }: Props) => {
  const form = useForm<FormValues>({
    defaultValues: {
      hasCategories: false,
      ingredients: [{ name: "", items: [] }],
      images: { new: [], uploaded: [] },
    },
  });

  const contentWatch = form.watch("content");
  const hasCategoriesWatch = form.watch("hasCategories");
  const navigate = useNavigate();

  console.log(hasCategoriesWatch);

  useEffect(() => {
    console.log(initData);
    if (initData) {
      form.setValue("name", initData.name);
      form.setValue("description", initData.description);
      form.setValue("images", { new: [], uploaded: initData.images });
      form.setValue("ingredients", initData.ingredients);
      form.setValue("content", initData.content);
      form.setValue("hasCategories", initData.hasIngredientCategories);
    } else {
      form.reset();
    }
  }, [initData]);

  return (
    <div className='container'>
      <h2 className='text-primary600 text-3xl font-semibold mb-6'>
        Dodaj nowy przepis
      </h2>
      <form>
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
            <Controller
              name='hasCategories'
              control={form.control}
              render={({ field }) => (
                <FormControlLabel
                  control={
                    <Checkbox
                      onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        field.onChange(e.target.checked)
                      }
                      checked={field.value}
                    />
                  }
                  label='Podział na kategorie'
                />
              )}
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
      </form>
    </div>
  );
};

export default RecipeForm;
