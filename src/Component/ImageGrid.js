import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

const ImageGrid = () => {
    const [arts, setArts] = useState([]);
    const [cart, setCarts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchArts = async () => {
            const response = await axios.get('http://localhost:8001/rest/art/GetArts');
            setArts(response.data);
        };

        fetchArts();
    }, []);

    const handleAddToCart = async (art) => {
        const customerId = sessionStorage.getItem('customerId');
        console.log('customerId:', customerId);
        if (!customerId) {
            // If not logged in, redirect to login page
            Swal.fire({
                icon: 'warning',
                title: 'Please Login',
                text: 'Please login before adding items to the cart.',
            });
            navigate('/customer-login');
            return;
        }
        try {
            // Fetch customer details based on customerId
            const customerResponse = await axios.get(`http://localhost:8001/rest/customer/getCustomerById/${customerId}`);
            console.log('customerResponse:', customerResponse);
            const customerData = customerResponse.data; // Assuming customer data is returned as JSON

            const cartItem = {
                customer: {
                    customerId: customerData.customerId,
                    // Include other customer details as needed, e.g., name, email, etc.
                    // name: customerData.name,
                    // email: customerData.email
                },
                art: {
                    artId: art.artId
                },
                totalPrice: art.artPrice, // Assuming totalPrice is the same as artPrice for now
                quantity: 1, // Assuming default quantity is 1 for now
                // totalProduct: 1, // Assuming default totalProduct is 1 for now
                // quality: 100 // Assuming default quality is 100 for now
            };
            await axios.post('http://localhost:8001/rest/cart/add', cartItem);
            console.log(cartItem);
            navigate("/my-cart");
        } catch (error) {
            console.error('Error adding art to cart:', error);
        }
    };


    return (
        <div className="image-grid">
            
            {
                arts.map((art, index) => {
                    if (art.artTitle) {
                        const image = atob(art.image);
                        return (
                            <div key={index} className="image-item mt-4">
                                <img src={`data:image/jpeg;base64,${image}`} alt={art.artTitle} />
                                <div className="image-details">
                                    <h5 className="card-title">{art.artTitle}</h5>
                                    <p className="card-text">{art.artDescription}</p>
                                    <p className="card-text">Price: ${art.artPrice}</p>
                                    <button type="button" className="btn btn-success" onClick={() => handleAddToCart(art)}>Add To Cart</button>
                                </div>
                            </div>
                        )
                    }
                }
                )}
        </div>
    );
}

export default ImageGrid;
