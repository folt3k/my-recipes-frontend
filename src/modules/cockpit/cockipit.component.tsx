import { Route, Routes } from "react-router-dom";
import Header from "../../common/components/header.component";
import RecipeDetailsPage from "../../pages/recipe-details.page";
import AddRecipe from "../add-recipe/add-recipe.component";
import EditRecipe from "../edit-recipe/edit-recipe.component";
import Home from "../home/home.component";

const Cockpit = () => {
  return (
    <div className='h-full'>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/add-recipe' element={<AddRecipe />} />
        <Route path='/edit-recipe/:recipeId' element={<EditRecipe />} />

        <Route path='/recipes/:recipeId' element={<RecipeDetailsPage />} />
      </Routes>
    </div>
  );
};

export default Cockpit;
