import { Button, ThemeProvider } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { theme } from "../../common/utils/theme-for-provider";
import RecipesList from "../recipes-list/recipes-list.component";

type Props = {};

const Home = () => {
  const navigate = useNavigate();

  return (
    <>
      <main className='container py-3 h-full'>
        <div className='flex justify-end'>
          <ThemeProvider theme={theme}>
            <Button onClick={() => navigate("/add-recipe")} variant='contained'>
              Dodaj nowy przepis
            </Button>
          </ThemeProvider>
        </div>
        <RecipesList />
      </main>
    </>
  );
};

export default Home;
