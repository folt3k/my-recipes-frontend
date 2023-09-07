import { Button, IconButton } from "@mui/material";
import { Control, useFieldArray, UseFormReturn } from "react-hook-form";

import TextInput from "../../../common/components/text-input";
import { FormValues } from "../add-recipe-form.component";
import IngredientsForm from "../ingredient-form/ingredients-form.component";

type Props = {
  form: UseFormReturn<FormValues, any, any>;
};

const IngredientsWithCategoryForm = ({ form }: Props) => {
  const {
    fields: categoryFields,
    append: categoryAppend,
    remove: categoryRemove,
  } = useFieldArray({
    name: "ingredients",
    control: form.control,
  });

  return (
    <div className='flex-col mb-2'>
      {categoryFields.map((categoryField, categoryFieldIndex) => {
        return (
          <div>
            <div
              key={categoryField.id}
              className='grid grid-cols-3 items-center'>
              <TextInput
                {...form.register(
                  `ingredients.${categoryFieldIndex}.name` as const
                )}
                rules={{ required: true }}
                control={form.control}
                label='Nazwa kategorii'
              />
              <IconButton
                onClick={() => {
                  categoryRemove(categoryFieldIndex);
                }}
                className='flex items-center justify-center m-1  w-8 h-8'
                color='primary'>
                -
              </IconButton>
            </div>
            <IngredientsForm categoryIndex={categoryFieldIndex} form={form} />
          </div>
        );
      })}
      <Button
        className='w-full'
        onClick={() => {
          categoryAppend({ name: "", items: [] });
        }}
        variant='contained'>
        Dodaj kategorię składników
      </Button>
    </div>
  );
};

export default IngredientsWithCategoryForm;
