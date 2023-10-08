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

  const {
    fields: newImagesFields,
    append,
    remove: removeNewImage,
  } = useFieldArray({
    control: form.control,
    name: "images.new",
  });

  const { remove: removeUploadedImage } = useFieldArray({
    control: form.control,
    name: "images.uploaded",
  });

  const uploadImage = (body: { imageUrl: string }) => {
    append({ url: body.imageUrl });
    uploadForm.reset();
  };

  return (
    <div className='flex-col  form-section'>
      <h2 className='form-section-title'>Zdjęcia</h2>
      <div className=''>
        <div>
          {form.getValues().images.uploaded.map((image, index) => (
            <ImageView
              image={{
                url: `${process.env.REACT_APP_IMAGES_URL}${image.name}`,
              }}
              onDelete={() => {
                removeUploadedImage(index);
              }}
            />
          ))}
          {newImagesFields.map((field, index) => {
            return (
              <ImageView
                image={{ url: field.url }}
                onDelete={() => {
                  removeNewImage(index);
                }}
              />
            );
          })}
        </div>
        <div>
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
      </div>
    </div>
  );
});

export default ImagesForm;
