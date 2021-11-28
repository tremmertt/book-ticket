import "./App.css";
import { createBrowserHistory } from "history";
import { Route, Router, Switch } from "react-router";
import { HomeTemplate } from "./templates/HomeTemplate/HomeTemplate";
import Home from "./pages/Home/Home";
import Contact from "./pages/Contact/Contact";
import News from "./pages/News/News";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Detail from "./pages/Detail/Detail";
import Checkout from "./pages/Checkout/Checkout";
import CheckoutFinish from "./pages/CheckoutFinish/CheckoutFinish";
import CheckoutTemplate from "./templates/CheckoutTemplate/CheckoutTemplate";
import { Suspense, lazy } from "react";
import { UserTemplate } from "./templates/UserTemplate/UserTemplate";
import ScrollToTop from "./ScrollToTop.js";
import Loading from "./components/Loading/Loading";
import Profile from "./pages/Profile/Profile";
import AdminTemplate from "./templates/AdminTemplate/AdminTemplate";
import Dashboard from "./pages/Admin/Dashboard/Dashboard";
import Films from "./pages/Admin/Films/Films";
import ShowTime from "./pages/Admin/ShowTime/ShowTime";
import AddNew from "./pages/Admin/Films/AddNew/AddNew";
import Edit from "./pages/Admin/Films/Edit/Edit";
import AddNewUser from "./pages/Admin/User/AddNew/AddNewUser";
import EditUser from "./pages/Admin/User/Edit/EditUser";
import UserBooked from "./pages/Admin/User/UserBooked/UserBooked";
import Users from "./pages/Admin/User/Users";

import "./App.css";
import PageError from "./pages/PageError/PageError";
// const CheckoutTemplate = lazy(() =>
//   import("./templates/CheckoutTemplate/CheckoutTemplate")
// );

export const history = createBrowserHistory();

function App() {
  return (
    <Router history={history}>
      <Loading />
      <ScrollToTop>
        <Switch>
          <HomeTemplate path="/home" exact Component={Home} />
          <HomeTemplate path="/contact" exact Component={Contact} />
          <HomeTemplate path="/news" exact Component={News} />
          <HomeTemplate path="/detail/:id" exact Component={Detail} />
          <HomeTemplate path="/profile" exact Component={Profile} />

          <CheckoutTemplate path="/checkout/:id" exact Component={Checkout} />
          <CheckoutTemplate
            path="/checkout-finish/:id"
            exact
            Component={CheckoutFinish}
          />

          {/* <Suspense fallback={<h1> LOADING... </h1>}>
          <CheckoutTemplate path="/checkout/:id" exact Component={Checkout} />
        </Suspense> */}
          <UserTemplate path="/register" exact Component={Register} />
          <UserTemplate path="/login" exact Component={Login} />

          <AdminTemplate path="/admin" exact Component={Users} />
          <AdminTemplate path="/admin/films" exact Component={Films} />
          <AdminTemplate path="/admin/films/addnew" exact Component={AddNew} />
          <AdminTemplate path="/admin/films/edit/:id" exact Component={Edit} />
          <AdminTemplate path="/admin/users" exact Component={Users} />
          <AdminTemplate
            path="/admin/users/addnew"
            exact
            Component={AddNewUser}
          />
          <AdminTemplate
            path="/admin/users/edit/:taiKhoan"
            exact
            Component={EditUser}
          />
          <AdminTemplate
            path="/admin/users/booked/:taiKhoan"
            exact
            Component={UserBooked}
          />
          <AdminTemplate
            path="/admin/films/showtime/:id/:tenPhim"
            exact
            Component={ShowTime}
          />

          <HomeTemplate path="/" exact Component={Home} />
          <Route parth="*" component={PageError} />
        </Switch>
      </ScrollToTop>
    </Router>
  );
}

export default App;
