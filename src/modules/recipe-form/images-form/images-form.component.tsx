import { Button } from "@mui/material";
import { useFieldArray, useForm, UseFormReturn } from "react-hook-form";
import TextInput from "../../../common/components/text-input";

import { FormValues } from "../../add-recipe/add-recipe.component";
import ImageView from "./image-view/image-view.component";
import React from "react";

type Props = {
  form: UseFormReturn<FormValues, any, any>;
};

const ImagesForm = ({ form }: Props) => {
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
    <div className="flex-col  form-section">
      <h2 className="form-section-title">Zdjęcia</h2>
      <div>
        <div className="flex">
          {form.getValues().images.uploaded.map((image, index) => (
            <ImageView
              key={index}
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
                key={index}
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
            name="imageUrl"
            rules={{ required: false }}
            control={uploadForm.control}
            label="Wpisz adres url zdjęcia"
          />
          <Button type="submit" onClick={uploadForm.handleSubmit(uploadImage)} variant="contained">
            Wczytaj
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ImagesForm;
