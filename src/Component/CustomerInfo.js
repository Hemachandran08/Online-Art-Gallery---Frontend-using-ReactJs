import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Container, Row, Col, Card, CardBody, CardTitle, CardText } from 'reactstrap';
import { Image } from 'react-bootstrap';
import Footer from './Footer';
import { useContext } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import { CartContext } from './CartContext';
import NavbarLougout from './NavbarLogout';

function CustomerInfo() {
  const { cartItems, setCartItems } = useContext(CartContext);
  const email = sessionStorage.getItem("customerEmailID");
  const customerName = sessionStorage.getItem("customerName");
  const mobileNumber = sessionStorage.getItem("customerMobileNumber");
  const address = sessionStorage.getItem("customerAddress");

  // Generate a random list of arts bought
  // const generateRandomArts = () => {
    const arts = ['Painting', 'Sculpture', 'Photograph', 'Drawing', 'Print'];
    const randomArts = [];
    for (let i = 0; i < 2; i++) {
      const randomIndex = Math.floor(Math.random() * arts.length);
      randomArts.push(arts[randomIndex]);
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

    // return randomArts;
  


  return (
    <div>
      <NavbarLougout/>
      <Container className="mt-5">
        <Row>
          <Col sm={12} md={6} className="mx-auto">
            <Card>
              <CardBody>
                <Row>
                  <Col sm={4}>
                    <Image
                      src={'https://png.pngtree.com/png-clipart/20230927/original/pngtree-man-avatar-image-for-profile-png-image_13001882.png'}
                    />
                  </Col>
                  <Col sm={8}>
                    <CardTitle tag="h2">Customer Information</CardTitle>
                    <CardText>
                      <p><strong>Name:</strong> {customerName}</p>
                      <p><strong>Email:</strong> {email}</p>
                      <p><strong>Mobile Number:</strong> {mobileNumber}</p>
                      <p><strong>Address:</strong> {address}</p>
                    </CardText>
                  </Col>
                </Row>        
                
              </CardBody>
            </Card>
          </Col>
        </Row>

        <Col>
        

        </Col>
        

        <Col sm={12} className="text-center mt-3">
          <Link to={`/customer?customerId=${email.customerId}`} className="btn btn-primary">
            Continue Shopping
          </Link>
          
          
        </Col>
      </Container>

      <marquee className="styled-marquee mt-5">Your Order will be delivered in 2 days. Please be patient !</marquee>


      <Footer />
    </div>
  );
}

export default CustomerInfo;
