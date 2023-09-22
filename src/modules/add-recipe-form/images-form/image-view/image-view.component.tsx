import { useEffect, useRef, useState } from "react";
import { Image as Image1 } from "../../add-recipe.types";

type Props = {
  image: { url: string };
};

const ImageView = ({ image }: Props) => {
  return (
    <>
      <div
        className='h-[55px] w-[80px] ml-2 bg-cover bg-center rounded-md'
        style={{ backgroundImage: "url(" + image?.url + ")" }}></div>
    </>
  );
};

export default ImageView;
