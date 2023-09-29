import { Avatar } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  return (
    <header className='shadow-md'>
      <div className='container flex justify-between items-center'>
        <h1
          onClick={() => {
            navigate("/");
          }}
          className='text-primary600 text-5xl font-bold font-qwitcher pl-0 p-2 cursor-pointer'>
          My Recipes
        </h1>
        <div className='flex justify-center items-center'>
          <Avatar>O</Avatar>
        </div>
      </div>
    </header>
  );
};

export default Header;
