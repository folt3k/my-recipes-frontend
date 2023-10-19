import { Button, IconButton } from "@mui/material";
import { useFieldArray, UseFormReturn } from "react-hook-form";
import DeleteIcon from "@mui/icons-material/Delete";

import TextInput from "../../../common/components/text-input";
import { FormValues } from "../../add-recipe/add-recipe.component";
import { AddInputOnEnterEvent } from "../../../common/helpers/add-input-on-enter";

type Props = {
  form: UseFormReturn<FormValues, any, any>;
  categoryIndex: number;
  showTitle?: boolean;
};

const IngredientsForm = ({ form, categoryIndex, showTitle = true }: Props) => {
  const { fields, append, remove } = useFieldArray({
    name: `ingredients.${categoryIndex}.items` as "ingredients.0.items",
    control: form.control,
  });

  return (
    <div className="flex-col mb-2">
      {showTitle && <h4 className="mb-2 text-gray-dark">Składniki</h4>}
      {fields.map((field, index) => {
        return (
          <div key={field.id} className="flex items-center">
            <div
              className="mb-2 w-full"
              onKeyDown={(event) => {
                AddInputOnEnterEvent(event, () => {
                  append({ name: "" });
                });
              }}
            >
              <TextInput
                {...form.register(`ingredients.${categoryIndex}.items.${index}.name` as const)}
                rules={{ required: true }}
                control={form.control}
                label="Nazwa składnika"
              />
            </div>
            <div className="flex items-center justify-center ml-1 h-full">
              <IconButton
                onClick={() => {
                  remove(index);
                }}
                className="flex items-center justify-center m-1  "
                color="secondary"
              >
                <DeleteIcon />
              </IconButton>
            </div>
          </div>
        );
      })}
      <Button onClick={() => append({ name: "" })} variant="contained">
        Dodaj składnik
      </Button>
    </div>
  );
};

export default IngredientsForm;
