import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { IoCartOutline } from "react-icons/io5";
import { LuUserCircle2 } from "react-icons/lu";
import { FaRegHeart } from "react-icons/fa";
import { Modal } from 'react-bootstrap';


function NavbarA() {

  const [showModal, setShowModal] = useState(false);
  const [loginAs, setLoginAs] = useState('');

  const handleLoginClick = (event) => {
    event.preventDefault();
    setShowModal(true);
  };


  return (
    <div>
      <div className="bg-black text-lowercase text-center py-4" id='p12'></div>
      <div className="bg-black text-center d-flex justify-content-between align-items-centerpy-2">
        <div>
          <div className="btn   mx-5"><h4 id='Heading'>Art Gallery</h4></div>
        </div>
        {/* <div className="text-center" style={{ width: '500px', marginLeft: 'auto', marginRight: 'auto' }}>
                    <input id="search" className="form-control" type="search" placeholder="Search for artworks, artists, themes and more" style={{ width: '80%' }} />
                    
                </div> */}
        <div>
          {/* <Link to="/wishlist" className="  mx-1" id='UserLogo'><FaRegHeart size={27} /></Link> */}
          {/* <Link to="/my-cart" className="  mx-1" id='UserLogo'><IoCartOutline size={30} /></Link> */}
          <Link to="#" className="  mx-2" id='UserLogo' onClick={handleLoginClick}><LuUserCircle2 size={27} /></Link>


        </div>

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
            to={"/"}

          >
            Logout
          </Link>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default NavbarA;
