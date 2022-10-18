// WITHOUT MODAL
// import React, { useState, useEffect } from "react";
// import { useDispatch } from "react-redux";
// import { Route, Switch } from "react-router-dom";
// import LoginFormPage from "./components/LoginFormPage";
// import SignupFormPage from "./components/SignupFormPage";
// import * as sessionActions from "./store/session";
// import Navigation from "./components/Navigation";

// function App() {
//   const dispatch = useDispatch();
//   const [isLoaded, setIsLoaded] = useState(false);
//   useEffect(() => {
//     dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
//   }, [dispatch]);

//   return (
//     <>
//       <Navigation isLoaded={isLoaded} />
//       {isLoaded && (
//         <Switch>
//           <Route path="/login">
//             <LoginFormPage />
//           </Route>
//           <Route path="/signup">
//             <SignupFormPage />
//           </Route>
//         </Switch>
//       )}
//     </>
//   );
// }

// export default App;

import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import Brands from "./components/Brands/Brands.js"
import OneBrandContainer from "./components/OneBrand/OneBrandContainer";
import Footer from "./components/Footer/ index";
import PageNotFound from "./components/PageNotFound";
import UserBookings from "./components/Bookings/UserBookings";
// import Calendar from "react-calendar";
// import 'react-calendar/dist/Calendar.css';

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  const [brands, setBrands] = useState([]);
  const [value, onChange] = useState(new Date());

  return (
    <>
      <Navigation isLoaded={isLoaded} brands={brands} setBrands={setBrands} />
      {isLoaded && (
        <Switch>
          <Route exact path="/">
            <Brands brands={brands} setBrands={setBrands} />
            <Footer />
          </Route>
          <Route exact path='/brands/:id'>
            <OneBrandContainer />
            {/* <Calendar onChange={onChange} value={value} /> */}
          </Route>
          <Route path='/users/:id'>
            <UserBookings />
          </Route>
          <Route component={PageNotFound} />
        </Switch>
      )}
    </>
  );
}

export default App;
