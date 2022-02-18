//import {AiFillEdit} from 'react-icons/fa';
//import Inmate from "./components/Inmate";
import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import EnterNewInmate from './pages/EnterNewInmate'
import Search from './pages/Search'
import Dashboard from './pages/Dashboard'
import Navbar from "./components/layout/Navbar"
import TransportList from './pages/TransportList';
import Login from "./components/Login/Login"
import useToken from './useToken';

function App() {
  const { token, setToken } = useToken();

  if (!token) {
    return <Login setToken={setToken} />
  }

  return (


    <div className="wrapper">

      <BrowserRouter>
        <Navbar />
        <Switch>
          <Route exact path='/' component={Dashboard} />
          <Route path='/EnterNewInmate' component={EnterNewInmate} />
          <Route path='/Search' component={Search} />
          <Route path='/TransportList' component={TransportList} />
        </Switch>
      </BrowserRouter>
    </div>

  )
}

export default App;

