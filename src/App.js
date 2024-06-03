import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginPage from './Component/LoginPage';
import HomePage from './Component/HomePage';
import Register from './Component/Register';
// import ImageDetails from './Component/ImageDetails';
import { CartProvider } from './Component/CartContext'; // Import CartProvider
import MyCart from './Component/MyCart';
import Footer from './Component/Footer';
import ArtistPage from './Component/ArtistPage';
import AddArt from './Component/AddArt';
import CustomerLogin from './Component/CustomerLogin';
import CustomerRegister from './Component/CustomerRegistration';
import CustomerInfo from './Component/CustomerInfo';
import ArtistInformation from './Component/ArtistInformation';
import MyWishList from './Component/MyWishList';
import CustomerPage from './Component/CustomerPage';
import ArtistList from './Component/ArtistList';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        {/* Wrap everything with CartProvider login-customer*/}
        <CartProvider> 
          <Routes>
            <Route path="/login" element={<LoginPage/>} />
            <Route path="/customer-login" element={<CustomerLogin/>} />
            <Route path="/Register" element={<Register />} />
            <Route path="/customer-register" element={<CustomerRegister />} />
            <Route path="/" element={<HomePage/>} />
            <Route path="/my-cart" element={<MyCart/>} />
            <Route path='/artist' element={<ArtistPage/>} />
            <Route path='/add-art' element={<AddArt/>}/>
            <Route path='customer-info' element={<CustomerInfo/>}/>
            <Route path='artist-information' element={<ArtistInformation/>}/>
            <Route path='/wishlist' element={<MyWishList/>}/>
            <Route path='customer' element={<CustomerPage/>}/>
            <Route path='artists' element={<ArtistList/>}/>

          </Routes>
        </CartProvider>
        {/* <Footer/> */}
      </BrowserRouter>
    </div>
  );
}

export default App;
