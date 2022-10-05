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
import OneBrand from "./components/OneBrand/OneBrand";
import Footer from "./components/Footer/ index";
import PageNotFound from "./components/PageNotFound";
import Reviews from "./components/OneBrand/Reviews";
import Bookings from "./components/Bookings/Bookings";
import "./index.css"
import Calendar from "./components/Calendar/Calendar";
import { getMonth } from "./utils";
import CalendarHeader from "./components/Calendar/CalendarHeader";
import Sidebar from "./components/Calendar/Sidebar";
import Month from "./components/Calendar/Month";

// import Calendar from "react-calendar";
// import 'react-calendar/dist/Calendar.css';

function App() {
  console.table(getMonth(3))
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  const [brands, setBrands] = useState([]);
  const [currentMonth, setCurrentMonth] = useState(getMonth());
  // const [value, onChange] = useState(new Date()); this is for react-calendar

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
            <OneBrand />
            <Bookings />
            <Reviews />
            <div className="h-screen flex flex-col">
              <CalendarHeader />
              <div className="flex flex-1">
                <Sidebar />
                <Month month={currentMonth}/>
              </div>
            </div>
            {/* <Calendar /> */}
            {/* <Calendar onChange={onChange} value={value} /> */}
          </Route>
          <Route component={PageNotFound} />
        </Switch>
      )}
    </>
  );
}

export default App;
