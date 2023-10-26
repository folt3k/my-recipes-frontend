import Button from "@mui/material/Button";
import { Controller, useForm } from "react-hook-form";
import { Checkbox, FormControlLabel } from "@mui/material";

import TextInput from "../../common/components/text-input";
import {
  IngredientsCategory,
  Recipe,
  UpsertImages,
  UpsertRecipe,
} from "../add-recipe/add-recipe.types";
import ImagesForm from "./images-form/images-form.component";
import IngredientsForm from "./ingredient-form/ingredients-form.component";
import ContentForm from "./content-form/content-form.component";
import IngredientsWithCategoryForm from "./ingredients-with-category-form/ingredients-with-category-form.component";
import { useNavigate } from "react-router-dom";
import { ChangeEvent, useEffect } from "react";
import { usePrompt } from "../../common/hooks/prompt";

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
  onSubmit: (body: UpsertRecipe) => Promise<void>;
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
  const navigate = useNavigate();
  const contentWatch = form.watch("content");
  const hasCategoriesWatch = form.watch("hasCategories");
  const isEditMode = !!initData;

  usePrompt(
    process.env.NODE_ENV !== "development" &&
      form.formState.isDirty &&
      !form.formState.isSubmitting,
  );

  useEffect(() => {
    if (isEditMode) {
      form.reset({
        name: initData.name,
        description: initData.description,
        content: initData.content,
        hasCategories: initData.hasIngredientCategories,
        ingredients: initData.hasIngredientCategories
          ? (initData.ingredients as IngredientsCategory[])
          : [{ name: "", items: initData.ingredients }],
        images: { new: [], uploaded: initData.images },
      });
    } else {
      form.reset();
    }
  }, [isEditMode, initData]);

  const getMappedFormValues = (values: FormValues): UpsertRecipe => {
    const { content, name, ingredients, images, description, hasCategories } = values;

    return {
      name,
      content,
      images,
      description,
      ingredients: hasCategories
        ? ingredients
        : ingredients[0].items.map((item) => ({
            name: item.name,
          })),
      tags: [],
    };
  };

  return (
    <div className="container">
      <h2 className="text-primary600 text-3xl font-semibold mb-6">
        {isEditMode ? "Edytuj przepis" : "Dodaj nowy przepis"}
      </h2>
      <form>
        <div className="form-section">
          <h2 className="form-section-title">Podstawowe informacje </h2>
          <TextInput
            name="name"
            control={form.control}
            rules={{ required: true }}
            label="Wpisz nazwę przepisu"
          />
          <TextInput
            name="description"
            control={form.control}
            rules={{ required: false }}
            label="Wpisz krótki opis przepisu"
          />
        </div>
        <ImagesForm form={form} />
        <div className="flex-col form-section">
          <h2 className="form-section-title">Składniki</h2>
          <div className="mb-2">
            <Controller
              name="hasCategories"
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
                  label="Podział na kategorie"
                />
              )}
            />
          </div>
          {hasCategoriesWatch ? (
            <IngredientsWithCategoryForm form={form} />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              <div className="bg-gray-lighter rounded-lg">
                <IngredientsForm form={form} categoryIndex={0} showTitle={false} />
              </div>
            </div>
          )}
        </div>
        <ContentForm form={form} contentWatch={contentWatch} />
        <div className="flex pt-3">
          <div className="mr-2">
            <Button
              onClick={() => {
                navigate("/");
              }}
              variant="outlined"
            >
              Anuluj
            </Button>
          </div>
          <div>
            <Button
              variant="contained"
              onClick={() => {
                form.handleSubmit((values) => onSubmit(getMappedFormValues(values)))();
              }}
            >
              Zapisz
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default RecipeForm;
