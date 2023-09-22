import { Route, Routes } from "react-router-dom";
import Header from "../../common/components/header.component";
import RecipeDetailsPage from "../../pages/recipe-details.page";
import AddRecipeForm from "../add-recipe/add-recipe-form.component";
import Home from "../home/home.component";

const Cockpit = () => {
  return (
    <div className='h-full'>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/add-recipe' element={<AddRecipeForm />} />
        <Route path='/recipes/:recipeId' element={<RecipeDetailsPage />} />
      </Routes>
    </div>
  );
};

export default Cockpit;
