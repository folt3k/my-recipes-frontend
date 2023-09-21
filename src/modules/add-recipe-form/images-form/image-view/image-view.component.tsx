import { Image } from "../../add-recipe.types";

type Props = {
  image: Image;
};

const ImageView = ({ image }: Props) => {
  return (
    <>
      {/* <div className='w-full h-96 bg-no-repeat  rounded shadow-lg' /> */}
      <div
        className='h-[55px] w-[80px] ml-2 bg-cover bg-center rounded-md'
        style={{ backgroundImage: "url(" + image?.url + ")" }}></div>
    </>
  );
};

export default ImageView;
