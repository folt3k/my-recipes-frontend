import { Button, IconButton } from "@mui/material";
import { useFieldArray, UseFormReturn } from "react-hook-form";
import TextInput from "../../../common/components/text-input";
import ClearIcon from "@mui/icons-material/Clear";

import { FormValues } from "../add-recipe-form.component";
import ImageView from "./image-view/image-view.component";

type Props = {
  form: UseFormReturn<FormValues, any, any>;
};

const ImagesForm = ({ form }: Props) => {
  const { fields, append, remove } = useFieldArray({
    name: "images",
    control: form.control,
  });

  return (
    <div className='flex-col  form-section'>
      <h2 className='form-section-title'>Zdjęcia</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2  gap-x-5 items-center'">
        {fields.map((field, index) => {
          return (
            <div>
              <div
                key={field.id}
                className='flex items-center justify-center mb-4'>
                <TextInput
                  {...form.register(`images.${index}.url` as const)}
                  rules={{ required: true }}
                  control={form.control}
                  label='Wpisz adres url zdjęcia'
                />
                <ImageView form={form} imageIndex={index} />
                <IconButton
                  onClick={() => {
                    remove(index);
                  }}
                  className='flex items-center justify-center m-1  '
                  color='secondary'>
                  <ClearIcon />
                </IconButton>
              </div>
            </div>
          );
        })}
      </div>
      <div className='flex mb-4'>
        <Button
          onClick={() => {
            append({ url: "" });
          }}
          variant='contained'>
          Dodaj url zdjęcia
        </Button>
      </div>
    </div>
  );
};

export default ImagesForm;
