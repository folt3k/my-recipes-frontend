import { UseFormReturn } from "react-hook-form";

import { FormValues } from "../../add-recipe-form.component";

type Props = {
  imageIndex: number;
  form: UseFormReturn<FormValues, any, any>;
};

const ImageView = ({ imageIndex, form }: Props) => {
  const imagesUrlWatch = form.watch("images");

  const image = imagesUrlWatch.find((_, index) => index === imageIndex);
  console.log(image);

  return (
    <>
      <div className='h-20 w-20 ml-2 	'>
        {image?.url && (
          <img
            className='w-full h-full rounded-md'
            src={image.url}
            alt={image.url !== "" ? "food-foto" : ""}
          />
        )}
      </div>
    </>
  );
};

export default ImageView;
