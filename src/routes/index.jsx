
import AllOrdersPage from "../components/pages/AllOrdersPage";
import PackagesTable from "../components/tables/PackagesTable";
import Dashboard from "../Sections/Dashboard";
const routes = [
  {
    path: "/",
    component: Dashboard,
  },
  {
    path: "/allorders",
    component:AllOrdersPage,
  },
  {
    path: "/packages",
    component:PackagesTable,
  },
];

export default routes;
