import React from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.css";
import "@fortawesome/fontawesome-free/js/all.js";
import "./App.css";

import AddDeveloper from "./components/AddDeveloper";
import EditDeveloper from "./components/EditDeveloper";
import ListDevelopers from "./components/ListDevelopers";

function App() {
  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/developers"} className="nav-link">
              Developers
            </Link>
          </li>
        </div>
      </nav>

      <div className="container mt-3">
        <Switch>
          <Route exact path={["/","/developers"]} component={ListDevelopers} />
          <Route exact path="/developers/add" component={AddDeveloper} />
          <Route path="/developers/edit/:id" component={EditDeveloper} />
        </Switch>
      </div>
    </div>
  );
}

export default App;
