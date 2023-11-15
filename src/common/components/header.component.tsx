import { Avatar, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { Add } from "@mui/icons-material";

const Header = () => {
  return (
    <header className="shadow-md z-10">
      <div className="container flex justify-between items-center">
        <Link to="/">
          <h1 className="text-primary text-5xl font-bold font-qwitcher pl-0 p-2 cursor-pointer flex items-center  ">
            <img width={54} src="/logo192.png" alt="logo" className="mr-2"/>
            My Recipes
          </h1>
        </Link>
        <div className="flex justify-center items-center gap-4">
          <Link to="/add-recipe">
            <Button variant="contained" startIcon={<Add />}>
              Dodaj nowy przepis
            </Button>
          </Link>
          <Avatar>O</Avatar>
        </div>
      </div>
    </header>
  );
};

export default Header;
