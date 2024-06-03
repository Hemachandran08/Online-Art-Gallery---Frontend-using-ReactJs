import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { CartContext } from './CartContext';
import Navbar from './Navbar';
import Footer from './Footer';
import { Link, useNavigate } from 'react-router-dom';
import NavbarLougout from './NavbarLogout';

function MyCart() {
    const navigate = useNavigate();
    const { cartItems, setCartItems } = useContext(CartContext);


    const [cardDetails, setCardDetails] = useState({
        cardNumber: '',
        cvv: ''
    });

    const [showPaymentModal, setShowPaymentModal] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const handleBuy = async (index) => {
        setShowPaymentModal(true);
        const customerId = sessionStorage.getItem('customerId');
        await axios.delete(`http://localhost:8001/rest/cart/deleteCart/${customerId}`);
        const updatedCartItems = cartItems.filter((item, i) => index !== i);
        setCartItems(updatedCartItems);
    };

    const handleConfirmPayment = async (index) => {
        // Perform payment process here
        // For demo, just showing success message
        setShowPaymentModal(false);
        const customerId = sessionStorage.getItem('customerId');
        await axios.delete(`http://localhost:8001/rest/cart/deleteCart/${customerId}`);
        const updatedCartItems = cartItems.filter((item, i) => index !== i);
        setCartItems(updatedCartItems);
        Swal.fire({
            icon: 'success',
            title: 'Payment Successful',
            text: 'Your product will be delivered within 48 hours.',
        });
        setShowModal(true);
        // navigate("/customer-info");

    };

    const handleQuantityChange = async (index, increment) => {
        const updatedCartItems = cartItems.map((item, i) => {
            if (index === i) {
                let newQuantity = parseInt(item.quantity, 10) + increment;
                newQuantity = Math.max(newQuantity, 1);
                return { ...item, quantity: newQuantity, totalPrice: newQuantity * item.art.artPrice };
            }
            return item;
        });
        setCartItems(updatedCartItems);
        await updateQuantityOnServer(updatedCartItems);
    };

    const updateQuantityOnServer = async (updatedCartItems) => {
        try {
            await axios.put('http://localhost:8001/rest/cart/updateCarts', updatedCartItems);
        } catch (error) {
            console.error('Error updating quantity on server:', error);
        }
    };

    const handleDelete = (index) => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'You want to remove this item from the cart.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, remove it!',
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const customerId = sessionStorage.getItem('customerId');
                    await axios.delete(`http://localhost:8001/rest/cart/deleteCart/${customerId}`);
                    const updatedCartItems = cartItems.filter((item, i) => index !== i);
                    setCartItems(updatedCartItems);
                    Swal.fire(
                        'Deleted!',
                        'Your item has been removed from the cart.',
                        'success'
                    );
                } catch (error) {
                    console.error('Error deleting cart item:', error);
                    Swal.fire(
                        'Error!',
                        'Failed to delete the item from the cart.',
                        'error'
                    );
                }
            }
        });
    };


    const handleCloseModal = () => {
        setShowPaymentModal(false);
    };


    useEffect(() => {
        const fetchCartItems = async () => {
            const customerId = sessionStorage.getItem('customerId');
            console.log('customerId:', customerId);
            try {
                const response = await axios.get(`http://localhost:8001/rest/cart/getByCustomerId/${customerId}`);
                setCartItems(response.data);
            } catch (error) {
                console.error('Error fetching cart items:', error);
            }
        };

        fetchCartItems();
    }, [setCartItems]);

    const handleContinuePayment = () => {
        setShowModal(false);
    }
    return (
        <div>
            <NavbarLougout />
            <h2 style={{ fontFamily: "-moz-initial" }} className='mt-4'>MY CART</h2>
            <table className="cart-table">
                <thead style={{ textAlign: 'center' }}>
                    <tr>
                        <th>Image</th>
                        <th>Title</th>
                        <th>Quantity</th>
                        <th>Price</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody style={{ textAlign: 'center' }}>
                    {cartItems.map((item, index) => {
                        const image = atob(item.art.image)
                        return (
                            <tr key={index}>
                                <td><img src={`data:image/jpeg;base64,${image}`} alt={item.art.artTitle} style={{ width: '100px' }} /></td>
                                <td>{item.art.artTitle}</td>
                                <td>
                                    <button className="quantity-button" onClick={() => handleQuantityChange(index, -1)}>-</button>
                                    <span>{item.quantity}</span>
                                    <button className="quantity-button" onClick={() => handleQuantityChange(index, 1)}>+</button>
                                </td>
                                <td>{item.totalPrice}</td>
                                <td>
                                    <button className="btn btn-success" onClick={() => handleBuy(index)}>Buy</button>
                                    <button className="btn btn-danger" id="delete" onClick={() => handleDelete(index)}>Delete</button>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>

            {showPaymentModal && (
                <>
                    <div className="blur-background" onClick={handleCloseModal}></div>
                    <div className="payment-modal">
                        <div className="modal-content">
                            <h2>Enter Card Details</h2>
                            <form onSubmit={handleConfirmPayment}>
                                <div className="form-group">
                                    <label htmlFor="cardNumber">Card Number</label>
                                    <input
                                        type="number"
                                        // maxLength={16}
                                        required
                                        pattern="4[0-9]{12}(?:[0-9]{3})?"
                                        id="cardNumber"
                                        value={cardDetails.cardNumber}

                                        onChange={(e) => setCardDetails({ ...cardDetails, cardNumber: e.target.value })}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="cvv">CVV</label>
                                    <input
                                        type="number"
                                        required="required"
                                        id="cvv"
                                        value={cardDetails.cvv}
                                        onChange={(e) => setCardDetails({ ...cardDetails, cvv: e.target.value })}
                                    />
                                </div>
                                <button type="submit">Confirm Payment</button>
                            </form>

                        </div>


                    </div>

                </>
            )}

            {showModal && (
                <>
                    <div className="blur-background" onClick={handleContinuePayment}></div>
                    <div className="payment-modal1">
                        <div className="modal-content1">
                            <h2>Payment Confirmation</h2>
                            <p>Would you like to continue shopping or go to your profile?</p>
                            <div className="modal-buttons">
                                <Link type="button" to="/customer" className="btn btn-primary">Continue Shopping</Link>
                                <Link type='button' to="/customer-info"className="btn btn-secondary" id='profile'>Go to My Profile</Link>
                            </div>
                        </div>
                    </div>
                </>
            )}

            <div className='mt-5'>
                <Link type='button' to={"/customer"} className="btn btn-outline-success">Continue Shopping</Link>
            </div>

            <Footer />
        </div>
    );
}

export default MyCart;
