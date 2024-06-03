import React from 'react';
import { Link, Route, Router,Switch } from 'react-router-dom';
import ImageCarousel from './ImageCarousel';
import Navbar from './Navbar';
import { FaShippingFast } from "react-icons/fa";import { GiReturnArrow } from "react-icons/gi";
import { AiFillSafetyCertificate } from "react-icons/ai";
import { FaHandHoldingUsd } from "react-icons/fa";
import { FaHandshake } from "react-icons/fa";
import ImageGrid from './ImageGrid';
import Footer from './Footer';
function HomePage() {




    return (
        <div>
            <div>
                <Navbar />
                <ImageCarousel />

                <Link to="/login">

                </Link>
            </div>

            <div className="w-100 d-none d-md-flex justify-content-center align-items-center icon-container" id='Iconlist'>
                <div className="d-md-flex justify-content-center  " id='icon'>
                    <FaShippingFast size={50} />
                    <div className='text-wrapper'>
                        <p id='freeShipping'>FREE SHIPPING</p>
                        <p id='w1'>Worldwide</p>
                    </div>
                </div>
                <div className="d-md-flex justify-content-center  " id='icon'>
                    <GiReturnArrow size={50} />
                    <div className='text-wrapper'>
                        <p id='freeShipping'>EASY RETURN</p>
                        <p id='w1'>Within 7 Days</p>
                    </div>
                </div>

                <div className="d-md-flex justify-content-center  " id='icon'>
                    <AiFillSafetyCertificate size={50} />
                    <div className='text-wrapper'>
                        <p id='freeShipping'>SECURED</p>
                        <p id='w1'>Checkout and Payments</p>
                    </div>
                </div>

                <div className="d-md-flex justify-content-center  " id='icon'>
                    <FaHandHoldingUsd size={50} />
                    <div className='text-wrapper'>
                        <p id='freeShipping'>COD AVAILABLE</p>
                        <p id='w1'>Pay on delivery</p>
                    </div>
                </div>

                <div className="d-md-flex justify-content-center  " id='icon'>
                    <FaHandshake id='HandwithLove' size={50} />
                    <div className='text-wrapper'>
                        <p id='freeShipping'>GENUINE PRODUCTS</p>
                        <p id='w1'>Handmade with love</p>
                    </div>
                </div>
            </div>

            
            <ImageGrid/>
           

        <Footer/>

        </div>

    );
}

export default HomePage;
