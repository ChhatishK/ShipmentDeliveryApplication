import { Route, Routes } from 'react-router-dom';
import './App.css';
import NavigationBar from './Components/UI/NavigationBar';
import Home from './Pages/Home';
import { useState } from 'react';
import CustomerRegister from './Components/Auth/Register';
import Login from './Components/Auth/Login';
import Dashboard from './Pages/Dashboard';
import ShipmentForm from './Components/Shipments/ShipmentForm'
import ShipmentList from './Components/Shipments/ShipmentList';
import PrivateRoute from './Components/Auth/PrivateRoute';


function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div className='w-[100vw] h-[100vh] bg-[#0077be] flex flex-col overflow-hidden'>
      <NavigationBar isLoggedIn={isLoggedIn} setIsLoggedIn = {setIsLoggedIn}/>

      <Routes>
        <Route path='/' element={<Home />}></Route>
        {/* <Route path='/aboutus' element={<Aboutus />}></Route> */}
        {/* <Route path='/aboutus' element={<Contactus />}></Route> */}
        <Route path='/login' element={<Login setIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn}/>}></Route>
        <Route path='/register' element={<CustomerRegister setIsLoggedIn={setIsLoggedIn}/>}></Route>

        <Route path='/dashboard' element={<PrivateRoute isLoggedIn={isLoggedIn}><Dashboard isLoggedIn={isLoggedIn}/></PrivateRoute> }></Route>
        <Route path='/add-new-shipment-form' element={<ShipmentForm />}></Route>
        <Route path='/shipment-list' element={<ShipmentList />}></Route>
      </Routes>

    </div>
  );
}

export default App;
