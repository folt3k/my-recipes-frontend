import { Button, IconButton } from "@mui/material";
import { useFieldArray, UseFormReturn } from "react-hook-form";
import TextInput from "../../../common/components/text-input";
import ClearIcon from "@mui/icons-material/Clear";

import { FormValues } from "../../add-recipe/add-recipe.component";
import ImageView from "./image-view/image-view.component";
import { AddInputOnEnterEvent } from "../../../common/helpers/add-input-on-enter";
import React from "react";

type Props = {
  form: UseFormReturn<FormValues, any, any>;
};

const ImagesForm = React.forwardRef(({ form }: Props) => {
  const { fields, append, remove } = useFieldArray({
    name: "images",
    control: form.control,
  });

  return (
    <div className='flex-col  form-section'>
      <h2 className='form-section-title'>Zdjęcia</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2  gap-x-5 items-center'">
        {fields.map((field, index) => {
          const image = form.watch("images").find((_, i) => i === index);
          return (
            <div
              key={field.id}
              onKeyDown={event => {
                AddInputOnEnterEvent(event, () => {
                  append({ url: "" });
                });
              }}
              className='flex items-center justify-center mb-4'>
              <TextInput
                {...form.register(`images.${index}.url` as const)}
                rules={{ required: true }}
                control={form.control}
                label='Wpisz adres url zdjęcia'
              />
              {image?.url && <ImageView image={image} />}
              <IconButton
                onClick={() => {
                  remove(index);
                }}
                className='flex items-center justify-center m-1  '
                color='secondary'
                tabIndex={-1}>
                <ClearIcon />
              </IconButton>
            </div>
          );
        })}
      </div>
      <div className='flex mb-4'>
        <Button
          onClick={() => {
            append({ url: "" });
          }}
          variant='contained'
          tabIndex={-1}>
          Dodaj url zdjęcia
        </Button>
      </div>
    </div>
  );
});

export default ImagesForm;
