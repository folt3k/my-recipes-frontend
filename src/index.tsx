import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import LoginPage from "./pages/login.page";
import Cockpit from "./modules/cockpit/cockipit.component";
import Home from "./modules/home/home.component";
import AddRecipe from "./modules/add-recipe/add-recipe.component";
import EditRecipe from "./modules/edit-recipe/edit-recipe.component";
import RecipeDetailsPage from "./pages/recipe-details.page";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/" element={<Cockpit />}>
        <Route path="/" element={<Home />} />
        <Route path="/add-recipe" element={<AddRecipe />} />
        <Route path="/edit-recipe/:recipeId" element={<EditRecipe />} />
        <Route path="/recipes/:recipeId" element={<RecipeDetailsPage />} />
        <Route path="*" element={<div>404</div>} /> //TODO: Dodać stone 404
      </Route>
    </Route>,
  ),
);

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
