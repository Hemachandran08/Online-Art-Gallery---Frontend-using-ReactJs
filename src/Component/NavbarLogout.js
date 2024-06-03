import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { IoCartOutline } from "react-icons/io5";
import { LuUserCircle2 } from "react-icons/lu";
import { FaRegHeart } from "react-icons/fa";
import { Modal } from 'react-bootstrap';
import Swal from 'sweetalert2';
import axios from 'axios';


function NavbarLougout() {

    const [showModal, setShowModal] = useState(false);


    const navigate = useNavigate();

    const handleAddToCart = async () => {
        const customerId = sessionStorage.getItem('customerId');
        console.log('customerId:', customerId);
        if (!customerId) {
            // If not logged in, redirect to login page
            Swal.fire({
                icon: 'warning',
                title: 'Please Login',
                text: 'Please login before adding items to the cart.',
            });
            navigate('/login-customer');
            return;
        }
        try {
            // Fetch customer details based on customerId
            const customerResponse = await axios.get(`http://localhost:8001/rest/customer/getCustomerById/${customerId}`);
            console.log('customerResponse:', customerResponse);
            const customerData = customerResponse.data; // Assuming customer data is returned as JSON


            navigate("/my-cart");
        } catch (error) {
            console.error('Error go to cart:', error);
        }
    };


    const handleLoginClick = (event) => {
        event.preventDefault();
        setShowModal(true);
    };




    //   const handleLoginSubmit = () => {
    //     if (logoutAs === 'artist') {

    //       window.location.href = '/';
    //     } else if (logoutAs === 'customer') {

    //       window.location.href = '/';
    //     }


    //   };
    return (
        <div>
            <div className="bg-black text-lowercase text-center py-1" id='p1'>Worldwide Shipping* | Free Returns* | Handpicked Artworks</div>
            <div className="bg-black text-center d-flex justify-content-between align-items-centerpy-2">
                <div>
                    <div className="btn   mx-5"><h4 id='Heading'>Art Gallery</h4></div>
                </div>
                <div className="text-center" style={{ width: '500px', marginLeft: 'auto', marginRight: 'auto' }}>
                    <input id="search" className="form-control" type="search" placeholder="Search for artworks, artists, themes and more" style={{ width: '80%' }} />

                </div>
                <div>
                    <Link to="/wishlist" className="  mx-1" id='UserLogo'><FaRegHeart size={27} /></Link>
                    <Link to="/login-customer" className="  mx-1" id='UserLogo'><IoCartOutline size={30} onClick={() => handleAddToCart()} /></Link>
                    <Link to="/" className="  mx-2" id='UserLogo' onClick={handleLoginClick}><LuUserCircle2 size={27} /></Link>


                </div>

            </div>

            <div className="w-100 d-none d-md-flex justify-content-center align-items-center " id='nav1'>
                <Link to="#" className="btn  mx-2">Artworks for wall</Link>
                <Link to="#" className="btn  mx-2">Wildlife paintings</Link>
                <Link to="#" className="btn  mx-2">Home & Living</Link>
                <Link to="#" className="btn  mx-2">Painting for living room</Link>
                <Link to="#" className="btn  mx-2">Folk art & craft</Link>
                <Link to="#" className="btn  mx-2">Religious Paintings</Link>

            </div>

            <Modal
                show={showModal}
                onHide={() => setShowModal(false)}
                centered
            >
                <Modal.Header closeButton className="banner">
                    <Modal.Title>Logout</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <div className="form-group">
                            <label className="font-weight-bold">Are you sure you want to Logout?</label>

                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Link
                        type='button'
                        className="btn btn-success btn-block"
                        to={"/customer-login"}

                    >
                        Logout
                    </Link>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default NavbarLougout;
