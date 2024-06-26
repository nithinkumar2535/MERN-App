import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import axios from 'axios';
import SignUp from './component/SignUp';
import Header from './component/Header';
import Body from './component/Body';
import Footer from './component/Footer';
import Login from './component/Login';
import { Slide, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UserHeader from './component/Header/UserHeader';
import UserProducts from './component/User/UserProducts';
import Carousel from './component/Carousel';
import Categories from './component/Categories';
import DealOfTheDay from './component/DealOfTheDay';


function App() {
  const [name, setName] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_SERVER_URL}/api/`, { withCredentials: true })
      .then((result) => {
        if (result.data.Valid) {
          setName(result.data.username);
          setIsAdmin(result.data.isAdmin);
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }
      })
      .catch((error) => {
        console.log(error);
        setIsLoggedIn(false);
      });
  }, [navigate]);

  return (
    <>
      <ToastContainer
        position='top-center'
        autoClose ={100}
        transition ={Slide}
      />

      {isLoggedIn ? (
        <Routes>
          <Route path='/register' element={<SignUp />} />
          <Route path='/login' element={<Login />} />
          <Route path='/*' element={
            <div>
              <Header name={name} isAdmin={isAdmin} isLoggedIn={isLoggedIn} />
              <Body name={name} isAdmin={isAdmin} isLoggedIn={isLoggedIn} />
              <Footer name={name} isAdmin={isAdmin} isLoggedIn={isLoggedIn} />
            </div>
          }>
          </Route>
        </Routes>
      ) : (
        <Routes>
          <Route path='/register' element={<SignUp />} />
          <Route path='/login' element={<Login />} />
          <Route path='/cart' element={<Login />} />
          <Route path='/' element={
            <div>
              <UserHeader />
              <Carousel />
              <UserProducts />
              <Footer />
            </div>
          } />
        </Routes>
      )}

    </>
  );
}

export default App;
