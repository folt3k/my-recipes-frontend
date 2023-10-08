import { Button, IconButton } from "@mui/material";
import { useFieldArray, useForm, UseFormReturn } from "react-hook-form";
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
  const uploadForm = useForm<{ imageUrl: string }>({
    defaultValues: {
      imageUrl: "",
    },
  });

  const uploadImage = (body: any) => {
    console.log(body);
  };

  return (
    <div className='flex-col  form-section'>
      <h2 className='form-section-title'>Zdjęcia</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2  gap-x-5 items-center'">
        <TextInput
          {...uploadForm.register("imageUrl")}
          rules={{ required: false }}
          control={uploadForm.control}
          label='Wpisz adres url zdjęcia'
        />
        <Button
          type='submit'
          onClick={uploadForm.handleSubmit(uploadImage)}
          variant='contained'>
          Wczytaj
        </Button>
        {/* {fields.map((field, index) => {
          const image = form.watch("images").find((_, i) => i === index);
          return (
            <div
              key={field.id}
              onKeyDown={(event) => {
                AddInputOnEnterEvent(event, () => {
                  append({ url: "" });
                });
              }}
              className="flex items-center justify-center mb-4"
            >
              <TextInput
                {...form.register(`images.${index}.url` as const)}
                rules={{ required: true }}
                control={form.control}
                label="Wpisz adres url zdjęcia"
              />
              {image?.url && <ImageView image={image} />}
              <IconButton
                onClick={() => {
                  remove(index);
                }}
                className="flex items-center justify-center m-1  "
                color="secondary"
              >
                <ClearIcon />
              </IconButton>
            </div>
          );
        })} */}
      </div>
      <div className='flex mb-4'>
        {/* <Button
          onClick={() => {
            append({ url: "" });
          }}
          variant="contained"
        >
          Dodaj url zdjęcia
        </Button> */}
      </div>
    </div>
  );
});

export default ImagesForm;
