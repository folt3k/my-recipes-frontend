import { Image } from "../../add-recipe.types";

type Props = {
  image: Image;
};

const ImageView = ({ image }: Props) => {
  return (
    <>
      <div className='h-20 w-20 ml-2 	'>
        <img
          className='w-full h-full rounded-md'
          src={image.url}
          alt={image.url !== "" ? "food-foto" : ""}
        />
      </div>
    </>
  );
};

export default ImageView;
