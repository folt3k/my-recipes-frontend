export type Ingredient = {
  name: string;
};

export type IngredientsCategory = {
  name: string;
  items: Ingredient[];
};

export type Image = {
  url: string;
};

export type Recipe = {
  content: string;
  createdAt: string;
  id: string;
  images: Image[];
  ingredients: IngredientsCategory[];
  name: string;
  updatedAt: string;
};
