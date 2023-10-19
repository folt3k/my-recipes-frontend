import { Outlet } from "react-router-dom";
import Header from "../../common/components/header.component";

const Cockpit = () => {
  return (
    <div className="h-full">
      <Header />
      <div className="pb-5 pt-8 lg:pt-14">
        <Outlet />
      </div>
    </div>
  );
};

export default Cockpit;
