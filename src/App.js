import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import AddCertificate from "./AddCertificate";
import HomeComponent from "./HomeComponent";
function App() {

  return (
    <>
    <Router>
    <Switch>
    <Route path="/" exact>
      <HomeComponent/>
          
          </Route>
          <Route path="/admin-edodwaja" exact>
           <AddCertificate/>
          </Route>
         
         
        </Switch>
    </Router>
      

</>
    
  );
}

export default App;