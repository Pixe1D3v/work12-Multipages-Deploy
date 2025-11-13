import { Outlet } from "react-router-dom";

import AppHeader from "../components/AppHeader";
import AppNavbar from "../components/AppNavbar";
import AppFooter from "../components/AppFooter";

const AppLayout = ({pq, cartItems, setToken}) => {
  return (
    <>
      <AppHeader />
      <AppNavbar pq={pq} cartItems={cartItems} setToken={setToken} />
      <div className="w-100 h-auto px-3 pb-3">
        <Outlet />
      </div>
      <AppFooter />
    </>
  );
};

export default AppLayout;
