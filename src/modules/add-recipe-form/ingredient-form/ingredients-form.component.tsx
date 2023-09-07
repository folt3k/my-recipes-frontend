import { Button, IconButton } from "@mui/material";
import { Control, useFieldArray, UseFormReturn } from "react-hook-form";

import TextInput from "../../../common/components/text-input";
import { FormValues } from "../add-recipe-form.component";

type Props = {
  form: UseFormReturn<FormValues, any, any>;
  categoryIndex: number;
};

const IngredientsForm = ({ form, categoryIndex }: Props) => {
  const { fields, append, remove } = useFieldArray({
    name: `ingredients.${categoryIndex}.items`,
    control: form.control,
  });

  return (
    <div className='flex-col mb-2'>
      {fields.map((field, index) => {
        return (
          <div>
            <div key={field.id} className=''>
              <TextInput
                {...form.register(
                  `ingredients.${categoryIndex}.items.${index}.name` as const
                )}
                rules={{ required: true }}
                control={form.control}
                label='Nazwa składnika'
              />
              <IconButton
                onClick={() => {
                  remove(index);
                }}
                className='flex items-center justify-center m-1  w-8 h-8'
                color='primary'>
                -
              </IconButton>
            </div>
          </div>
        );
      })}
      <Button
        className='w-full'
        onClick={() => {
          append({ name: "" });
        }}
        variant='contained'>
        Dodaj składnik
      </Button>
    </div>
  );
};

export default IngredientsForm;
