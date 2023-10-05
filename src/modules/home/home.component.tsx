import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import RecipesList from "../recipes-list/recipes-list.component";

type Props = {};

const Home = () => {
  const navigate = useNavigate();

  return (
    <>
      <main className="container h-full">
        <div className="flex justify-end">
          <Button onClick={() => navigate("/add-recipe")} variant="contained">
            Dodaj nowy przepis
          </Button>
        </div>
        <RecipesList />
      </main>
    </>
  );
};

export default Home;
