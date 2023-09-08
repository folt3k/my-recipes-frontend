import { Button, IconButton } from "@mui/material";
import { useFieldArray, UseFormReturn } from "react-hook-form";
import DeleteIcon from "@mui/icons-material/Delete";

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
      {true && <h4 className='mb-2 text-gray-dark'>Składniki</h4>}
      {fields.map((field, index) => {
        return (
          <div>
            <div key={field.id} className='flex items-center'>
              <div className='mb-2 w-full'>
                <TextInput
                  {...form.register(
                    `ingredients.${categoryIndex}.items.${index}.name` as const
                  )}
                  rules={{ required: true }}
                  control={form.control}
                  label='Nazwa składnika'
                />
              </div>
              <div className='flex items-center justify-center ml-1 h-full'>
                <IconButton
                  onClick={() => {
                    remove(index);
                  }}
                  className='flex items-center justify-center m-1  '
                  color='secondary'>
                  <DeleteIcon />
                </IconButton>
              </div>
            </div>
          </div>
        );
      })}
      <Button
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
