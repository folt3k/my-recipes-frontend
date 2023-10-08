export type Ingredient = {
  name: string;
};

export type IngredientsCategory = {
  name: string;
  items: Ingredient[];
};

export type NewImage = {
  url: string;
};

export type UploadedImage = {
  id: string;
  name: string;
};

export type UpsertImages = {
  new: NewImage[];
  uploaded: UploadedImage[];
};

export type Image = {
  id: string;
  name: string;
};

export type Recipe = {
  content: string;
  createdAt: string;
  id: string;
  images: Image[];
  ingredients: Ingredient[] | IngredientsCategory[];
  name: string;
  description: string;
  updatedAt: string;
  hasIngredientCategories: boolean;
};

export type UpsertRecipe = {
  content: string;
  images: UpsertImages;
  ingredients: Ingredient[] | IngredientsCategory[];
  name: string;
  description: string;
  tags: any[];
};
