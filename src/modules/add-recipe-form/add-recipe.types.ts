export type Ingredient = {
  name: string;
};

export type IngredientsCategory = {
  name: string;
  items: Ingredient[];
};

export type Image = {
  base64: string;
};

export type Recipe = {
  content: string;
  createdAt: string;
  id: string;
  images: Image[];
  ingredients: IngredientsCategory[];
  name: string;
  description: string;
  updatedAt: string;
};
