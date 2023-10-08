import { useEffect, useRef, useState } from "react";
import { Image as Image1 } from "../../../add-recipe/add-recipe.types";

type Props = {
  image: { url: string };
  onDelete?: () => void;
};

const ImageView = ({ image, onDelete }: Props) => {
  return (
    <>
      <div
        className='h-[55px] w-[80px] ml-2 bg-cover bg-center rounded-md'
        style={{ backgroundImage: "url(" + image?.url + ")" }}></div>
      <button type='button' onClick={onDelete}>
        usuń
      </button>
    </>
  );
};

export default ImageView;
