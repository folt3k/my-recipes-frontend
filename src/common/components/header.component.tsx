import { Avatar } from "@mui/material";

const Header = () => {
  return (
    <header className='shadow-md'>
      <div className='container flex justify-between items-center'>
        <h1 className='text-primary600 text-5xl font-bold font-qwitcher pl-0 p-2'>
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
